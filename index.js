require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const createConnections = require("./sockets/index.js");
// const sockets = require("./sockets/index.js");

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

createConnections(server);
