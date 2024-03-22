import asyncHandler from "express-async-handler";
import prisma from "../../prisma/db/db.js";
import { models } from "../../prisma/models/models.js";
import { employee } from "../../lib/utils.js";

// Employees
export const getAllEmployees = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.user)
);
export const getPaginatedEmployees = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.user, employee)
);

export const createEmployee = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        age: Number(item.age),
        designationId: item.designationId ? item.designationId : null,
        payrollGroupId: item.payrollGroupId ? item.payrollGroupId : null,
        deductions: item.deductions?.length ? item.deductions : null,
      };
    }),
  ];

  await models.addModel(res, data, prisma.user, {
    type: "explicit",
    fields: ["deductions"],
  });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        age: Number(item.age),
        designationId: item.designationId ? item.designationId : null,
        payrollGroupId: item.payrollGroupId ? item.payrollGroupId : null,
        deductions: item.deductions.length ? item.deductions : null,
      };
    }),
  ];

  await models.updateModel(res, req.params.id, data, prisma.user, {
    type: "explicit",
    fields: ["deductions"],
  });
});

export const deleteEmployee = asyncHandler(
  async (req, res) => await models.deleteModel(res, req.params.id, prisma.user)
);
