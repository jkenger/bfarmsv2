import asyncHandler from "express-async-handler";
import { holiday } from "../../lib/utils.js";
import prisma from "../../prisma/db/db.js";
import { models } from "../../prisma/models/models.js";

export const getAllHolidays = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.holiday)
);
export const getPaginatedHolidays = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.holiday, holiday)
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
  await models.addModel(res, data, prisma.holiday);
});

export const deleteHoliday = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.holiday)
);

export const updateHoliday = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        prerequisiteDate: new Date(item.prerequisiteDate),
        requisiteDate: new Date(item.requisiteDate),
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.holiday);
});
