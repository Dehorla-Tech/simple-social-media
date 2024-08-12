 import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();


router.route("/protect").get( protect, (req, res, next) => {
    res.status(200).json({
        success: true, 
        message: "you have access to this protected route"
    })
}
);

export default router;