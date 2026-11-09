const mongoose = require("mongoose");
const validator= require('validator');
const jsonwebtoken= require('jsonwebtoken')

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase:true,
    trim:true,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value))
        throw new Error("Email is not valid")
    }
  },
  password: {
    type: String,
    required:true,
     validate(value){
      if(!validator.isStrongPassword(value))
        throw new Error("Password must be strong.")
    }
  
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value)
    {
      if(!['male','female','others'].includes(value)){
        throw new Error("Gender is not valid")
      }
    }
  },
  photoUrl:{
    type:String
  },
  about:{
    type:String,
    default:"This is the default value of a user's about."
  },
  skills:{
    type:[String]
  }
},{timeStamps:true});


userSchema.methods.getJWT= function(){
 const token= jsonwebtoken.sign({ _id: this?._id }, "Dev@Tinder",{expiresIn:"7d"});
 return token;
}
const User = mongoose.model("User", userSchema);
module.exports = { User };
