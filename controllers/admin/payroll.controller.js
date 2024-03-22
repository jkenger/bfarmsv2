
import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";


export const getAllReceipts = asyncHandler(
  async (req, res) =>
    await models.getAllModel(req, res, prisma.receipt, receipt)
);

export const getPaginatedReceipts = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.receipt, receipt)
);
