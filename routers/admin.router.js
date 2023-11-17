// Purpose: Index router for the application

import express from "express";
import {
  getEmployees,
  createEmployee,
  getDesignations,
  createPayrollGroup,
  createDesignation,
} from "../controllers/admin.controller.js";
import { validateCreateEmployee } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// @Desc    : Get Employees
// @Method  : GET /
// @Access  : Public
router
  .route("/employees")
  .get(getEmployees)
  .post(validateCreateEmployee, createEmployee);
router
  .route("/employees/designations")
  .get(getDesignations)
  .post(createDesignation);

router
  .route("/payroll/groups")
  .get((req, res) => {
    res.send("Payroll groups");
  })
  .post(createPayrollGroup);

export default router;
