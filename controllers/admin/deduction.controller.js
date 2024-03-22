import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";
import prisma from "../../prisma/db/db.js";
import { deductions } from "../../lib/utils.js";

export const getAllDeductions = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.deduction)
);
export const getPaginatedDeductions = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.deduction, deductions)
);

export const createDeductions = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        amount: parseFloat(item.amount),
      };
    }),
  ];
  await models.addModel(res, data, prisma.deduction);
});

export const deleteDeductions = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.deduction)
);

export const updateDeductions = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        amount: parseFloat(item.amount),
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.deduction);
});
