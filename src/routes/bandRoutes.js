import express from "express";

import { getFestivalByBandId, getBands } from "../controllers/bandController.js";

const router = express.Router();

router.get("/:bandId/festivals", getFestivalByBandId);
router.get("/", getBands);

export default router;