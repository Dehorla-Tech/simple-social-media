import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "please provide a username"]
    },
    email:{
        type: String,
        require: [true, "please provide an email"],
        unique: true
    },
    password:{
        type: String,
        require: [true, "please provide a valid password"],
        minlength: 6     
    },
    bio: {
        type: String
    },
    profilePic: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,  //Reference to post model
        ref: "Post"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
    //  hashing password
userSchema.pre("save", async function(next){
    //  checking if password is modified
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt)
    next();
})

// comparing password for login
userSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.getSignedToken = function(){
return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
});
};

const User = mongoose.model("User", userSchema);



export default User;