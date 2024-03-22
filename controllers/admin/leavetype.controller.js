import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";
import prisma from "../../prisma/db/db.js";
import { leaveTypes } from "../../lib/utils.js";

export const getAllLeaveTypes = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.leaveType)
);
export const getPaginatedLeaveTypes = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.leaveType, leaveTypes)
);

export const createLeaveType = asyncHandler(async (req, res) => {
  await models.addModel(res, req.body, prisma.leaveType);
});

export const deleteLeaveType = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.leaveType)
);

export const updateLeaveType = asyncHandler(async (req, res) => {
  await models.updateModel(res, req.params.id, req.body, prisma.leaveType);
});
