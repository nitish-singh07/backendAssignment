import { getRecentStories, getRecentCount } from "../models/storyModel.js";

export const getRecentStoriesController = async (req, res) => {
  try {
    const stories = await getRecentStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent stories", error });
  }
};

export const getRecentCountController = async (req, res) => {
  try {
    const count = await getRecentCount();
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recent stories count", error });
  }
};
