import { WebSocketServer } from "ws";

let wss; // Declare a WebSocketServer instance globally

const startWebSocketServer = (server) => {
    if (wss) {
        console.log("WebSocket server is already running.");
        return wss; // Return existing WebSocket server
    }

    wss = new WebSocketServer({ server });

    wss.on("connection", function connection(ws) {
        console.log("New WebSocket connection established.");

        ws.on("message", function incoming(message) {
            console.log("Received: %s", message);
        });

        ws.send("Welcome to the WebSocket server!");
    });

    console.log("WebSocket server initialized.");
    return wss;
}
export default startWebSocketServer