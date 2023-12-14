// Purpose: Index router for the application

import express from "express";
import {
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
  getPaginatedEmployees,
  getAllEmployees,
  createHoliday,
  getPaginatedHolidays,
  updateHoliday,
  deleteHoliday,
  getAllHolidays,
  getPaginatedTravelpass,
  createTravelpass,
  getAllTravelpass,
  updateTravelpass,
  deleteTravelpass,
  getPaginatedDeductions,
  createDeductions,
  getAllDeductions,
  updateDeductions,
  deleteDeductions,
} from "../controllers/admin.controller.js";
import {
  validateDeductions,
  validateDesignation,
  validateEmployee,
  validateHoliday,
  validateId,
  validatePayrollGroup,
  validateTravelpass,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

// Employee Routes

// @Desc    : Read and Create Employees
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/employees")
  .get(getPaginatedEmployees)
  .post(validateEmployee, createEmployee);
router.route("/employees/all").get(getAllEmployees);

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
router.route("/employees/designations/all").get(getAllDesignations);

// @Desc   : Delete and Update Designations
// @Method : DELETE / PUT /
// @Access : Private (Admin)
router
  .route("/employees/designations/:id")
  .put(validateDesignation, updateDesignation)
  .delete(validateId, deleteDesignation);

// Payroll Groups Routes

// @Desc    : Read and Create Payroll Groups
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/payrolls/groups")
  .get(getPaginatedPayrollGroups)
  .post(validatePayrollGroup, createPayrollGroup);
router.route("/payrolls/groups/all").get(getAllPayrollGroups);

// @Desc    : Delete and Update Payroll Groups
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/payrolls/groups/:id")
  .put(validatePayrollGroup, updatePayrollGroup)
  .delete(validateId, deletePayrollGroup);

// Holidays Routes

// @Desc    : Read and Create Holidays
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/holidays")
  .get(getPaginatedHolidays)
  .post(validateHoliday, createHoliday);
router.route("/holidays/all").get(getAllHolidays);

// @Desc    : Delete and Update Holidays
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/holidays/:id")
  .put(validateHoliday, updateHoliday)
  .delete(validateId, deleteHoliday);

// Travelpass Routes
// @Desc    : Read and Create Travelpass
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/travelpass")
  .get(getPaginatedTravelpass)
  .post(validateTravelpass, createTravelpass);
router.route("/travelpass/all").get(getAllTravelpass);

// @Desc    : Delete and Update Travelpass
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/travelpass/:id")
  .put(validateTravelpass, updateTravelpass)
  .delete(validateId, deleteTravelpass);

// Deductions Routes
// @Desc    : Read and Create Travelpass
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/deductions")
  .get(getPaginatedDeductions)
  .post(validateDeductions, createDeductions);
router.route("/deductions/all").get(getAllDeductions);

// @Desc    : Delete and Update Travelpass
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/deductions/:id")
  .put(validateDeductions, updateDeductions)
  .delete(validateId, deleteDeductions);

export default router;
