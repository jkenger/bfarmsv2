// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

import { PrismaClient } from "@prisma/client";
import {
  createQueryObject,
  designation,
  employee,
  holiday,
  payrollGroups,
} from "../lib/utils.js";
import { models } from "../prisma/models/models.js";

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create") {
          return await query({
            ...args,
            data: {
              ...args.data,
              fullName: `${args.data.lastName} ${args.data.firstName} ${args.data.middleName}`,
            },
          });
        }
        if (operation === "update") {
          const user = await query(args);
          return await query({
            ...args,
            data: {
              ...args.data,

              fullName: `${user.lastName} ${user.firstName} ${user.middleName}`,
            },
          });
        }

        return query(args);
      },
    },
  },
});

// Employees
export const getAllEmployees = asyncHandler(async (req, res) =>
  models.getAllModel(res, prisma.user)
);
export const getPaginatedEmployees = asyncHandler(async (req, res) =>
  models.getPaginatedModel(req, res, prisma.user, employee)
);

export const createEmployee = asyncHandler(async (req, res) =>
  models.addModel(res, req.body, prisma.user)
);

export const updateEmployee = asyncHandler(async (req, res) =>
  models.updateModel(res, req.params.id, req.body, prisma.user)
);

export const deleteEmployee = asyncHandler(async (req, res) =>
  models.deleteModel(res, req.params.id, prisma.user)
);

/// Employees/Designation

export const getAllDesignations = asyncHandler(async (req, res) =>
  models.getAllModel(res, prisma.designation)
);

export const getPaginatedDesignations = asyncHandler(async (req, res) =>
  models.getPaginatedModel(req, res, prisma.designation, designation)
);
export const createDesignation = asyncHandler(async (req, res) =>
  models.addModel(res, req.body, prisma.designation)
);

export const deleteDesignation = asyncHandler(async (req, res) =>
  models.deleteModel(res, req.params.id, prisma.designation)
);

export const updateDesignation = asyncHandler(async (req, res) =>
  models.updateModel(res, req.params.id, req.body, prisma.designation)
);

// Payroll Groups
export const getAllPayrollGroups = asyncHandler(async (req, res) =>
  models.getAllModel(res, prisma.payrollGroup)
);

export const getPaginatedPayrollGroups = asyncHandler(async (req, res) =>
  models.getPaginatedModel(req, res, prisma.payrollGroup, payrollGroups)
);

export const createPayrollGroup = asyncHandler(async (req, res) =>
  models.addModel(res, req.body, prisma.payrollGroup)
);

export const deletePayrollGroup = asyncHandler(async (req, res) =>
  models.deleteModel(res, req.params.id, prisma.payrollGroup)
);

export const updatePayrollGroup = asyncHandler(async (req, res) =>
  models.updateModel(res, req.params.id, req.body, prisma.payrollGroup)
);

// Holidays Controller
export const getAllHolidays = asyncHandler(async (req, res) =>
  models.getAllModel(res, prisma.holiday)
);
export const getPaginatedHolidays = asyncHandler(async (req, res) =>
  models.getPaginatedModel(req, res, prisma.holiday, holiday)
);

export const createHoliday = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        prerequisiteDate: new Date(item.prerequisiteDate),
        requisiteDate: new Date(item.requisiteDate),
      };
    }),
  ];
  return models.addModel(res, data, prisma.holiday);
});

export const deleteHoliday = asyncHandler(async (req, res) =>
  models.deleteModel(res, req.params.id, prisma.holiday)
);

export const updateHoliday = asyncHandler(async (req, res) =>
  models.updateModel(res, req.params.id, req.body, prisma.holiday)
);
