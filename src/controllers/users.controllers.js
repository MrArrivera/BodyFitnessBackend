//Import connection to database
import {pool} from '../db.js'

//Get all users function
export const getUsers = async(req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
};

//Get a single user
export const getUser = async(req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({message: "User not found"});
    }

    res.json(rows[0]);
};

//Post a user
export const createUser = async(req, res) => {
    try {
        const data = req.body;
        const { rows } = await pool.query("INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *", [data.name, data.email]);

        return response.json(rows[0])
    } catch (error) {
        if (error.code === "23505"){
            return res.status(409).json({message: "User already exists"});
        }
        return res.status(500).json({message: "Internal server error"});
    }
    
};


//Delete a user
export const deleteUser = async(req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE * FROM users WHERE id = $1 RETURNING *', [id]);

    if (rowCount === 0) {
        return res.status(404).json({message: "User not found"});
    }

    return res.sendStatus(204);
};

//Put a user(edit)
export const updateUser = async(req, res) => {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query('UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *', [data.name, data.password, id])
    return res.json(rows[0]);
};