import express from "express";
import {
  addNotice,
  addStudents,
  addPlacement,
  allstudents,
  addPlacedStudent,
  getAllPlaced,
  createTest,
  getAllPlacedStudents,
  AddPlacementMaterial,
} from "../controllers/adminControllers.js";

//router object
const router = express.Router();

router.post("/add-student", addStudents);
router.post("/add-placement", addPlacement);
router.post("/add-notice", addNotice);
router.get("/get-allstudents", allstudents);
router.post("/add-placed-students", addPlacedStudent);
router.get("/get-all-placed", getAllPlaced);
router.post("/add-placement-material", AddPlacementMaterial);
router.post("/create-test", createTest);
router.get("/all-placed-student", getAllPlacedStudents);
export default router;
