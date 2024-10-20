import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,       // Reference to the user model
        ref: "User",
        require: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,       // Reference to the post model
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;