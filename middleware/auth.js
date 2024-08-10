import jwt from "jsonwebtoken";
import User from "../models/user";


export async function protect(req, res, next) {
   let token;
     //     checking for token in the authorization header
 if (req.headers.authorization && req.headers.authorization.startswith("Bearer"))  {
    token = req.headers.authorization.split(" ")[1];
 } 

     //   error response for token not found
 if (!token) {
    return res.status(401).json({error: "unauthorized access"});
 }


 try {
       // verifying token using secret from env
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //    verifying if user exist in database
    const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(404).json({ error: "no user found with this ID"});
    }
    req.user = user;
    next();


 } catch (error) {
    // for other unexpected errors
    return next(error)
 }
}