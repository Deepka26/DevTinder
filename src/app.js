const express = require("express");

const app = express();
const { connnectDB } = require("./config/database");
const {User}= require('./models/user')

app.use(express.json());

app.post('/signup',(req,res)=>{
    const user = new User({
        firstName:"Deepka",
        lastName:"Sangwan",
        emailId:"deepka1000@gmail.com",
        password:"deepka123"
    })
    user.save();
    res.send("user saved successfully.")
})
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
