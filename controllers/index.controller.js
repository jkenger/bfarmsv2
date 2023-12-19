// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import fs from "fs";
import prisma from "../prisma/db/db.js";
import { models } from "../prisma/models/models.js";
import { differenceInMinutes } from "date-fns";
import { setDateTime } from "../lib/helpers.js";

// with asyncHandler
export const timeAttendance = asyncHandler((req, res) => {
  // const user = null;
  // const authenticated = false;
  // const authorized = false;

  // if (!user) {
  //   res.status(StatusCodes.NOT_FOUND).json({
  //     message: "You are not authorized to access this route",
  //   });
  // }

  // if (!authenticated) {
  //   res.status(StatusCodes.UNAUTHORIZED).json({
  //     message: "You are not authorized to access this route",
  //   });
  // }

  // if (!authorized) {
  //   res.status(StatusCodes.FORBIDDEN).json({
  //     message: "You are not authorized to access this route",
  //   });
  // }

  res.status(200).json({
    message: "Hello from the server",
  });
});

// Attendance
export const createAttendance = asyncHandler(async (req, res) => {
  const employeeId = req.body[0].code;

  // const attendanceType = req.body[0].attendanceType;

  // Get 8 AM date time
  const eightAm = setDateTime(8, 0, 0);
  // Get 12 PM date time
  const twelvePm = setDateTime(12, 0, 0);
  // Get 1 PM date time
  const onePm = setDateTime(13, 0, 0);
  // Get 5 PM date time
  const fivePm = setDateTime(17, 0, 0);

  const currentDateTime = new Date();

  console.log("Current DateTime: ", currentDateTime);
  console.log("8 AM DateTime: ", eightAm);

  const user = await prisma.user.findUserWithEmployeeId(employeeId);
  const userId = user.id;
  const attendances = user.attendances;

  if (!user) {
    return res.send(StatusCodes.NOT_FOUND).json({
      message: "Employee with the ID provided not found",
    });
  }

  const currentDayAttendance = attendances.find((attendance) => {
    const currentDateStart = setDateTime(0, 0, 0);
    const currentDateEnd = setDateTime(23, 59, 59);
    const createdAt = setDateTime(0, 0, 0, 0, attendance.createdAt);
    return createdAt >= currentDateStart && createdAt <= currentDateEnd;
  });

  // If no attendance, create attendance
  if (!currentDayAttendance) {
    // AM Time In
    // If between 8 am and 12pm and no am time in, create attendance
    if (currentDateTime < twelvePm) {
      if (!attendances?.amTimeIn) {
        const data = [
          {
            userId,
            amTimeIn: currentDateTime,
            // If late, set late to true
            isLate: currentDateTime > eightAm ? true : false,
            lateMinutes:
              differenceInMinutes(currentDateTime, eightAm) < 0
                ? 0
                : differenceInMinutes(currentDateTime, eightAm),
          },
        ];
        await models.addModel(res, data, prisma.attendance);
      }
    }

    // PM Time In
    // If between 12pm and 5 pm and no pm time in and am time in, create attendance
    if (currentDateTime > twelvePm) {
      if (!attendances?.pmTimeIn) {
        const data = [
          {
            userId,
            pmTimeIn: currentDateTime,
            // If late, set late to true
            isLate: currentDateTime > onePm ? true : false,
            lateMinutes:
              differenceInMinutes(currentDateTime, onePm) < 0
                ? 0
                : differenceInMinutes(currentDateTime, onePm),
          },
        ];
        await models.addModel(res, data, prisma.attendance);
      }
    }
  }

  // If there is attendance, update attendance
  if (currentDayAttendance) {
    // If there is am time in and no am time out, update attendance's am time out
    if (currentDateTime < onePm) {
      if (currentDayAttendance.pmTimeIn) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Time out will be available after 1 PM",
        });
      }

      // AM Time out
      // If there is am time in and no am time out, update attendance's am time out
      if (currentDayAttendance?.amTimeIn && !currentDayAttendance?.amTimeOut) {
        const data = [
          {
            ...currentDayAttendance,
            amTimeOut: currentDateTime,
            // If late, set late to true
            isUndertime: currentDateTime < twelvePm ? true : false,
            undertimeMinutes:
              differenceInMinutes(twelvePm, currentDateTime) < 0
                ? 0
                : differenceInMinutes(twelvePm, currentDateTime),
          },
        ];
        await models.updateModel(
          res,
          currentDayAttendance.id,
          data,
          prisma.attendance
        );
      }
      if (currentDateTime > twelvePm) {
        if (currentDayAttendance?.amTimeOut && !currentDayAttendance.pmTimeIn) {
          const data = [
            {
              ...currentDayAttendance,
              pmTimeIn: currentDateTime,
              // If late, set late to true
              isLate: currentDateTime > fivePm ? true : false,
              lateMinutes:
                differenceInMinutes(currentDateTime, fivePm) < 0
                  ? 0
                  : currentDayAttendance.lateMinutes +
                    differenceInMinutes(currentDateTime, fivePm),
            },
          ];
          await models.updateModel(
            res,
            currentDayAttendance.id,
            data,
            prisma.attendance
          );
        }
      }
    }

    // One PM to 5 PM
    if (currentDateTime > onePm) {
      // If there is am time in and no am time out, return
      if (!currentDayAttendance.amTimeOut && currentDayAttendance.amTimeIn) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "No am time out. Please time out first before timing in.",
        });
      }
      console.log("PM TIME OUT");

      // WHOLE DAY Pm Time in
      // If there is am time in, update attendance's pm time in
      if (!currentDayAttendance.pmTimeIn) {
        const data = [
          {
            ...currentDayAttendance,
            pmTimeIn: currentDateTime,
            // If late, set late to true
            isLate: currentDateTime > fivePm ? true : false,
            lateMinutes:
              differenceInMinutes(currentDateTime, fivePm) < 0
                ? 0
                : currentDayAttendance.lateMinutes +
                  differenceInMinutes(currentDateTime, fivePm),
          },
        ];
        await models.updateModel(
          res,
          currentDayAttendance.id,
          data,
          prisma.attendance
        );
      }

      // WHOLE DAY PM Time out
      if (currentDayAttendance.pmTimeIn && !currentDayAttendance.pmTimeOut) {
        const data = [
          {
            ...currentDayAttendance,
            pmTimeOut: currentDateTime,
            // If late, set late to true
            isUndertime: currentDateTime < fivePm ? true : false,
            undertimeMinutes:
              differenceInMinutes(fivePm, currentDateTime) < 0
                ? 0
                : currentDayAttendance.undertimeMinutes +
                  differenceInMinutes(fivePm, currentDateTime),
          },
        ];
        await models.updateModel(
          res,
          currentDayAttendance.id,
          data,
          prisma.attendance
        );
      }
    }

    // If there is pm time in and no pm time out, return
    if (currentDayAttendance.pmTimeOut) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You have already timed out for the day",
      });
    }
  }

  // return models.addModel(res, data, prisma.attendance);
});

// without asyncHandler
export const woTimeAttendance = (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Hello from the server without asyncHandler",
  });
};
