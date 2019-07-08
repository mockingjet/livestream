module.exports = function(server) {
  const io = require("socket.io")(server);
  // const SOCKET_STREAM = require('socket.io-stream');
  let connectedClients = [];
  io.on("connection", function(socket) {
    connectedClients.push(socket);

    //直播
    socket.on("live", data => {
      io.emit("watch", data);
    });

    //加入
    socket.on("join", data => {
      io.emit("join", {
        name:'System',
        text:"Let's welcome < "+data+" > join out room!"
      })
    })

    //聊天
    socket.on("chat", data => {
      io.emit("chat", data);
    });

    //離線
    socket.on("disconnect", function() {
      connectedClients.pop();
    });

    //連線人數
    setInterval(() => {
      socket.emit("people", connectedClients.length);
    }, 1000);
  });
};
