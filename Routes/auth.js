import express, { Router } from "express";
const router = express.Router();

import {register, login} from "../controllers/auth.js";
import { userProfile } from "../controllers/user.js";
import { protect } from "../middleware/auth.js";


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/userProfile").get(protect, userProfile)


// router.route().put();

// router.route().delete();



export {router};
