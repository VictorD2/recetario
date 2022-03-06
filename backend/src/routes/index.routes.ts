import { Router } from "express";
import { indexRoute } from "../controllers/index.controllers";

const router = Router();

router.get("/*", indexRoute);

export default router;
