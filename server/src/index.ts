import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

// Conect to MongoDB
(async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
})();
