// Purpose: Index router for the application

import express from "express";
import {
  getEmployees,
  createEmployee,
  getDesignations,
  createPayrollGroup,
  createDesignation,
  deleteEmployee,
  updateEmployee,
} from "../controllers/admin.controller.js";
import {
  validateEmployee,
  validateIdEmployee,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// @Desc    : Read and Create Employees
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/employees")
  .get(getEmployees)
  .post(validateEmployee, createEmployee);

// @Desc    : Delete and Update Employees
// @Method  : DELETE / POST /
// @Access  : Private (Admin)
router
  .route("/employees/:id")
  .put(validateEmployee, updateEmployee)
  .delete(validateIdEmployee, deleteEmployee);
router
  .route("/employees/designations")
  .get(getDesignations)
  .post(createDesignation);

// @Desc    : Read and Create Payroll Groups
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/payroll/groups")
  .get((req, res) => {
    res.send("Payroll groups");
  })
  .post(createPayrollGroup);

export default router;
