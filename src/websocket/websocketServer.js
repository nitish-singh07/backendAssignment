import { WebSocketServer } from "ws";

import { getRecentStories, getRecentCount } from "../models/storyModel.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.WEBSOCKET_PORT;
let wss;

export const startWebSocketServer = (port) => {
  wss = new WebSocketServer({ port });

  wss.on("connection", async (ws) => {
    console.log("New client connected");

    const recentCount = await getRecentCount();
    ws.send(JSON.stringify({ type: "initial-count", data: recentCount }));

    setInterval(async () => {
      const recentStories = await getRecentCount();
      ws.send(JSON.stringify({ type: "recent-stories", data: recentStories }));
    }, 60000 * 5);
  });

  console.log(`WebSocket server started on ws://localhost:${port}`);
};
