import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";


export async function register (req, res, next) {
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
    getSavedUser(user);

    sendToken(user, 201, res);
    
  } catch (error) {
    next(error)
  }

};


export async function login (req, res, next) {
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
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true, 
        token, 
        user, 
    })
};

export const getSavedUser = async (user) => {
    const savedUser = await User.findById(user._id).select('-password');
    console.log(savedUser);
    return savedUser;
    
};

