// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// with asyncHandler
export const getEmployees = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(StatusCodes.OK).json({
    message: allUsers,
  });
});

export const addEmployee = asyncHandler(async (req, res) => {
  const userAdded = await prisma.user.create({
    data: req.body,
  });
  res.status(StatusCodes.OK).json({
    message: userAdded,
  });
});
