import mongoose from "mongoose";
import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import ErrorResponse from "../utils/errorResponse.js";


            // creating new comment
export async function createComment (req, res, next) {
    const {content, authorId, postId} = req.body;

    try {
           //checking if the user and post exist
       const author = await User.findById(authorId);
       const post = await Post.findById(postId);

       if (!author) {
        return next(new ErrorResponse("user not found", 404))
       }
       if (!post) {
        return next(new ErrorResponse("post not found", 404))
       }

             //create a new comment
        const newComment = new Comment({
            content,
            author: author._id,
            post: post._id
        }); 
        const savedComment = await newComment.save();

        sendResponse(savedComment, 201, res);

    } catch (error) {
       if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return next( new ErrorResponse("CastError: invalid user id", 500))
        }
      next(error) 
    }
}


const sendResponse = (comment, statusCode, res) => {
    res.status(statusCode).json({
        success: true,
        comment

    })
}