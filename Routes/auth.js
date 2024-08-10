import express, { Router } from "express";
import User from "../models/user.js";

const router = express.Router();
let register;
let login;

router.route("/register").post(register = (req, res, next) =>{
    res.send ("registered")})

router.route("/login").post(login = (req, res, next) => {
    res.send ("logged in");
}) 


export {router};
