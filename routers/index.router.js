// Purpose: Index router for the application

import express from "express";
import {
  createAttendance,
  timeAttendance,
} from "../controllers/index.controller.js";
import { validateAttendance } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// Desc    : Time Attendance
// Method  : GET /
// Access  : Public
router.route("/").get(timeAttendance);

// Attendance Route
// @Desc  : Attendance Routes
// @Method: GET / POST / PUT / DELETE
// @Access: Public
router.route("/attendance").post(validateAttendance, createAttendance);

export default router;
