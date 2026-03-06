import pool from "../config/db.js";
import argon2 from "argon2";
import { generateToken } from "../utils/token.js";

export async function register(req, res) {
    const { username, password } = req.body;
    
    const [exists] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (exists.length > 0) {
        return res.status(400).json({ message: "User already exists" }); 
    }

    const hashedPassword = await argon2.hash(password);
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
}

export async function login(req, res) {
    const { username, password } = req.body;
    
    const [exists] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (exists.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = exists[0];
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
    res.status(200).json({ message: "Login successful" });
}

export function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}