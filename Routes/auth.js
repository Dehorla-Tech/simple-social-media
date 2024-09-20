import express, { Router } from "express";
const router = express.Router();

import {register, login} from "../controllers/auth.js";
import { userProfile, profiles } from "../controllers/user.js";
import { protect } from "../middleware/auth.js";


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/profiles").get(profiles);

router.route("/userProfile/:id").get(userProfile);

// router.route("/update").put(update);

// router.route().delete();


export {router};
