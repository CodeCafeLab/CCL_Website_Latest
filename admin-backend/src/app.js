require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const quickBiteRoutes = require("./routes/quickBiteRoutes");
const clientReviewRoutes = require("./routes/clientReviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");
const careerRoutes = require("./routes/careerRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const teamRoutes = require("./routes/teamRoutes");
const whyChooseUsRoutes = require("./routes/whyChooseUsRoutes");
const caseStudyRoutes = require("./routes/caseStudyRoutes");
const whitepaperRoutes = require("./routes/whitepaperRoutes");
const reportRoutes = require("./routes/reportRoutes");
const newsRoutes = require("./routes/newsRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const webinarRoutes = require("./routes/webinarRoutes");
const helpRoutes = require("./routes/helpRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const aiFeatureRoutes = require("./routes/aiFeatureRoutes");
const aiGenRoutes = require("./routes/aiGenRoutes");
const aiDemoRoutes = require("./routes/aiDemoRoutes");
const partnerRoutes = require("./routes/partnerRoutes");

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:9002",
  "https://6000-firebase-studio-1747976034162.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev",
  "https://adminb.codecafelab.in",
  "https://admin.codecafelab.in",
  "https://codecafelab.in",
];

// CORS origin checker
const isAllowedOrigin = (origin) => {
  if (!origin) return true; // allow curl/postman
  const normalizedOrigin = origin.replace(/\/$/, "").toLowerCase();
  return (
    normalizedOrigin.startsWith("http://localhost:") ||
    allowedOrigins.some((allowed) => {
      return normalizedOrigin === allowed.replace(/\/$/, "").toLowerCase();
    })
  );
};

// Apply CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming origin:", origin); // for debugging
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        console.log(`CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/images", imageRoutes);
app.use("/categories", categoryRoutes);
app.use("/quick-bites", quickBiteRoutes);
app.use("/client-reviews", clientReviewRoutes);
app.use("/contact", contactRoutes);
app.use("/products", productRoutes);
app.use("/careers", careerRoutes);
app.use("/job-applications", jobApplicationRoutes);
app.use("/teams", teamRoutes);
app.use("/why-choose-us", whyChooseUsRoutes);
app.use("/case-studies", caseStudyRoutes);
app.use("/whitepapers", whitepaperRoutes);
app.use("/reports", reportRoutes);
app.use("/news", newsRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/webinars", webinarRoutes);
app.use("/help", helpRoutes);
app.use("/tutorials", tutorialRoutes);
app.use("/newsletters", newsletterRoutes);
app.use("/quotes", quoteRoutes);
app.use("/ai", aiFeatureRoutes);
app.use("/ai-gen", aiGenRoutes);
app.use("/partners", partnerRoutes);

// Rate limiter for /ai-demo
const aiDemoLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many requests, please try again later." },
});

app.use("/ai-demo", aiDemoLimiter, aiDemoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
