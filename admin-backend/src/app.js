const express = require("express");
const cors = require("cors");
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
const aiFeatureRoutes = require("./routes/aiFeatureRoutes"); // Add this line
const aiGenRoutes = require('./routes/aiGenRoutes');


const morgan = require("morgan");
// const sequelize = require('./config/db');
// const ContactMessage = require('./models/ContactUsModel');

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// REMOVE or comment out any Sequelize code like this:
// const { sequelize } = require('./config/db');
// sequelize.sync().then(() => { ... });

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quick-bites", quickBiteRoutes);
app.use("/api/client-reviews", clientReviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/teams", teamRoutes);

// New dynamic section routes
app.use("/api/why-choose-us", whyChooseUsRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/whitepapers", whitepaperRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/webinars", webinarRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/newsletters", newsletterRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/ai", aiFeatureRoutes);
app.use('/api/ai-gen', aiGenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
