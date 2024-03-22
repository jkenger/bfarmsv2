import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";
import { payrollGroups } from "../../lib/utils.js";
import prisma from "../../prisma/db/db.js";

// Payroll Groups
export const getAllPayrollGroups = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.payrollGroup)
);

export const getPaginatedPayrollGroups = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.payrollGroup, payrollGroups)
);

export const createPayrollGroup = asyncHandler(
  async (req, res) => await models.addModel(res, req.body, prisma.payrollGroup)
);

export const deletePayrollGroup = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.payrollGroup)
);

export const updatePayrollGroup = asyncHandler(
  async (req, res) =>
    await models.updateModel(res, req.params.id, req.body, prisma.payrollGroup)
);
