import { saveEnergyReading, getLatestReading } from "../models/energy.model.js";

export async function uploadReading(req, res) {
  try {
    const { voltage, current, power } = req.body;
    await saveEnergyReading(req.user.id, voltage, current, power);
    res.json({ message: "Reading saved" });
  } catch {
    res.status(500).json({ error: "Failed to save reading" });
  }
}

export async function getRealtime(req, res) {
  try {
    const data = await getLatestReading(req.user.id);
    res.json(data || { message: "No readings yet" });
  } catch {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
