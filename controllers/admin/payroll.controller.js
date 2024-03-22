
import asyncHandler from "express-async-handler";
import { models } from "../../prisma/models/models.js";
import { createPayrollReceipts, setDateTime } from "../../lib/helpers.js";
import { StatusCodes } from "http-status-codes";
import { payroll, receipt } from "../../lib/utils.js";
import prisma from "../../prisma/db/db.js";


export const getAllReceipts = asyncHandler(
  async (req, res) =>
    await models.getAllModel(req, res, prisma.receipt, receipt)
);

export const getPaginatedReceipts = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.receipt, receipt)
);
export const getAllPayroll = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.payroll)
);

export const getPaginatedPayroll = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.payroll, payroll)
);

export const createPayroll = asyncHandler(async (req, res) => {
  // Computation and mutation here
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

  const payroll = data[0];

  // Create employee payroll data
  const { employees, allEmployeesCount } =
    await prisma.user.findUsersAttendance({
      where: {
        payrollGroupId: payroll.payrollGroupId,
      },
      range: {
        from: payroll.from,
        to: payroll.to,
      },
    });
  // Check if there are employees
  if (!allEmployeesCount) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        "No employees found. Please check the employee's page if there is any existing employee."
      );
  }

  // Create payroll
  const createdPayroll = await prisma.payroll.create({
    data: {
      from: payroll.from,
      to: payroll.to,
      payrollGroupId: payroll.payrollGroupId,
    },
    include: {
      payrollGroup: true,
    },
  });
  // Check if payroll was created
  if (!createdPayroll) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Error creating payroll. Please try again.");
  }

  // Create payroll receipt
  const createdPayrollReceipt = await createPayrollReceipts(
    prisma,
    employees,
    createdPayroll.id
  );
  console.log("createdPayrollReceipt", createdPayrollReceipt);
  // Check if payroll receipt was created
  if (!createdPayrollReceipt) {
    await prisma.payroll.delete({
      where: {
        id: createdPayroll.id,
      },
    });
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Error creating payroll receipt. Please try again.");
  }
  if (createdPayrollReceipt) {
    return res.status(StatusCodes.OK).json({ data: createdPayroll });
  }

  // Create receipt
  // createPayrollReceipt;
  // await models.addModel(res, req.body, prisma.payroll);
});

export const updatePayroll = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        from: setDateTime(0, 0, 0, 0, item.from),
        to: setDateTime(23, 59, 59, 999, item.to),
      };
    }),
  ];
  const payroll = data[0];

  const { employees, allEmployeesCount } =
    await prisma.user.findUsersAttendance({
      where: {
        payrollGroupId: payroll.payrollGroupId,
      },
      range: {
        from: payroll.from,
        to: payroll.to,
      },
    });

  if (!allEmployeesCount) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        `No employees found from ${new Date(
          payroll.from
        ).toDateString()} to ${new Date(
          payroll.to
        ).toDateString()}. Please check the dates.`
      );
  }

  // delete receipts from - to
  const deletedReceipts = await prisma.receipt.deleteMany({
    where: {
      payrollId: payroll.id,
    },
  });

  if (!deletedReceipts.count) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        `No receipts found from ${new Date(
          payroll.from
        ).toDateString()} to ${new Date(
          payroll.to
        ).toDateString()}. Please check the dates.`
      );
  }

  const updatedPayroll = await prisma.payroll.update({
    where: {
      id: payroll.id,
    },
    data: {
      from: payroll.from,
      to: payroll.to,
      payrollGroupId: payroll.payrollGroupId,
    },
    include: {
      payrollGroup: true,
    },
  });
  if (!updatedPayroll) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Error updating payroll. Please try again.");
  }

  // @TODO: CREATE A NEW UPDATE PAYROLL RECEIPT FUNCTION
  const createdPayrollReceipt = await createPayrollReceipts(
    prisma,
    employees,
    updatedPayroll.id
  );
  if (!createdPayrollReceipt) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Error updating payroll receipt. Please try again.");
  }
  if (createdPayrollReceipt) {
    return res.status(StatusCodes.OK).json({ data: updatedPayroll });
  }

  // await models.updateModel(res, req.params.id, data, prisma.payroll);
});
export const deletePayroll = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.payroll)
);