import dotenv from "dotenv";
import express from "express";
import storyRoutes from "./routes/storyRoutes.js";
import { scrapeHackerNews } from "./services/scraperService.js";
import { startWebSocketServer } from "./websocket/websocketServer.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(storyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8080;
startWebSocketServer(WEBSOCKET_PORT);

setInterval(async () => {
  console.log("Scraping Hacker News...");
  await scrapeHackerNews();
}, 60000);
