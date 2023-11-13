// Description: Main server file

// Dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes imports
import index from "./routers/index.router.js";

// Middleware imports
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

// Publics
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Config
dotenv.config();

// Constants
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middlewares

/// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", index);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use(errorHandlerMiddleware);

// Database
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
