const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const { connnectDB } = require("./config/database");
const { User } = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
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

  res.send("user saved successfully.");
});

app.get("/user", async (req, res) => {
  try {
    const email = req.body.emailId;
    const user = await User.find({ emailId: email });
    if (user.length == 0) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error finding user:" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully.");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const body = req.body;
  const updates_allowed = ["photoUrl", "about", "age", "gender"];
  try {
    const fieldsAllowed = Object.keys(body).every((elem) => {
      return updates_allowed.includes(elem);
    });
    if (!fieldsAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate(userId, body, { runValidators: true });
    res.send("User updated successfully.");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/login", async(req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials");
    const isCredentialValid = await bcrypt.compare(password, user.password);
    if (!isCredentialValid) throw new Error("Invalid credentials");
    else res.send("Login successfull.");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connnectDB()
  .then(() => {
    console.log("connected to Database...");
    app.listen(3001, () => {
      console.log("Server is successfully listening on port 3001...");
    });
  })
  .catch((err) => {
    console.error("Database conection failed");
  });
