import express from "express";
import { login, logout, createUser ,getAllMembers, updateProfile } from "../controllers/user.controller.js";
import { authenticated } from "../controllers/middleware.js";


const router = express.Router();

// Routes
router.route("/login").post(login);
router.route("/signup").post(createUser);
router.route("/logout").get(logout);
router.route("/getallmembers").get(getAllMembers);
router.route("/profile").get(authenticated, updateProfile); // Middleware should come first


export default router;
