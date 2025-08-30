import express from "express";
import authRoutes from "./auth.routes.js";
import energyRoutes from "./energy.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/energy", energyRoutes);

export default router;
