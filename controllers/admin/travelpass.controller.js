import asyncHandler from "express-async-handler";
import { travelpass } from "../../lib/utils.js";
import { models } from "../../prisma/models/models.js";
import prisma from "../../prisma/db/db.js";

export const getAllTravelpass = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.travelpass)
);
export const getPaginatedTravelpass = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.travelpass, travelpass)
);

export const createTravelpass = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
        expireAt: new Date(item.end),
      };
    }),
  ];
  await models.addModel(res, data, prisma.travelpass);
});

export const deleteTravelpass = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.travelpass)
);

export const updateTravelpass = asyncHandler(
  async (req, res) =>
    await models.updateModel(res, req.params.id, req.body, prisma.travelpass)
);
