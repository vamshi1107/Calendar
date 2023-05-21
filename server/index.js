const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to ", socket.id);
  socket.on("data", (stream) => {
    io.emit("update", { data: stream.data });
  });

  socket.on("doc", (stream) => {
    io.emit("docupdate", { ...stream });
  });
});

app.get("/", (req, res) => {
  res.send("hi");
});

server.listen(1107, () => {
  console.log("Listening");
});
