import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend server!",
  });
});

app.use("/api", routes);

// not found route handler
app.use((err, req, res, next) => {
  res.status(404).json({
    message: "Not Foundr",
  });
});

// Error handling middleware
app.use((res, req, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
