import express from "express"
import { getAllDietsForDelivery ,updateStatus} from "../controllers/delivery.controller.js";

const router =express.Router();

router.route("/").post(getAllDietsForDelivery);
router.route("/updatestatus").post(updateStatus);

export default router;