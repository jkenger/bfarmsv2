


// Dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes imports
import index from "./routers/index.router.js";
import admin from "./routers/admin.router.js";
import auth from "./routers/auth.router.js";
import passportAuth from "./middlewares/auth.middleware.js";

// Middleware imports
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

// Publics
import path, { dirname } from "path";
import { fileURLToPath } from "url";


// @TODO: Integrate Auth


// Config
dotenv.config();
process.env.TZ = "Asia/Singapore";
// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middlewares

/// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const whitelist = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://f8rmn02v-5173.asse.devtunnels.ms",
  "https://global.rel.tunnels.api.visualstudio.com",
  "https://bfarmsv2.onrender.com",
]; // Whitelisted origins

const corsOptions = {
  // true,nly if there is a cookie
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
//
app.use(cors(corsOptions));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// Routes
app.use("/api/v1", index);
app.use("/api/v1/admin", admin);
// Auth
app.use(passportAuth.initialize());
app.use("/api/v1/auth", auth);

// Tests from prisma routes
// app.get("/api/v1/test", async (req, res) => {
//   const allUsers = await prisma.user.findMany({
//     include: {
//       houseBuild: true,
//       houseOwned: true,
//     },
//   });
//   res.json(allUsers);
// });

// app.post("/api/v1/test", async (req, res) => {
//   const user = await prisma.user.create({
//     data: req.body,
//   });
//   res.json(user);
// });

// app.put("/api/v1/test/:id", async (req, res) => {
//   const id = req.params.id;
//   const newAge = req.body.age;
//   const updatedUser = await prisma.user.update({
//     where: { id: Number(id) },
//   });
//   res.json(updatedUser);
// });

// app.delete("/api/v1/test/:id", async (req, res) => {
//   const id = req.params.id;
//   const deletedUser = await prisma.user.delete({
//     where: { id: Number(id) },
//   });
//   res.json(deletedUser);
// });
// app.post("/api/v1/test/house", async (req, res) => {
//   const { address, ownerId, builtById } = req.body;
//   console.log(req.body);
//   const house = await prisma.house.create({
//     data: {
//       address,
//       ownerId: ownerId,
//       builtById: builtById,
//     },
//   });
//   res.json(house);
// });

// app.get("/api/v1/test/house", async (req, res) => {
//   const house = await prisma.house.findMany();
//   res.json(house);
// });

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
