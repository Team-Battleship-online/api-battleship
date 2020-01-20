const handleRequests = socket => {
  socket.on("user-connect", data => {
    console.log(data);
  });
};

module.exports = {
  handleRequests
};
