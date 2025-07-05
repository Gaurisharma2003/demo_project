const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 6000;

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit();
  });

// ✅ Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`📥 ${req.method} request to ${req.url}`);
  next();
});

// ✅ Routes
const userRoutes = require("./routes/userss");
app.use("/api", userRoutes); // API endpoint will be /api/login etc.

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});
