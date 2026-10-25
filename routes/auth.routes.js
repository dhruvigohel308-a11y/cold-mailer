//import  express from "express"
//import { registerUser } from "../controller/auth.controller.js"

//const router = express.Router()

//router.post("/register",registerUser);

//export default router;
import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser);


export default router;