import { Server } from "socket.io";

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5174"], // Allow your frontend origin
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Handle status change event
    socket.on("changeStatus", (data) => {
      console.log("Status changed:", data);
      io.emit("statusUpdated", data); // Broadcast the update
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export default initializeSocket;
