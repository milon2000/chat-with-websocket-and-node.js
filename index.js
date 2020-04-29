const WebSocket = require("ws");
const ws = new WebSocket.Server({ port: 8080 });
let users = [];

ws.on("connection", (webSocket) => {
  webSocket.on("message", (message) => {
    message = JSON.parse(message);

    if (message.type == "name") {
      webSocket.personName = message.data;
      users.push(webSocket.personName);
      return;
    }
    console.log(users);
    console.log("Received:", message);
    ws.clients.forEach((client) => {
      if (client != webSocket) {
        client.send(
          JSON.stringify({
            name: webSocket.personName,
            data: message.data,
            users: webSocket.users,
          })
        );
      }
    });
  });

  webSocket.users = users;
  console.log(users);
  webSocket.on("close", () => {
    users = users.filter((user) => {
      return user !== webSocket.personName;
    });
    console.log(users);
  });
});
