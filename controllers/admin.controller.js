// Purpose: Index controller for the application

// Dependencies

import asyncHandler from "express-async-handler";

import {
  allTimeCard,
  attendance,
  deductions,
  designation,
  employee,
  holiday,
  leaveTypes,
  payroll,
  payrollGroups,
  receipt,
  sheet,
  timeCard,
  travelpass,
} from "../lib/utils.js";
import { models } from "../prisma/models/models.js";
import prisma from "../prisma/db/db.js";
import {
  createPayrollReceipts,
  createSheet,
  setDateTime,
} from "../lib/helpers.js";
import { StatusCodes } from "http-status-codes";

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

// Card
export const getAllSheets = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.sheet, sheet)
);

export const getPaginatedSheets = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.sheet, sheet)
);

// Time Card
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
      }
    : {
        from: timeCard.from,
        to: timeCard.to,
        name: "All Employee",
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

export const deleteTimeCard = asyncHandler(
  async (req, res) =>
    await models.deleteModel(res, req.params.id, prisma.timeCard)
);

// Employees
export const getAllEmployees = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.user)
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
        deductions: item.deductions?.length ? item.deductions : null,
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
  async (req, res) => await models.getAllModel(req, res, prisma.designation)
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

  const { employees, employeeCount } = await prisma.user.findUsersAttendance({
    where: {
      payrollGroupId: payroll.payrollGroupId,
    },
    range: {
      from: payroll.from,
      to: payroll.to,
    },
  });

  if (!employeeCount) {
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

export const getAllReceipts = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.receipt)
);

export const getPaginatedReceipts = asyncHandler(
  async (req, res) =>
    await models.getPaginatedModel(req, res, prisma.receipt, receipt)
);

// Payroll Groups
export const getAllPayrollGroups = asyncHandler(
  async (req, res) => await models.getAllModel(req, res, prisma.payrollGroup)
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
  async (req, res) => await models.getAllModel(req, res, prisma.holiday)
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
  async (req, res) => await models.getAllModel(req, res, prisma.deduction)
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
  async (req, res) => await models.getAllModel(req, res, prisma.leaveType)
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
