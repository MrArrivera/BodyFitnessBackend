import { pool } from "../db.js";

// Get all users
export const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.status(200).json(response.rows);
};

// Get a single user
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows);
};

// Post user
export const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *",
      [name, password]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Put user
export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, password } = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *",
    [name, password, id]
  );

  return res.json(rows[0]);
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM users where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};