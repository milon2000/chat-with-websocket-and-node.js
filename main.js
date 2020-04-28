const ws = new WebSocket('ws://localhost:8080');
const form = document.querySelector('form');
/*const chat = document.getElementById('czat'); */


ws.onopen = e => {
    console.log('connected');
};

ws.onerror = (error) => {
    console.log('error: ', error);
};

ws.onmessage = (e) => {
    console.log(e);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
     var message = document.getElementById('message').value;
    ws.send(message);
    console.log(message);
});





