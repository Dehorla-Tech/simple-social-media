import mongoose from "mongoose";

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
        minlenght: 6     
    }
});

const User = mongoose.model("User", userSchema);

export default User;