import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";


export async function protect(req, res, next) {
   let token;
     //     checking for token in the authorization header
 if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))  {
    token = req.headers.authorization.split(" ")[1]
 } 

     //   error response for token not found 
 if (!token) {
   return next(new ErrorResponse("unauthorized access", 401))
 }


 try {
       // verifying token using secret from env
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //    verifying if user exist in database
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("no user found with this ID", 404))
    }
    req.user = user;
    next();


 } catch (error) {
    // for other unexpected errors
    return next(error)
 }
};


