import { json } from "node:stream/consumers";
import pool from "../config/db.js";

export async function getFestivals(req, res) {
    const favourites = JSON.parse(req.cookies.favourites || "[]");
    const [festivals] = await pool.query("SELECT f.*, GROUP_CONCAT(b.name SEPARATOR ', ') as bands  FROM festivals f LEFT JOIN lineups l ON l.festival_id = f.id LEFT JOIN bands b ON b.id = l.band_id GROUP BY f.id");
    //sort here
    res.status(200).json({ message: "Succesful query", data: sortedByFavouriteGenres });
}

export async function setLineup(req, res) {
    const { favourites } = req.body;
    res.cookie("favourites", JSON.stringify(favourites), { httpOnly: true, secure: false, sameSite: "strict" });
    res.status(200).json({ message: "Lineup set successfully" });
}