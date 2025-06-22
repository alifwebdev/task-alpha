import express from "express";
import authRoutes from "./auth.js";
import e from "express";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;
