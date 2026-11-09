const express= require('express')
const authRouter= express.Router();
const bcrypt= require('bcrypt');
const { User } = require('../models/user')

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("User addedd successfully");
  } catch (err) {
    res.status(400).send("Error saving user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials");
    const isCredentialValid = await bcrypt.compare(password, user.password);
    if (!isCredentialValid) throw new Error("Invalid credentials");
    else {
      const token = user.getJWT();
      res.cookie("token", token);
      res.send("Login successfull.");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports= authRouter;