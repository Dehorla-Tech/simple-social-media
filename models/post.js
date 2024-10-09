import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("post", PostSchema);

export default Post;