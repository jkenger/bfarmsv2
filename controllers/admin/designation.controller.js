/// Employees/Designation
import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";
import { designation } from "../../lib/utils.js";
import prisma from "../../prisma/db/db.js";

export const getAllDesignations = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.designation)
);

export const getPaginatedDesignations = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.designation, designation)
);
export const createDesignation = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        salary: parseFloat(item.salary),
      };
    }),
  ];
  await models.addModel(res, data, prisma.designation);
});

export const deleteDesignation = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.designation)
);

export const updateDesignation = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        salary: parseFloat(item.salary),
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.designation);
});
