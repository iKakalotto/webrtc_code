const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const server = https.createServer({
    key: fs.readFileSync("./cert/private.key"),
    cert: fs.readFileSync("./cert/certificate.crt")
}, app);

const io = require("socket.io")(server);

app.get("/1", (req, resp) => {
    resp.sendFile(__dirname + "/1.html");
});

app.get("/2", (req, resp) => {
    resp.sendFile(__dirname + "/2.html");
});

io.on("connection", (socket) => {
    // 收到信令消息时广播给所有除自己外的客户端
    socket.on('signal', data => {
        socket.broadcast.emit("signal", data);
    });
});

server.listen(8443);
