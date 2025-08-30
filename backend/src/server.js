import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import energyRoutes from "./routes/energy.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/energy", energyRoutes);
app.use("/auth", authRoutes);



// test route
app.get("/", (req, res) => {
  res.send("Backend is running fast 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
