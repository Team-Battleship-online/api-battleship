const socketHandler = require("./sockets.js");

const users = {};

const createConnections = server => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    const server = {
      io,
      socket,
      users
    };

    socketHandler(server);
  });
};

module.exports = createConnections;
