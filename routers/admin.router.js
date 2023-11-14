// Purpose: Index router for the application

import express from "express";
import { getEmployees, addEmployee } from "../controllers/admin.controller.js";

const router = express.Router();

// Desc    : Get Employees
// Method  : GET /
// Access  : Public
router.route("/employees").get(getEmployees).post(addEmployee);

export default router;
