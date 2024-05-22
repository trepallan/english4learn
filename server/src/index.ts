import express from "express";
import http from "http";
import cors from "cors";
import startup from "./startup/startup";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import logger from "morgan";

// Conect to MongoDB
(async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
})();

// Create Express server
const corsOptions = {
  origin: process.env.CLIENT_URL as string,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const app = express();
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

startup(app);

// Start Express server
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
