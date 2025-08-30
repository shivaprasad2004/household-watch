import pool from "../config/db.js";

export async function createUser(email, passwordHash) {
  const [result] = import pool from "../config/db.js";

export async function createUser(email, passwordHash) {
  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, passwordHash]
  );
  return result.insertId;
}

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}
await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, passwordHash]
  );
  return result.insertId;
}

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}
