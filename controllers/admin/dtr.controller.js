import asyncHandler from "express-async-handler";

import { createSheet, setDateTime } from "../../lib/helpers.js";
import { models } from "../../prisma/models/models.js";
import prisma from "../../prisma/db/db.js";
import { StatusCodes } from "http-status-codes";
import { allTimeCard, sheet, timeCard } from "../../lib/utils.js";

export const getAllSheets = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.sheet, sheet)
);

export const getPaginatedSheets = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.sheet, sheet)
);


export const getAllTimeCards = asyncHandler(
  async (req, res) =>
    await models.getAllModel(req, res, prisma.timeCard, allTimeCard)
);

export const getPaginatedTimeCard = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.timeCard, timeCard)
);

export const createTimeCard = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        from: setDateTime(0, 0, 0, 0, item.from),
        to: setDateTime(23, 59, 59, 999, item.to),
      };
    }),
  ];
  if (!data.length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("No information to be created was received. Please try again.");
  }

  const timeCard = data[0];
  const employeeId = timeCard.employeeId;
  const isAllEmployees = timeCard.isAllEmployees;

  const whereObj = !isAllEmployees ? { id: employeeId } : {};
  console.log("whereObj", whereObj);
  const { employees, allEmployeesCount } =
    await prisma.user.findUsersAttendance({
      where: whereObj,
      range: {
        from: timeCard.from,
        to: timeCard.to,
      },
    });

  if (!allEmployeesCount) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        "No employees found. Please check the employee's page if there is any existing employee."
      );
  }

  if (!employees.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        `No employee found with id ${employeeId}. Please check the employee's page if there is any existing employee.`
      );
  }

  // Create timecard
  const timeCardObj = !isAllEmployees
    ? {
        from: timeCard.from,
        to: timeCard.to,
        name: employees[0].fullName,
        isAllEmployees,
      }
    : {
        from: timeCard.from,
        to: timeCard.to,
        name: "All Employee",
        isAllEmployees,
      };
  const createdTimeCard = await prisma.timeCard.create({
    data: timeCardObj,
  });

  if (!createdTimeCard) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Error creating time card. Please try again.");
  }

  const createdSheets = await createSheet(prisma, employees, createdTimeCard);

  if (!createdSheets) {
    await prisma.timeCard.delete({
      where: {
        id: createdTimeCard.id,
      },
    });
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        "Time card was created but error creating time record card. Check the date range or check if there is any existing attendance from your employees."
      );
  }
  if (createdSheets) {
    return res.status(StatusCodes.OK).json({ data: createdSheets });
  }
});

export const updateTimeCard = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        from: setDateTime(0, 0, 0, 0, item.from),
        to: setDateTime(23, 59, 59, 999, item.to),
      };
    }),
  ];
  if (!data.length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("No information to be created was received. Please try again.");
  }

  const timeCard = data[0];
  const employeeId = timeCard.employeeId;
  const isAllEmployees = timeCard.isAllEmployees;

  const whereObj = !isAllEmployees ? { id: employeeId } : {};
  console.log("whereObj", whereObj);
  const { employees, allEmployeesCount } =
    await prisma.user.findUsersAttendance({
      where: whereObj,
      range: {
        from: timeCard.from,
        to: timeCard.to,
      },
    });

  if (!allEmployeesCount) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        "No employees found. Please check the employee's page if there is any existing employee."
      );
  }

  if (!employees.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        `No employee found with id ${employeeId}. Please check the employee's page if there is any existing employee.`
      );
  }

  // Create timecard
  const timeCardObj = !isAllEmployees
    ? {
        from: timeCard.from,
        to: timeCard.to,
        name: employees[0].fullName,
        isAllEmployees,
      }
    : {
        from: timeCard.from,
        to: timeCard.to,
        name: "All Employee",
        isAllEmployees,
      };
  const updatedTimeCard = await prisma.timeCard.update({
    where: {
      id: timeCard.id,
    },
    data: timeCardObj,
  });

  if (!updatedTimeCard) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Failted to update time card. Please try again.");
  }

  const deletedSheets = await prisma.sheet.deleteMany({
    where: {
      timeCardId: timeCard.id,
    },
  });

  if (!deletedSheets.count) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Error updating time card. Please try again.");
  }

  const updatedSheets = await createSheet(prisma, employees, updatedTimeCard);

  if (!updatedSheets) {
    await prisma.timeCard.delete({
      where: {
        id: updatedTimeCard.id,
      },
    });
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        "Time card was created but error creating time record card. Check the date range or check if there is any existing attendance from your employees."
      );
  }
  if (updatedSheets) {
    return res.status(StatusCodes.OK).json({ data: updatedSheets });
  }
});

export const deleteTimeCard = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.timeCard)
);
