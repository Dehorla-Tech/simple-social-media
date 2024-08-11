import express, { Router } from "express";
import User from "../models/user.js";

const router = express.Router();
let register;
let login;

router.route("/register").post(register = async (req, res, next) =>{
    const {username, email, password} = req.body;
  try {
      ////// checking if email already exist
      const existingUser = await User.findOne({email: req.body.email})
      if (existingUser){
         res.status(400).json({error: "Email already exists"});
         return;
      }
    //   registering new user
    const user = await User.create({
        username,
        email,
        password
    });
    sendToken(user, 201, res);
    
  } catch (error) {
    next(error)
  }

});

router.route("/login").post(login = async (req, res, next) => {
    const {email, password} = req.body;
   
    try{
    // checking if email and password exists
    if (!email || !password){
        return res.status(401).json({error: "please provide a valid credentials"})
    }
    const user = await User.findOne({email}).select("+password");

    if (!user){
        return res.status(401).json({error: "invalid credentials"})
    }
    // comparing if password matches
    const passwordMatch = await user.matchPasswords(password);

    if (!passwordMatch){
        return res.status(404).json({success: false, error: "Incorrect password"})
    }
    sendToken(user, 200, res);

} catch (error){
    next(error)
}
});

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, user})
}

export {router};
