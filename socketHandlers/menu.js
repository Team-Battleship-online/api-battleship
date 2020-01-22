const userConnect = (server, data) => {
  let currentlyConnected = Object.keys(server.io.sockets.sockets);

  server.users[data.username] = server.socket.id;
  server.socket.username = data.username;

  Object.keys(server.users).forEach(user => {
    if (!currentlyConnected.includes(server.users[user])) {
      delete server.users[user];
    }
  });

  server.io.emit("users", server.users);
  console.log(currentlyConnected);
};

const disconnect = server => {
  console.log("Hey I disconnected", server.socket.id);

  delete server.users[server.socket.username];

  server.io.emit("users", server.users);
};

module.exports = {
  userConnect,
  disconnect
};
