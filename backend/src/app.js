import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", routes);

// health check
app.get("/", (req, res) => res.send("Household Watch API is running"));

export default app;
