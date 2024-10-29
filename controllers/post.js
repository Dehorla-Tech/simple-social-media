import mongoose, { Mongoose } from "mongoose";
import Post from "../models/post.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/user.js";


            //   fetch all post
export async function allPost(req, res, next) {
    try {
        const posts = await Post.find().populate("author", "username email ");
        const countCreatedPosts = await Post.estimatedDocumentCount()
        console.log(countCreatedPosts);

    sendResponse(posts, 200, res)
        
    } catch (error) {
        next(error)
    }
}
              // creating a new post
export async function createPost (req, res, next) {
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
        next(error)
    }
}

       // getting a single post by postId 
export async function getPost(req, res, next){
    try {
        const post = await Post.findById(req.params.id).populate("author", "username email ")
        if (!post) {
            return next(new ErrorResponse("Post not found", 404))
        }
        sendResponse(post, 200, res)
    } catch (error) {
        next(error)
    } 
}

       //update a post by id
export async function updatePost(req, res, next) {
    const {content, image} = req.body;
    let myId = req.params.id;
    let newValue = {content, image};
    try {
        const post = await Post.findByIdAndUpdate(myId, newValue, {new: true, runValidators: true}).populate("author", "username email")
        if (!post) {
            return next(new ErrorResponse("Post not found", 404))
        }

        sendResponse(post, 200, res)
    } catch (error) {
        next(error)
    }
}

       //delete a post by id
export async function deletePost (req, res, next) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) {
            return next(new ErrorResponse("post not found", 404))
        }

        sendResponse("post successfully deleted", 200, res)
    } catch (error) {
        next(error)
    }
}
const sendResponse = (Post, statusCode, res) => {
    res.status(statusCode).json({
        success: true, 
        Post
    })
}