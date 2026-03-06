import pool from "../config/db.js";

export async function getFestivalByBandId(req, res) {
    const bandId = req.params.bandId;

    const [festivals] = await pool.query("SELECT f.name, f.location, f.date, l.stage_name FROM festivals f INNER JOIN lineups l on f.id = l.festival_id WHERE l.band_id = ?", [bandId]);
    
    res.status(200).json({ message: "Succesful query", data: festivals });
}

export async function getBands(req, res) {
    const [bands] = await pool.query("SELECT b.*, GROUP_CONCAT(f.name SEPARATOR ', ') as fesztivalok FROM bands b LEFT JOIN lineups l ON l.band_id = b.id LEFT JOIN festivals f ON f.id = l.festival_id GROUP BY b.id");
    res.status(200).json({ message: "Succesful query", data: bands });
}