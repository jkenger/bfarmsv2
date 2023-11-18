// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Employees
export const getEmployees = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(StatusCodes.OK).json({
    message: allUsers,
  });
});

export const createEmployee = asyncHandler(async (req, res) => {
  const data = req.body;
  if (Array.isArray(data)) {
    if (data?.length > 1) {
      console.log("Multiple employees adding");
      const userAdded = await prisma.user.createMany({
        data: data,
        skipDuplicates: true,
      });
      console.log("userAdded");
      return res.status(StatusCodes.OK).json({
        message: userAdded,
      });
    }
  }

  const userAdded = await prisma.user.create({
    data,
  });
  res.status(StatusCodes.OK).json({
    message: userAdded,
  });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const userUpdated = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  res.status(StatusCodes.OK).json({
    message: userUpdated,
  });
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userDeleted = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(StatusCodes.OK).json({
    message: userDeleted,
  });
});

/// Employees/Designation
export const getDesignations = asyncHandler(async (req, res) => {
  const allDesignations = await prisma.designation.findMany();
  res.status(StatusCodes.OK).json({
    message: allDesignations,
  });
});
export const createDesignation = asyncHandler(async (req, res) => {
  const designationAdded = await prisma.designation.create({
    data: req.body,
  });
  res.status(StatusCodes.OK).json({
    message: designationAdded,
  });
});

export const createPayrollGroup = asyncHandler(async (req, res) => {
  const payrollGroupAdded = await prisma.payrollGroup.create({
    data: req.body,
  });
  res.status(StatusCodes.OK).json({
    message: payrollGroupAdded,
  });
});

export const getPayrollGroups = asyncHandler(async (req, res) => {
  const allPayrollGroups = await prisma.payrollGroup.findMany();
  res.status(StatusCodes.OK).json({
    message: allPayrollGroups,
  });
});
