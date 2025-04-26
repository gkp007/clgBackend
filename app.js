require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { College } = require("./models/College");
const { Submission } = require("./models/Submission");
const { InterestForm } = require("./models/InterestForm");
const { ContactUsForm } = require("./models/ContactUsForm");

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://imaginative-churros-52124b.netlify.app",
  "https://6809dd3da260d527745bdb61--imaginative-churros-52124b.netlify.app",
  "https://secondscholarship.com",
  "https://www.secondscholarship.com",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not set");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("Please make sure MongoDB is running and the connection string is correct");
  });

// API Routes
app.get("/api/colleges", async (req, res) => {
  try {
    console.log("Fetching colleges from database...");
    const colleges = await College.find();
    console.log(`Found ${colleges.length} colleges`);
    res.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({
      message: "Error fetching colleges",
      error: error.message || "Unknown error",
    });
  }
});

app.post("/api/colleges", async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    console.error("Error creating college:", error);
    res.status(400).json({
      message: "Error creating college",
      error: error.message || "Unknown error",
    });
  }
});

app.post("/api/submissions", async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(400).json({
      message: "Error while submitting",
      error: error.message || "Unknown error",
    });
  }
});

app.post("/api/interestForm", async (req, res) => {
  try {
    const interestForm = new InterestForm(req.body);
    await interestForm.save();
    res.status(201).json(interestForm);
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(400).json({
      message: "Error while submitting",
      error: error.message || "Unknown error",
    });
  }
});

app.post("/api/contactUs", async (req, res) => {
  try {
    const contactUsForm = new ContactUsForm(req.body);
    await contactUsForm.save();
    res.status(201).json(contactUsForm);
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(400).json({
      message: "Error while submitting",
      error: error.message || "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});