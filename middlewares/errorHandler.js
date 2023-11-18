import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong, please try again later";

  if (
    message.includes("Unique constraint failed on the fields: (`employeeId`)")
  ) {
    return res.status(StatusCodes.CONFLICT).json("Id inserted already exists");
  }
  if (message.includes("not found")) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json("Data you are trying to retrieve/delete is not found");
  }
  return res.status(statusCode).json(message);
};

export default errorHandlerMiddleware;
