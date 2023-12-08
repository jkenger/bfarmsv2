// Purpose: Index router for the application

import express from "express";
import {
  getEmployees,
  createEmployee,
  createPayrollGroup,
  createDesignation,
  deleteEmployee,
  updateEmployee,
  deleteDesignation,
  updateDesignation,
  getPaginatedDesignations,
  getAllDesignations,
  getPaginatedPayrollGroups,
  getAllPayrollGroups,
  updatePayrollGroup,
  deletePayrollGroup,
} from "../controllers/admin.controller.js";
import {
  validateDesignation,
  validateEmployee,
  validateId,
  validatePayrollGroup,
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
  .delete(validateId, deleteEmployee);

// @Desc    : Read and Create Designations
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/employees/designations")
  .get(getPaginatedDesignations)
  .post(validateDesignation, createDesignation);

// @Desc    : Read and Create Designations
// @Method  : GET / POST
// @Access  : Private (Admin)
router.route("/employees/designations/all").get(getAllDesignations);

// @Desc   : Delete and Update Designations
// @Method : DELETE / PUT /
// @Access : Private (Admin)
router
  .route("/employees/designations/:id")
  .put(validateDesignation, updateDesignation)
  .delete(validateId, deleteDesignation);

// @Desc    : Read and Create Payroll Groups
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/payrolls/groups")
  .get(getPaginatedPayrollGroups)
  .post(validatePayrollGroup, createPayrollGroup);

// @Desc    : Delete and Update Payroll Groups
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/payrolls/groups/:id")
  .put(validatePayrollGroup, updatePayrollGroup)
  .delete(validateId, deletePayrollGroup);

router.route("/payrolls/groups/all").get(getAllPayrollGroups);

export default router;
