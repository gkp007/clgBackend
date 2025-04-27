require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { College } = require("./models/College");
const { Submission } = require("./models/Submission");
const { InterestForm } = require("./models/InterestForm");
const { ContactUsForm } = require("./models/ContactUsForm");
const { Blog } = require("./models/Blog");
const { Comment } = require("./models/Comment");
const { generateSitemap } = require("./utils/sitemap");

const app = express();

// SEO and Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(compression());

// CORS Middleware
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

// Blog Routes
app.get("/api/blogs", async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      message: "Error fetching blogs",
      error: error.message || "Unknown error",
    });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      message: "Error fetching blog",
      error: error.message || "Unknown error",
    });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json({
      message: "Error creating blog",
      error: error.message || "Unknown error",
    });
  }
});

app.put("/api/blogs/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.likes += 1;
    await blog.save();

    res.json({ likes: blog.likes });
  } catch (error) {
    console.error("Error updating blog likes:", error);
    res.status(500).json({
      message: "Error updating blog likes",
      error: error.message || "Unknown error",
    });
  }
});

// Comment Routes
app.get("/api/blogs/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.id })
      .sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      message: "Error fetching comments",
      error: error.message || "Unknown error",
    });
  }
});

app.post("/api/blogs/:id/comments", async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      blogId: req.params.id
    });
    await comment.save();

    // Update blog comment count
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { comments: 1 } });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(400).json({
      message: "Error creating comment",
      error: error.message || "Unknown error",
    });
  }
});

app.put("/api/comments/:id/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.likes += 1;
    await comment.save();

    res.json({ likes: comment.likes });
  } catch (error) {
    console.error("Error updating comment likes:", error);
    res.status(500).json({
      message: "Error updating comment likes",
      error: error.message || "Unknown error",
    });
  }
});

// SEO Routes
app.get("/sitemap.xml", async (req, res) => {
  try {
    const sitemap = await generateSitemap(process.env.BASE_URL || "https://secondscholarship.com");
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

app.get("/robots.txt", (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${process.env.BASE_URL || "https://secondscholarship.com"}/sitemap.xml`);
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