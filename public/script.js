const socket = io();

const titulo = document.getElementById('titulo');
const circulo = document.getElementById('circulo');
const textoTurno = document.getElementById('textoTurno');

// Para usuario
const botonEnviar = document.getElementById('botonEnviar');
const inputUsuario = document.getElementById('inputUsuario');
const nombreJugador = document.getElementById('nombreJugador');


botonEnviar.addEventListener('click', function clicks(){
   jugadorLocal.nombre = inputUsuario.value;
   inputUsuario.value = "";
   jugadores.push(jugadorLocal);
   socket.emit('recibirUsuario', JSON.stringify(jugadorLocal));
   circulo.style.display = "block";
   textoTurno.style.display = "block";

   if(jugadorLocal.nombre == jugadores[0].nombre)
   {
        textoTurno.innerText = `Es tu turno ${jugadorLocal.nombre}`;
   }
   else
   {
       textoTurno.innerText = `Espera a que juegue ${jugadorOnline.nombre}`;
       circulo.style.pointerEvents = "none";
   }
   nombreJugador.style.display = "none";
   
   botonEnviar.removeEventListener('click', clicks);
})
// si [0] entonces jugador 1, si [1] entonces jugador 2

let jugadores = [];

let jugadorLocal = {
    nombre: ""
};
let jugadorOnline = {
    nombre: ""
};

// Recibe usuario
socket.on('enviarUsuarios', msg => {
    //console.log(msg);
    jugadorOnline = JSON.parse(msg);
    jugadores.push(jugadorOnline);
})

let turno = true;

circulo.addEventListener('click', function cambioColor(){
    if(turno){
        circulo.style.backgroundColor = "red";
        turno = false;
    }else{
        circulo.style.backgroundColor = "blue";
        turno = true;
    }
    socket.emit('clickCirculo', "true")
    textoTurno.innerText = `Espera a que juegue ${jugadorOnline.nombre}`;
    circulo.style.pointerEvents = "none";
})

socket.on('datoTurno', msg => {
    if(turno){
        circulo.style.backgroundColor = "red";
        turno = false;
    }else{
        circulo.style.backgroundColor = "blue";
        turno = true;
    }
    textoTurno.innerText = `Es tu turno ${jugadorLocal.nombre}`
    circulo.style.pointerEvents = "auto";
})
