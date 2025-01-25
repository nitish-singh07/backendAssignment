import { getRecentStories, getRecentCount } from "../models/storyModel.js";

export const getRecentStoriesController = async (req, res) => {
  try {
    const stories = await getRecentStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent stories", error });
  }
};
// getRecentCountController

export const getRecentCountController = async (req, res) => {
  try {
    const { count, stories } = await getRecentCount();

    // Send the correct JSON response
    res.status(200).json({
      count,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recent stories and count",
      error,
    });
  }
};
