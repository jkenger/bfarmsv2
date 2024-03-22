import asyncHandler from "express-async-handler";
import prisma from "../../prisma/db/db.js";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { setDateTime } from "../../lib/helpers.js";


export const getDashboard = asyncHandler(async (req, res) => {
  const { total, data } = await getDailyAttendance();
  const attendanceRanking = await getAttendanceRanking();
  const recentAttendances = await getAttendanceToday();
  const firstHalfDate = 15;
  const dataObj =
    new Date().getDate() <= firstHalfDate
      ? {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        }
      : {
          from: addDays(startOfMonth(new Date()), 15),
          to: endOfMonth(new Date()),
        };
  return res.status(200).json({
    overallStats: {
      attendance: { total, data, dateRange: dataObj },
      recentAttendances,
      ranking: {
        total: attendanceRanking.data[0].name,
        data: attendanceRanking.data,
        dateRange: dataObj,
      },
    },
  });
});
export const getAttendanceToday = asyncHandler(async (req, res) => {
  const attendances = await prisma.attendance.findMany({
    where: {
      attendanceDate: {
        gte: setDateTime(0, 0, 0),
        lt: setDateTime(23, 59, 59, 99),
      },
    },
    include: {
      user: {
        include: {
          payrollGroup: true,
          designation: true,
          attendances: {
            where: {
              attendanceDate: {
                gte: new Date(startOfWeek(setDateTime(0, 0, 0))),
                lte: new Date(endOfWeek(setDateTime(23, 59, 59))),
              },
            },
          },
        },
      },
    },
  });
  // .filter((attendance) => ({
  //   ...attendance,
  //   attendances: attendance.attendances.filter((item) => {
  //     return (
  //       item.attendanceDate >= setDateTime(0, 0, 0) &&
  //       item.attendanceDate <= setDateTime(23, 59, 59)
  //     );
  //   }),
  // }));
  return attendances.map((attendance) => {
    return {
      ...attendance,

      attendanceDate: new Date(attendance.attendanceDate).toLocaleDateString(),
    };
  });
});
export const getAttendanceRanking = asyncHandler(async (req, res) => {
  const firstHalfDate = 15;
  const dataObj =
    new Date().getDate() <= firstHalfDate
      ? {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        }
      : {
          from: addDays(startOfMonth(new Date()), 15),
          to: endOfMonth(new Date()),
        };
  console.log(dataObj);
  const { employees, allEmployeesCount } =
    await prisma.user.findUsersAttendance({
      range: dataObj,
    });

  // filter 10 employees with the largest attendance
  const employeesWithAttendance = employees.map((employee) => {
    const attendanceCount = employee.attendanceData.attendances.length;
    return {
      name: employee.lastName,
      employeeId: employee.employeeId,
      total: attendanceCount,
    };
  });

  employeesWithAttendance.sort((a, b) => b.total - a.total);

  // Step 3: Get the top 5 employees
  const top5Employees = employeesWithAttendance.slice(0, 10);

  // const topTenEmployees = sortedEmployees.slice(0, 10);

  return { total: allEmployeesCount, data: top5Employees };
});

export const getDailyAttendance = asyncHandler(async (req, res) => {
  const firstHalfDate = 15;
  const dataObj =
    new Date().getDate() <= firstHalfDate
      ? {
          gte: startOfMonth(new Date()),
          lte: endOfMonth(new Date()),
        }
      : {
          gte: addDays(startOfMonth(new Date()), 15),
          lte: endOfMonth(new Date()),
        };
  const attendanceData = await prisma.attendance.findMany({
    where: {
      attendanceDate: dataObj,
    },
  });
  const totalEmployeesMap = new Map();

  attendanceData.forEach((entry) => {
    const date = entry.attendanceDate;
    const dayNumber = format(new Date(date), "d");
    const total = totalEmployeesMap.get(dayNumber) || 0;
    totalEmployeesMap.set(dayNumber, total + 1);
  });

  // Fill in missing days with total count 0
  if (new Date().getDate() <= firstHalfDate) {
    for (let i = 1; i <= firstHalfDate; i++) {
      if (!totalEmployeesMap.has(i.toString())) {
        totalEmployeesMap.set(i.toString(), 0);
      }
    }
  } else {
    for (
      let i = firstHalfDate + 1;
      i <= endOfMonth(new Date()).getDate();
      i++
    ) {
      if (!totalEmployeesMap.has(i.toString())) {
        totalEmployeesMap.set(i.toString(), 0);
      }
    }
  }
  // Convert the Map entries to an array of objects
  const overallData = [...totalEmployeesMap.entries()]
    .map(([day, total]) => ({
      day: parseInt(day),
      total,
    }))
    .sort((a, b) => a.day - b.day);

  const overallTotal = overallData.reduce((sum, entry) => sum + entry.total, 0);

  return { total: overallTotal, data: overallData };
});
