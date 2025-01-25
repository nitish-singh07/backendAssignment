import express from "express";
import {
  getRecentStoriesController,
  getRecentCountController,
} from "../controllers/storyController.js";

const router = express.Router();

router.get("/api/recent-stories", getRecentStoriesController);

router.get("/api/recent-count", getRecentCountController);

export default router;
