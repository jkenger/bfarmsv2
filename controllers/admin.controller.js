// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Employees
export const getEmployees = asyncHandler(async (req, res) => {
  const search = req.query.search;
  const page = Number(req.query.page) || 1;
  const sp = req.query.sp;
  const toSort = sp.split(",")[0];
  const sortOrder = sp.split(",")[1];

  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // Page 2: (2 - 1) * 10 = 10

  let pageQuery = {
    skip: skip,
    take: limit,
  };
  let filter = {};
  let sort = {
    orderBy: {
      updatedAt: "desc",
    },
  };
  let queryObject = { ...pageQuery, ...sort };

  //query for search
  if (search || search.length) {
    filter = {
      where: {
        OR: [
          {
            employeeId: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            payrollGroup: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            designation: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    };
    queryObject = {
      ...filter,
    };
  }
  if (sp || sp.length) {
    sort = {
      orderBy: {
        [toSort]: sortOrder,
      },
    };
    if (toSort === "fullName") {
      sort = {
        orderBy: [
          {
            firstName: sortOrder,
          },
          {
            lastName: sortOrder,
          },
        ],
      };
    }
    if (toSort === "payrollGroup") {
      sort = {
        orderBy: {
          payrollGroup: {
            name: sortOrder,
          },
        },
      };
    }
    if (toSort === "designation") {
      sort = {
        orderBy: {
          designation: {
            name: sortOrder,
          },
        },
      };
    }
    if (toSort === "salary") {
      sort = {
        orderBy: {
          designation: {
            salary: sortOrder,
          },
        },
      };
    }
  }
  queryObject = {
    ...queryObject,
    ...sort,
  };
  console.log(queryObject);

  const data = await prisma.user.findMany(queryObject);
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
