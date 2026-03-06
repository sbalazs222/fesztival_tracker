import env from "./env.js";
import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
    host: env.dbConfig.host,
    user: env.dbConfig.username,
    password: env.dbConfig.password,
    database: env.dbConfig.database,
    connectionLimit: 10
});

export default pool;