import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Save a story to the database
export const saveStory = async (story) => {
  try {
    const query = `
      INSERT INTO stories (title, url, author, score, time_published)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      story.title,
      story.url,
      story.author,
      story.score,
      story.time_published,
    ]);
    return result;
  } catch (error) {
    console.error("Error saving story:", error);
    throw error;
  }
};

// Get recent stories (published within the last 5 minutes)
export const getRecentStories = async () => {
  try {
    const query = `
      SELECT title, url, time_published FROM stories
      ORDER BY time_published DESC
    `;
    const [rows] = await pool.execute(query);

    // Map the rows to include only the necessary fields
    const stories = rows.map((story) => ({
      title: story.title,
      url: story.url,
      time_published: story.time_published,
    }));

    return { stories };
  } catch (error) {
    console.error("Error fetching recent stories:", error);
    throw error;
  }
};

// Get the count of stories published in the last 5 minutes
export const getRecentCount = async () => {
  try {
    const query = `
      SELECT COUNT(*) AS count FROM stories 
      WHERE time_published > NOW() - INTERVAL 5 MINUTE
    `;
    const [rows] = await pool.execute(query);
    return rows[0].count;
  } catch (error) {
    console.error("Error fetching recent stories count:", error);
    throw error;
  }
};
