import express from "express";
import compression from "compression";
import http from "http";
import cors from "cors";
import startup from "./startup/startup";
import mongoose from "mongoose";
import "dotenv/config";

// Conect to MongoDB
(async function connect() {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) throw new Error(" cannot get mongodb url from environment");
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
})();

// Create Express server
const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) throw new Error(" cannot get client url from environment");
const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(compression());

startup(app);

// Start Express server
const server = http.createServer(app);
const SERVER_PORT = process.env.PORT;
server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
