import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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

export const getRecentStories = async () => {
  try {
    const query = `
      SELECT title, url, time_published FROM stories
      ORDER BY time_published DESC
    `;
    const [rows] = await pool.execute(query);

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

export const getRecentCount = async () => {
  try {
    const storiesQuery = `
      SELECT title, url, time_published FROM stories 
      WHERE time_published > NOW() - INTERVAL 5 MINUTE
      ORDER BY time_published DESC
    `;
    const countQuery = `
      SELECT COUNT(*) AS count FROM stories 
      WHERE time_published > NOW() - INTERVAL 5 MINUTE
    `;

    // Execute both queries in parallel
    const [storiesRows, countRows] = await Promise.all([
      pool.execute(storiesQuery),
      pool.execute(countQuery),
    ]);

    // Extract data from rows
    const stories = storiesRows[0].map((story) => ({
      title: story.title,
      url: story.url,
      time_published: story.time_published,
    }));
    const count = countRows[0][0].count;

    // Return the desired response structure
    return { count, stories };
  } catch (error) {
    console.error("Error fetching recent stories and count:", error);
    throw error;
  }
};
