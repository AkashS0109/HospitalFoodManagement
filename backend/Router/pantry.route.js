import express from "express"
import { getAllPendingDiets, setDietOrder } from "../controllers/pantry.controller.js";
const router =express.Router();

router.route("/").get(getAllPendingDiets);
router.route("/").post(setDietOrder);
export default router;