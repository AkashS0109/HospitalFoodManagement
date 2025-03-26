import express from "express"
import { addPatient,getAllPatients,getPatientById,setDietById} from "../controllers/patient.controller.js";

const router = express.Router();

router.route("/").get(getAllPatients);
router.route("/addpatient").post(addPatient);
router.route("/getdiet/:id").get(getPatientById)
router.route("/getdiet/:id").post(setDietById)
export default router;