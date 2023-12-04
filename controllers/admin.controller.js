// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  createQueryObject,
  designationSearch,
  employeeSearch,
} from "../lib/utils.js";

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (operation === "create") {
          return await query({
            ...args,
            data: {
              ...args.data,
              fullName: `${args.data.lastName} ${args.data.firstName} ${args.data.middleName}`,
            },
          });
        }
        if (operation === "update") {
          const user = await query(args);
          return await query({
            ...args,
            data: {
              ...args.data,

              fullName: `${user.lastName} ${user.firstName} ${user.middleName}`,
            },
          });
        }

        return query(args);
      },
    },
  },
});

// Employees
export const getEmployees = asyncHandler(async (req, res) => {
  // await prisma.user.deleteAllUsers();

  const { queryObject, filter, limit } = createQueryObject(req, employeeSearch);

  const data = await prisma.user.findMany(queryObject);
  // console.log(data);

  const dataCount = await prisma.user.count(filter);
  const numOfPages = Math.ceil(dataCount / limit);

  if (!data || !data.length) {
    return res.status(StatusCodes.OK).json({
      data: [],
      numOfPages,
    });
  }

  res.status(StatusCodes.OK).json({
    data,
    numOfPages,
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
    data: data[0],
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
    data: data[0],
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
  const { queryObject, filter, limit } = createQueryObject(
    req,
    designationSearch
  );
  const data = await prisma.designation.findMany(queryObject);

  const dataCount = await prisma.designation.count(filter);
  const numOfPages = Math.ceil(dataCount / limit);
  if (!data || !data.length) {
    return res.status(StatusCodes.OK).json({
      data: [],
      numOfPages: 0,
    });
  }
  res.status(StatusCodes.OK).json({
    data,
    numOfPages,
  });
});
export const createDesignation = asyncHandler(async (req, res) => {
  const data = req.body;
  if (Array.isArray(data)) {
    if (data?.length > 1) {
      console.log("Multiple designations adding");
      const designationAdded = await prisma.designation.createMany({
        data: data,
        skipDuplicates: true,
      });
      console.log("designation added");
      return res.status(StatusCodes.OK).json({
        message: designationAdded,
      });
    }
  }

  const designationAdded = await prisma.designation.create({
    data: data[0],
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
