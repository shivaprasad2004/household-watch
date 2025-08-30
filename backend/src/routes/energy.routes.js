import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/realtime", authenticate, (req, res) => {
  res.json({
    voltage: 220,
    current: 2.3,
    power: 506,
    timestamp: new Date()
  });
});

export default router;
