import express, { Router } from "express";
const router = express.Router();

import {register, login} from "../controllers/auth.js";
import { userProfile, allProfiles, updateUser, deleteUser} from "../controllers/user.js";
import { createPost, getPost, allPost, updatePost, deletePost } from "../controllers/post.js";
import { createComment, deleteComment, getComment, updateComment } from "../controllers/comment.js";
 

    //signup route
router.route("/register").post(register);

router.route("/login").post(login);

      //user route
router.route("/allProfiles").get(allProfiles);

router.route("/userProfile/:id").get(userProfile);

router.route("/updateUser/:id").put(updateUser);

router.route("/deleteUser/:id").delete(deleteUser);

     //post route
router.route("/allPost").get(allPost);

router.route("/createPost").post(createPost);

router.route("/getPost/:id").get(getPost);

router.route("/updatePost/:id").put(updatePost);

router.route("/deletePost/:id").delete(deletePost);

       //comment route
router.route("/comment").post(createComment);

router.route("/posts/:postId/comment").get(getComment);

router.route("/comment/:id").put(updateComment);

router.route("/comment/:id").delete(deleteComment);
       


export {router};
