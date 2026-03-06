import express from "express";
import { validateFieldCount, validateRequiredFields, validateInputIsArray } from "psgutil";

import { getFestivals, setLineup } from "../controllers/festivalController.js";
import { favourite } from "../middlewares/favourite.js";

const router = express.Router();

router.get("/", favourite, getFestivals);
router.post("/my-lineup", validateFieldCount(1), validateRequiredFields(["favourites"]), validateInputIsArray(["favourites"]), setLineup);
export default router;  