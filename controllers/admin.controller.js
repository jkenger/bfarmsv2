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
  const userAdded = await prisma.user.create({
    data: req.body,
  });
  res.status(StatusCodes.OK).json({
    message: userAdded,
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
