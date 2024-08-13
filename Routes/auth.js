import express, { Router } from "express";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

const router = express.Router();
let register;
let login;

router.route("/register").post(register = async (req, res, next) =>{
    const {username, email, password} = req.body;
  try {
      ////// checking if email already exist
      const existingUser = await User.findOne({email: req.body.email})
      if (existingUser){
         return next(new ErrorResponse("Email already exists", 400))
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
        return next(new ErrorResponse("please provide a valid credentials", 401))
    }
    const user = await User.findOne({email}).select("+password");

    if (!user){
        return next(new ErrorResponse("Invalid credentials", 401))
    }
    // comparing if password matches
    const passwordMatch = await user.matchPasswords(password);

    if (!passwordMatch){
        return next(new ErrorResponse("Incorrect password", 404))
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
