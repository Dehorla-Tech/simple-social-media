import mongoose from "mongoose";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";


 
      // Fetch all users profile
export async function allProfiles(req, res, next) {
    try {
      const users = await User.find({}, {password: 0})
      const countCreatedUsers = await User.estimatedDocumentCount()
         console.log(countCreatedUsers);
         
      sendResponse(users, 200, res)

    } catch (error) {
      next(error)
    }
}
        // Fetch a single user by id
export async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    if (!user){
      return next(new ErrorResponse("User not found", 404)) 
    }

    sendResponse(user, 200, res)

  } catch (error) {
      next(error)
  }
}


        // updated a user by id
export async function updateUser(req, res, next) {
  try {
    const {username, email, bio, profilePic} = req.body;
    let myId = req.params.id;
    let newValue = {$set: {username, email, bio, profilePic}}
    const user = await User.findByIdAndUpdate(myId, newValue, {new: true, runValidations: true})

    if(!user){
      return next(new ErrorResponse("User not found", 404))
    }

    sendResponse(user, 200, res)

  } catch (error) {
    next(error)
  }
  
}

 //delete a user by id
 export async function deleteUser (req, res, next) {
  try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
          return next(new ErrorResponse("user not found", 404))
      }

      sendResponse("user successfully deleted", 200, res)
  } catch (error) {
      next(error)
  }
}

const sendResponse = (user, statusCode, res) => {
    res.status(statusCode).json({
        success: true, 
        user, 
    })
};
