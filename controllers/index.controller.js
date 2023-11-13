// Purpose: Index controller for the application

// Dependencies
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import fs from "fs";

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

// without asyncHandler
export const woTimeAttendance = (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Hello from the server without asyncHandler",
  });
};
