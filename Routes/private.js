 import express from "express";
import { protect } from "../middleware/auth.js";
import { getPrivateData } from "../controllers/private.js";

const router = express.Router();


router.route("/protect").get( protect, getPrivateData);

export default router;