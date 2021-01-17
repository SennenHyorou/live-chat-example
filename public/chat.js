// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function () {
    console.log(message.value);
    console.log(handle.value),
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
    message.value = "";
});

message.addEventListener('keypress', function () {
        socket.emit('typing',
            handle.value,
        );
});

//Emit Events
message.addEventListener('keyup', function() {
    if (message.value.length === 0) {
        socket.emit('cancel-typing');
        console.log('cancel-typing', message.value.length);
    } else {
        socket.emit('typing', handle.value);
        console.log('typing', message.value.length);
    }
});


// Listen for events
socket.on('chat', function (data) {
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
});

socket.on('typing', function (data) {
    console.log(data),
        feedback.innerHTML = data ? '<p><em>' + data + ' </em> is typing ..</p>' : ''
});

socket.on('cancel-typing', function (data){
    feedback.innerHTML = "";
})