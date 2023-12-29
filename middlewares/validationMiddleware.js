import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Data not")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("You are not the owner")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateEmployee = withValidationErrors([
  body().toArray(),
  body("*.employeeId").notEmpty().withMessage("Employee ID must not be empty"),
  body("*.firstName").notEmpty().withMessage("First name must not be empty"),
  body("*.lastName").notEmpty().withMessage("Last name must not be empty"),
  body("*.age")
    .notEmpty()
    .withMessage("Age must not be empty")
    .isNumeric()
    .withMessage("Age must be a number"),
]);

export const validateDesignation = withValidationErrors([
  body().toArray(),
  body("*.name").notEmpty().withMessage("Name must not be empty"),
  body("*.salary")
    .notEmpty()
    .withMessage("Salary must not be empty")
    .isNumeric()
    .withMessage("Salary must be a number"),
]);

export const validatePayroll = withValidationErrors([
  body().toArray(),
  body("*.from").notEmpty().withMessage("Starting Date must not be empty"),
  body("*.to")
    .notEmpty()
    .withMessage("End Date must not be empty")
    .custom((value, { req }) => {
      if (value < req.body.from) {
        throw new Error("End Date must be ahead than Starting Date");
      }
      return true;
    }),
  body("payrollGroupId")
    .notEmpty()
    .withMessage("Payroll Group Id must not be empty"),
  body("receiptId").notEmpty().withMessage("Receipt Id must not be empty"),
]);

export const validatePayrollGroup = withValidationErrors([
  body().toArray(),
  body("*.name").notEmpty().withMessage("Name must not be empty"),
  body("*.fundCluster")
    .notEmpty()
    .withMessage("Fund Cluster must not be empty"),
]);

export const validateHoliday = withValidationErrors([
  body().toArray(),
  body("*.name").notEmpty().withMessage("Name must not be empty"),
  body("*.prerequisiteDate")
    .notEmpty()
    .withMessage("Pre-requisite must not be empty"),
  body("*.requisiteDate").notEmpty().withMessage("requisite must not be empty"),
]);

export const validateTravelpass = withValidationErrors([
  body().toArray(),
  body("*.userId").notEmpty().withMessage("userId must not be empty"),
  body("*.typeOf").notEmpty().withMessage("Travelpass type must not be empty"),
  body("*.start").notEmpty().withMessage("start must not be empty"),
  body("*.end").notEmpty().withMessage("end must not be empty"),
]);

export const validateDeductions = withValidationErrors([
  body().toArray(),
  body("*.name").notEmpty().withMessage("Name must not be empty"),
  body("*.amount").notEmpty().withMessage("Amount must not be empty"),
]);

export const validateLeaveTypes = withValidationErrors([
  body().toArray(),
  body("*.name").notEmpty().withMessage("Name must not be empty"),
  body("*.description").notEmpty().withMessage("Description must not be empty"),
]);

export const validateAttendance = withValidationErrors([
  body().toArray(),
  body("*.code").notEmpty().withMessage("Code must not be empty"),
]);

export const validateAdminAttendance = withValidationErrors([
  body().toArray(),
  body("*.userId").notEmpty().withMessage("User ID must not be empty"),
]);

export const validateId = withValidationErrors([
  param("id").notEmpty().withMessage("Field ID must not be empty"),
]);
