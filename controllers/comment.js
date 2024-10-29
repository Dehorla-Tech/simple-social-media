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
      next(error) 
    }
}

             //get all comments for a post
export async function getComment(req, res, next) {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const comment = await Comment.find({post: postId})
        .populate("author", "username email")
         if(!post) {
            return next(new ErrorResponse("comment not found", 404))
         }
         const countComment = await Comment.estimatedDocumentCount()
         console.log(countComment);
         
        sendResponse(comment, 200, res);
    } catch (error) {
        next(error)
    }
}

export async function updateComment (req, res, next) {
    const {content} = req.body;
    const myId = req.params.id;
    const newValue = {content}
    try{
        const comment = await Comment.findByIdAndUpdate(myId, newValue, {new: true, runValidators: true});
        if (!comment){
            return next(new ErrorResponse("comment not found", 404))
        }
        sendResponse(comment, 200, res);
    } catch(error) {
        next(error)
    }
}

export async function deleteComment(req, res, next) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if(!comment){
            return next(new ErrorResponse("comment not found", 404))
        }
        sendResponse("comment deleted successfully", 200, res)
    } catch (error) {
        next(error)
    }
}

const sendResponse = (comment, statusCode, res) => {
    res.status(statusCode).json({
        success: true,
        comment

    })
}