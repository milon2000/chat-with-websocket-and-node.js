const ws = new WebSocket("ws://localhost:8080");
let name = prompt("Hello, what's your name?");
const chat = document.getElementById("chat");
const participants = document.getElementById("participants");
const form = document.querySelector("form");

ws.onopen = (e) => {
  console.log("connected");
  ws.send(
    JSON.stringify({
      type: "name",
      data: name,
    })
  );
};

ws.onclose = () => {
  console.error("disconnected");
};

// to jest to, co otrzymuje
ws.onmessage = (e) => {
  console.log("received", e.data);
  let json = JSON.parse(e.data);
  const li = document.createElement("li");
  li.classList.add("userName");
  let time = new Date();
  li.innerHTML +=
    json.name +
    " " +
    "<span>" +
    time.getHours() +
    ":" +
    time.getMinutes() +
    "</span>";
  chat.append(li);
  const li2 = document.createElement("li");
  li2.classList.add("userMsg");
  li2.innerHTML += json.data;
  chat.append(li2);
  console.log(json.users);
  const li3 = document.createElement("li");
  li3.classList.add("userName");
  li3.innerHTML += json.users;
  participants.append(li3);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = document.querySelector("#message").value;
  //ws.send(message);
  ws.send(
    JSON.stringify({
      type: "message",
      data: message,
    })
  );
  const li = document.createElement("li");
  li.classList.add("userName");
  let time = new Date();
  li.innerHTML +=
    "You " + "<span>" + time.getHours() + ":" + time.getMinutes() + "</span>";
  chat.append(li);
  const li2 = document.createElement("li");
  li2.classList.add("userMsg");
  li2.innerHTML += message;
  chat.append(li2);
  document.querySelector("#message").value = "";
});
