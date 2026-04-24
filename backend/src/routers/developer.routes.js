import { Router } from "express";
import { getDeveloperMetrics, getDevelopers } from "../controllers/developer.controller.js";

const router = Router();

router.route("/get-developers").get(getDevelopers);
router.route("/get-dev-metrics/:dev_id").get(getDeveloperMetrics);

export { router as developerRouter };