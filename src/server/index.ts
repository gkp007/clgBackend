require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { College } = require("./models/College");
const { Submission } = require("./models/Submission");
const { InterestForm } = require("./models/InterestForm");
const { ContactUsForm } = require("./models/ContactUsForm");

import type { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: false,
  })
);

app.use(express.json());

// Add error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/colleges_db";

console.log("Attempting to connect to MongoDB at:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
    console.error(
      "Please make sure MongoDB is running and the connection string is correct"
    );
  });

// API Routes
app.get("/api/colleges", async (_req: Request, res: Response) => {
  try {
    console.log("Fetching colleges from database...");
    const colleges = await College.find();
    console.log(`Found ${colleges.length} colleges`);
    res.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({
      message: "Error fetching colleges",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/api/colleges", async (req: Request, res: Response) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    console.error("Error creating college:", error);
    res.status(400).json({
      message: "Error creating college",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/api/submissions", async (req: Request, res: Response) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(400).json({
      message: "Error while submitting",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
app.post("/api/interestForm", async (req: Request, res: Response) => {
  try {
    const interestForm = new InterestForm(req.body);
    await interestForm.save();
    res.status(201).json(interestForm);
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(400).json({
      message: "Error while submitting",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
app.post("/api/contactUs", async (req: Request, res: Response) => {
  try {
    const contactUsForm = new ContactUsForm(req.body);
    await contactUsForm.save();
    res.status(201).json(contactUsForm);
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(400).json({
      message: "Error while submitting",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
  console.log(
    `Try accessing http://localhost:${PORT}/health to check server status`
  );
});
