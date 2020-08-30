const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Un usuario se conecto');

    // Tema usuarios
    socket.on('recibirUsuario', (objeto) => {
        //console.log(objeto);
        socket.broadcast.emit('enviarUsuarios', objeto);
    })

    // Tema Circulo
    socket.on('clickCirculo', msg => {
        socket.broadcast.emit('datoTurno', 'true');
    })

    // Tema esperar usuario
    socket.broadcast.emit('usuarioConectado', 'Un usuario se conecto');


    socket.on('disconnect', () => {
        console.log("Un usuario se desconecto");
    })
})

http.listen(port, () => {
    console.log(`Server corriendo en puerto: ${port}`);
})
