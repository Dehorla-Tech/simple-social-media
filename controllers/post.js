import mongoose, { Mongoose } from "mongoose";
import Post from "../models/post.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/user.js";


            //   fetch all post
export async function allPost(req, res, next) {
    try {
        const posts = await Post.find().populate("author");
        const countCreatedPosts = await Post.estimatedDocumentCount()
        console.log(countCreatedPosts);

    sendResponse(posts, 200, res)
        
    } catch (error) {
        next(error)
    }
}
              // creating a new post
export async function post (req, res, next) {
    const {content, image, userId} = req.body;

    try { 
             // checking if the user exist
        const user = await User.findById(userId);

        if (!user){
            return next(new ErrorResponse("User not found", 404))
        }
             //creating new post
        const newPost = new Post({
            content,
            image,
            author: user._id
        })    
             //save the post
        const savedPost = await newPost.save()

               // adding the post to the user's post array
        user.posts.push(savedPost._id)
        await user.save()

        sendResponse(savedPost, 201, res)

    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next( new ErrorResponse("CastError: invalid user id", 500))
        }
        next(error)
    }
}

       // getting post by postId 
export async function getPost(req, res, next){
    try {
        const post = await Post.findById(req.params.id).populate("author")
        if (!post) {
            return next(new ErrorResponse("Post not found", 404))
        }
        sendResponse(post, 200, res)
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next (new ErrorResponse("CastError: invalid user id", 500))
        }
        next(error)
    } 
}

const sendResponse = (savedPost, statusCode, res) => {
    res.status(statusCode).json({
        success: true, 
        savedPost
    })
}