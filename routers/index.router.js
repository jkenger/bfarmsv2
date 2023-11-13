// Purpose: Index router for the application

import express from "express";
import { timeAttendance } from "../controllers/index.controller.js";

const router = express.Router();

// Desc    : Time Attendance
// Method  : GET /
// Access  : Public
router.route("/").get(timeAttendance);

export default router;
