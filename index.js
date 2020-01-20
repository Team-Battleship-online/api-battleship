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
  socket.on("user-connect", data => {
    let currentlyConnected = Object.keys(io.sockets.sockets);
    users[data.username] = data.socketId;

    Object.keys(users).forEach(user => {
      if (!currentlyConnected.includes(users[user])) {
        delete users[user];
      }
    });

    console.log(users);
  });

  setInterval(() => {
    socket.emit("users", users);
  }, 50);

  socket.on("user-gone", username => {
    delete users[username];
  });

  // console.log(currentlyConnected);
});
