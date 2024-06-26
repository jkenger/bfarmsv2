// Purpose: Index router for the application

import express from "express";
import {
  validateAdminAttendance,
  validateDeductions,
  validateDesignation,
  validateEmployee,
  validateHoliday,
  validateId,
  validateLeaveTypes,
  validatePayroll,
  validatePayrollGroup,
  validateTimeCard,
  validateTravelpass,
} from "../middlewares/validationMiddleware.js";
import { getDashboard } from "../controllers/admin/dashboard.controller.js";
import {
  createAttendance,
  deleteAttendance,
  getAllAttendance,
  getPaginatedAttendance,
  updateAttendance,
} from "../controllers/admin/attendance.controller.js";
import {
  createTimeCard,
  deleteTimeCard,
  getAllSheets,
  getAllTimeCards,
  getPaginatedSheets,
  getPaginatedTimeCard,
  updateTimeCard,
} from "../controllers/admin/dtr.controller.js";
import {
  createPayroll,
  deletePayroll,
  getAllPayroll,
  getAllReceipts,
  getPaginatedPayroll,
  getPaginatedReceipts,
  updatePayroll,
} from "../controllers/admin/payroll.controller.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getPaginatedEmployees,
  updateEmployee,
} from "../controllers/admin/employee.controller.js";
import {
  createDesignation,
  deleteDesignation,
  getAllDesignations,
  getPaginatedDesignations,
  updateDesignation,
} from "../controllers/admin/designation.controller.js";
import {
  createPayrollGroup,
  deletePayrollGroup,
  getAllPayrollGroups,
  getPaginatedPayrollGroups,
  updatePayrollGroup,
} from "../controllers/admin/payroll-group.controller.js";
import {
  createHoliday,
  deleteHoliday,
  getAllHolidays,
  getPaginatedHolidays,
  updateHoliday,
} from "../controllers/admin/holiday.controller.js";
import {
  createTravelpass,
  deleteTravelpass,
  getAllTravelpass,
  getPaginatedTravelpass,
  updateTravelpass,
} from "../controllers/admin/travelpass.controller.js";
import {
  createDeductions,
  deleteDeductions,
  getAllDeductions,
  getPaginatedDeductions,
  updateDeductions,
} from "../controllers/admin/deduction.controller.js";
import {
  createLeaveType,
  deleteLeaveType,
  getAllLeaveTypes,
  getPaginatedLeaveTypes,
  updateLeaveType,
} from "../controllers/admin/leavetype.controller.js";
import passport from "passport";

const router = express.Router();

// Root
// @Desc  : Root Route
// @Method: GET /
// @Access: Public
router.get("/", (req, res) => {
  res.send("API is running...");
});

// Dashboard Routes
// @Desc    : Read Dashboard
// @Method  : GET
// @Access  : Private (Admin)
router
  .route("/dashboard")
  .get(passport.authenticate("jwt", { session: false }), getDashboard);

// Attendance Routes
// @Desc    : Read and Create Attendance
// @Method  : GET / POST
// @Access  : Public and Private (Admin)
router
  .route("/daily-time-records")
  .get(getPaginatedAttendance)
  .post(validateAdminAttendance, createAttendance);
router.route("/daily-time-records/all").get(getAllAttendance);

// @Desc    : Delete and Update Attendance
// @Method  : DELETE / POST /
// @Access  : Private (Admin)
router
  .route("/daily-time-records/:id")
  .put(validateAdminAttendance, updateAttendance)
  .delete(validateId, deleteAttendance);

// Time Cards Routes
// @Desc    : Read and Create Time Cards
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/daily-time-records/time-cards")
  .get(getPaginatedTimeCard)
  .post(validateTimeCard, createTimeCard);
router.route("/daily-time-records/time-cards/all").get(getAllTimeCards);

// @Desc    : Get Delete and Update Time Cards
// @Method  : DELETE / POST /
// @Access  : Private (Admin)
router
  .route("/daily-time-records/time-cards/:id")
  .get(getPaginatedSheets)
  .put(validateTimeCard, updateTimeCard) // to change
  .delete(validateId, deleteTimeCard);
router.route("/daily-time-records/time-cards/:id/all").get(getAllSheets);

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

// Payroll Routes

// @Desc    : Read and Create Payroll Groups
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/payrolls")
  .get(getPaginatedPayroll)
  .post(validatePayroll, createPayroll);
router.route("/payrolls/all").get(getAllPayroll);

// @Desc    : Delete and Update Payroll Groups
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/payrolls/:id")
  .put(validatePayroll, updatePayroll)
  .delete(validateId, deletePayroll);

// Receipts Routes

// @Desc    : Read Receipts
// @Method  : GET
// @Access  : Private (Admin)
router.route("/payrolls/:id/receipt").get(getPaginatedReceipts);
router.route("/payrolls/:id/receipt/all").get(getAllReceipts);

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

// Leave Types Routes
// @Desc    : Read and Create Leave Types
// @Method  : GET / POST
// @Access  : Private (Admin)
router
  .route("/leaves/types")
  .get(getPaginatedLeaveTypes)
  .post(validateLeaveTypes, createLeaveType);
router.route("/leaves/types/all").get(getAllLeaveTypes);

// @Desc    : Delete and Update Leave Types
// @Method  : DELETE / PUT /
// @Access  : Private (Admin)
router
  .route("/leaves/types/:id")
  .put(validateLeaveTypes, updateLeaveType)
  .delete(validateId, deleteLeaveType);

export default router;
