require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('change', data => {
        io.emit('change', data);
    });
});