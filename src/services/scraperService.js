import axios from "axios";
import { saveStory } from "../models/storyModel.js";

export const fetchTopStoryIds = async () => {
  try {
    const { data } = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    return data; // List of story IDs
  } catch (error) {
    console.error("Error fetching top stories:", error);
    return [];
  }
};

export const fetchStoryDetails = async (id) => {
  try {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    return data;
  } catch (error) {
    console.error("Error fetching story details:", error);
    return null;
  }
};

// Scrape the top stories and save them to the database
export const scrapeHackerNews = async () => {
  const storyIds = await fetchTopStoryIds();

  for (const id of storyIds.slice(0, 20)) {
    // Limit to the top 20 stories
    const story = await fetchStoryDetails(id);

    if (story && story.title && story.url) {
      const newStory = {
        title: story.title,
        url: story.url,
        author: story.by,
        score: story.score,
        time_published: new Date(story.time * 1000), // Convert Unix timestamp to Date
      };

      await saveStory(newStory);
    }
  }
};
