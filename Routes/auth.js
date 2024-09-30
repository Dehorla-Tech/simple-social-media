import express, { Router } from "express";
const router = express.Router();

import {register, login} from "../controllers/auth.js";
import { userProfile, profiles, update, } from "../controllers/user.js";
 


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/profiles").get(profiles);

router.route("/userProfile/:id").get(userProfile);

router.route("/update/:id").put(update);


export {router};
