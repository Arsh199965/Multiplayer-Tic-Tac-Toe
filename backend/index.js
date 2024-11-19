import express from "express";
import cors from "cors";
import websocketMiddleware from "./wsHandlers/establishConnect.js";
const app = express();
const port = 3000;

app.use(cors());
app.get("/", (req, res) => {
  console.log("request came");
  res.send("Hello World!");
});

// start game, and connect the player to the server with webSocket

let server; // HTTP server instance
let wss; // WebSocket server instance

app.post("/start", (req, res) => {
  if (!server) {
    server = app.listen(port, () => {
      console.log(`HTTP server listening at http://localhost:${port}`);
    });
  }

  wss = startWebSocketServer(server);
  res.json({ message: "WebSocket server started!" });

});


server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
