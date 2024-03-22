import {
  attendance,
} from "../../lib/utils.js";
import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";
import prisma from "../../prisma/db/db.js";

// Attendance
export const getAllAttendance = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.attendance)
);
export const getPaginatedAttendance = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.attendance, attendance)
);

export const createAttendance = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        amTimeIn: item.amTimeIn
          ? new Date(new Date(item.amTimeIn).toUTCString())
          : null,
        amTimeOut: item.amTimeOut
          ? new Date(new Date(item.amTimeOut).toUTCString())
          : null,
        pmTimeIn: item.pmTimeIn
          ? new Date(new Date(item.pmTimeIn).toUTCString())
          : null,
        pmTimeOut: item.pmTimeOut
          ? new Date(new Date(item.pmTimeOut).toUTCString())
          : null,
      };
    }),
  ];
  console.log(data);
  await models.addModel(res, data, prisma.attendance);
});

export const updateAttendance = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        amTimeIn: item.amTimeIn
          ? new Date(new Date(item.amTimeIn).toUTCString())
          : null,
        amTimeOut: item.amTimeOut
          ? new Date(new Date(item.amTimeOut).toUTCString())
          : null,
        pmTimeIn: item.pmTimeIn
          ? new Date(new Date(item.pmTimeIn).toUTCString())
          : null,
        pmTimeOut: item.pmTimeOut
          ? new Date(new Date(item.pmTimeOut).toUTCString())
          : null,
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.attendance);
});

export const deleteAttendance = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.attendance)
);
