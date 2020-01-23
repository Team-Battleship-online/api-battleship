const menuHandlers = require("../socketHandlers/menu.js");

module.exports = server => {
  server.socket.on("user-connect", data =>
    menuHandlers.userConnect(server, data)
  );

  server.socket.on("disconnect", () => menuHandlers.disconnect(server));

  server.socket.on("send-game-invite", userName =>
    menuHandlers.sendGameInvite(server, userName)
  );
};
