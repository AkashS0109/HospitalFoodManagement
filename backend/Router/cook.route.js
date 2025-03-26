import express from "express"
import { getAllDietsForCooking ,updateStatus} from "../controllers/cook.controller.js";

const router =express.Router();

router.route("/").post(getAllDietsForCooking);
router.route("/updatestatus").post(updateStatus);

export default router;