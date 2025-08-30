import pool from "../config/db.js";

export async function saveEnergyReading(userId, voltage, current, power) {
  await pool.query(
    "INSERT INTO energy_readings (user_id, voltage, current, power) VALUES (?, ?, ?, ?)",
    [userId, voltage, current, power]
  );
}

export async function getLatestReading(userId) {
  const [rows] = await pool.query(
    "SELECT * FROM energy_readings WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1",
    [userId]
  );
  return rows[0];
}
