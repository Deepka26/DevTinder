const express = require('express')
const profileRouter = express.Router();
const {verifyAuth}= require('../middleware/auth')


profileRouter.get("/profile",verifyAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports= profileRouter;

