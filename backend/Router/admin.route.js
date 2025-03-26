import express from "express";
import { getAllPendingDiet } from "../controllers/admin.controller.js";
const router =express.Router();

router.route("/").get(getAllPendingDiet);

export default router;