import express, { Router } from "express";
const router = express.Router();

import {register, login} from "../controllers/auth.js";
import { userProfile, profiles, update, } from "../controllers/user.js";
import { post, getPost, allPost } from "../controllers/post.js";
 


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/profiles").get(profiles);

router.route("/userProfile/:id").get(userProfile);

router.route("/update/:id").put(update);

router.route("/allPost").get(allPost);

router.route("/post").post(post);

router.route("/getPost/:id").get(getPost);


export {router};
