const jsonwebtoken = require("jsonwebtoken");
const {User} = require("../models/user");

const verifyAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
  

    if (!token) throw new Error("Please login first");
    if (typeof token !== "string") throw new Error("Invalid token format");

    const { _id } = jsonwebtoken.verify(token, "Dev@Tinder");
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};
module.exports = { verifyAuth };
