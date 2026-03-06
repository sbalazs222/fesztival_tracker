import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { colorLog, errorLog } from "psgutil"

import authRoutes from "./src/routes/authRoutes.js";
import bandRoutes from "./src/routes/bandRoutes.js";
import festivalRoutes from "./src/routes/festivalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(colorLog)

app.use("/auth", authRoutes);
app.use("/bands", bandRoutes);
app.use("/festivals", festivalRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use(errorLog)