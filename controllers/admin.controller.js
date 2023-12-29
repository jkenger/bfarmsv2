// Purpose: Index controller for the application

// Dependencies

import asyncHandler from "express-async-handler";

import {
  attendance,
  deductions,
  designation,
  employee,
  holiday,
  leaveTypes,
  payrollGroups,
  travelpass,
} from "../lib/utils.js";
import { models } from "../prisma/models/models.js";
import prisma from "../prisma/db/db.js";

// Attendance
export const getAllAttendance = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.attendance)
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

// Employees
export const getAllEmployees = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.user)
);
export const getPaginatedEmployees = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.user, employee)
);

export const createEmployee = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        age: Number(item.age),
        designationId: item.designationId ? item.designationId : null,
        payrollGroupId: item.payrollGroupId ? item.payrollGroupId : null,
        deductions: item.deductions.length ? item.deductions : null,
      };
    }),
  ];

  await models.addModel(res, data, prisma.user, {
    type: "explicit",
    fields: ["deductions"],
  });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        age: Number(item.age),
        designationId: item.designationId ? item.designationId : null,
        payrollGroupId: item.payrollGroupId ? item.payrollGroupId : null,
        deductions: item.deductions.length ? item.deductions : null,
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.user, {
    type: "explicit",
    fields: ["deductions"],
  });
});

export const deleteEmployee = asyncHandler(
  async (req, res) => await models.deleteModel(res, req.params.id, prisma.user)
);

/// Employees/Designation

export const getAllDesignations = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.designation)
);

export const getPaginatedDesignations = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.designation, designation)
);
export const createDesignation = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        salary: parseFloat(item.salary),
      };
    }),
  ];
  await models.addModel(res, data, prisma.designation);
});

export const deleteDesignation = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.designation)
);

export const updateDesignation = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        salary: parseFloat(item.salary),
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.designation);
});

// Payroll
export const getAllPayroll = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.payroll)
);

export const getPaginatedPayroll = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.payroll, payrollGroups)
);

export const createPayrollReceipt = asyncHandler(async (data) => {
  console.log(data);
  // await models.addModel(res, req.body, prisma.receipt);
});

export const createPayroll = asyncHandler(async (req, res) => {
  // Computation and mutation here
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        from: new Date(item.from),
        to: new Date(item.to),
      };
    }),
  ];

  // Create receipt
  // createPayrollReceipt;
  await models.addModel(res, req.body, prisma.payroll);
});

export const deletePayroll = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.payroll)
);

export const updatePayroll = asyncHandler(
  async (req, res) =>
    await models.updateModel(res, req.params.id, req.body, prisma.payroll)
);

// Payroll Groups
export const getAllPayrollGroups = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.payrollGroup)
);

export const getPaginatedPayrollGroups = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.payrollGroup, payrollGroups)
);

export const createPayrollGroup = asyncHandler(
  async (req, res) => await models.addModel(res, req.body, prisma.payrollGroup)
);

export const deletePayrollGroup = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.payrollGroup)
);

export const updatePayrollGroup = asyncHandler(
  async (req, res) =>
    await models.updateModel(res, req.params.id, req.body, prisma.payrollGroup)
);

// Holidays Controller
export const getAllHolidays = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.holiday)
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

// Travelpass Controller
export const getAllTravelpass = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.travelpass)
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

// Deductions Controller
export const getAllDeductions = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.deduction)
);
export const getPaginatedDeductions = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.deduction, deductions)
);

export const createDeductions = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        amount: parseFloat(item.amount),
      };
    }),
  ];
  await models.addModel(res, data, prisma.deduction);
});

export const deleteDeductions = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.deduction)
);

export const updateDeductions = asyncHandler(async (req, res) => {
  const data = [
    ...req.body.map((item) => {
      return {
        ...item,
        amount: parseFloat(item.amount),
      };
    }),
  ];
  await models.updateModel(res, req.params.id, data, prisma.deduction);
});

// Leave Types Controller
export const getAllLeaveTypes = asyncHandler(
  async (req, res) => await models.getAllModel(res, prisma.leaveType)
);
export const getPaginatedLeaveTypes = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.leaveType, leaveTypes)
);

export const createLeaveType = asyncHandler(async (req, res) => {
  await models.addModel(res, req.body, prisma.leaveType);
});

export const deleteLeaveType = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.leaveType)
);

export const updateLeaveType = asyncHandler(async (req, res) => {
  await models.updateModel(res, req.params.id, req.body, prisma.leaveType);
});
