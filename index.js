require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
// const sockets = require("./sockets/index.js");

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

const io = require("socket.io")(server);

const users = {};

io.on("connection", socket => {
  let currentlyConnected = Object.keys(io.sockets.sockets);
  socket.on("user-connect", data => {
    users[data.username] = socket.id;

    Object.keys(users).forEach(user => {
      if (!currentlyConnected.includes(users[user])) {
        delete users[user];
      }
    });

    console.log(users);
    console.log(currentlyConnected);
  });

  console.log(currentlyConnected);

  socket.on("disconnect", reason => {
    console.log("Hey I disconnected", socket.id);

    Object.keys(users).forEach(user => {
      if (users[user] === socket.id) {
        delete users[user];
      }
    });
  });
});

setInterval(() => {
  io.emit("users", users);
}, 50);
