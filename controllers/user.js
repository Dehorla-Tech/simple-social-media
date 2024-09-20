import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import { getSavedUser } from "./auth.js";

 
      // Fetch all users profile
export async function profiles(req, res, next) {
    try {
      const users = await User.find()
      const countCreatedUsers = await User.estimatedDocumentCount()
         console.log(users, countCreatedUsers);
         
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
    if (req.params.id === undefined || null) {
      return next(new ErrorResponse("Invalid user Id", 404))
    }

    sendResponse(user, 200, res)

  } catch (error) {
    next(error)
  }
}


        // updated a user by id
// export async function update(req, res, next) {
  
// }



const sendResponse = (user, statusCode, res) => {
    res.status(statusCode).json({
        success: true, 
        user, 
    })
};
