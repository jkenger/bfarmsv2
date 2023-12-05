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

export const validateId = withValidationErrors([
  param("id").notEmpty().withMessage("Field ID must not be empty"),
]);
