//const { json } = require("express")

const sectionReiniciar = document.getElementById('reiniciar')
const sectionSelecionarAtaque = document.getElementById('seleccionar-ataque')

sectionReiniciar.style.display= "none"//oculto el boton de reiniciar
const botonNinjaJugador = document.getElementById('boton-ninja')

const botonReiniciar = document.getElementById('boton-reiniciar')


const sectionSeleccionarNinja = document.getElementById('seleccionar-ninja')

const spanNinjaJugador = document.getElementById('ninja-jugador')//se cambia el nombre del ninja dinamicamente 

const spanNinjaEnemigo = document.getElementById('ninja-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes= document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-Del-Jugador')
const ataquesDelEnemigo= document.getElementById('ataques-Del-enemigo')
const contenedorTarjetas= document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let ninjas = []
let jugadorId = null
let enemigoId = null
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeNinjas
let ninjasEnemigos = []
let inputOskar 
let inputMajo 
let inputCristal 
let ninjaJugador
let ninjaJugadorObjeto
let ataquesNinja
let botonBalon 
let botonTierra 
let botonMiraculous
let botones =[]
let ataquesNinjaEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './imagenes/mapaNinja.webp'
let alturaQueBusco
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 320

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}


alturaQueBusco = anchoDelMapa * 400 / 1300

mapa.width = anchoDelMapa
mapa.height = alturaQueBusco

class Ninja {
    constructor(nombre, foto,  vida, fotoMapa, id = 0) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 30 //tamano de foto ninja de la caracanva
        this.alto = 30  //tamano de foto ninja de la caracanva
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadx = 0
        this.velocidady = 0
    }

    pintarNinja() {
        lienzo.drawImage(
           this.mapaFoto,
           this.x,
           this.y,
           this.ancho,
           this.alto
         )
    }
}

let oskar = new Ninja ('Oskar', './imagenes/OskarCanvas.jpg', 5, './imagenes/Oskar.jpeg' )

let majo = new Ninja ('Majo', './imagenes/majo-canvas.png', 5, './imagenes/majo-canvas.png')

let cristal = new Ninja ('Cristal', './imagenes/CristalCanvas.jpeg', 5, './imagenes/CristalCanvas.jpeg')



const OSKAR_ATAQUES = [
    { nombre: '⚽', id: 'boton-balon'},
    { nombre: '⚽', id: 'boton-balon'},
    { nombre: '⚽', id: 'boton-balon'},
    { nombre: '🪀', id: 'boton-miraculous'},
    { nombre: '🌱', id: 'boton-tierra'},
]

oskar.ataques.push(...OSKAR_ATAQUES)   

const MAJO_ATAQUES = [
    { nombre: '🪀', id: 'boton-miraculous'},
    { nombre: '🪀', id: 'boton-miraculous'},
    { nombre: '🪀', id: 'boton-miraculous'},
    { nombre: '⚽', id: 'boton-balon'},
    { nombre: '🌱', id: 'boton-tierra'},
]

majo.ataques.push(...MAJO_ATAQUES)

const CRISTAL_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '⚽', id: 'boton-balon'},
    { nombre: '🪀', id: 'boton-miraculous'},
]
   
cristal.ataques.push(...CRISTAL_ATAQUES)

ninjas.push(oskar,majo,cristal)

function iniciarJuego() {

    sectionSelecionarAtaque.style.display = 'none'//oculto la seccion de ataque en html
    sectionVerMapa.style.display =  'none'

    ninjas.forEach((ninja) => {
        opcionDeNinjas = `
        <input  type="radio" name="ninja" id=${ninja.nombre} >
        <label class="tarjeta-de-ninja" for=${ninja.nombre} >
            <p>${ninja.nombre}</p>
            <img src=${ninja.foto} alt=${ninja.nombre}>
        </label>`
        contenedorTarjetas.innerHTML += opcionDeNinjas

        inputOskar = document.getElementById('Oskar')
        inputMajo = document.getElementById('Majo')
        inputCristal = document.getElementById('Cristal')
    })

    botonNinjaJugador.addEventListener('click', seleccionarNinjaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
    
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.134.100:8080/unirse")
          
    .then((res) => {
       
        if (res.ok) {
            res.text()
                .then((respuesta) => {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }

    })
}

function seleccionarNinjaJugador() {
 
    //condicionales para mostrar que ninja se elejio para la batalla
    
    if (inputOskar.checked){
        spanNinjaJugador.innerHTML = inputOskar.id
        ninjaJugador = inputOskar.id
    }
    else if (inputMajo.checked){
        spanNinjaJugador.innerHTML = inputMajo.id
        ninjaJugador = inputMajo.id
    }
    else if(inputCristal.checked) {
        spanNinjaJugador.innerHTML = inputCristal.id
        ninjaJugador = inputCristal.id
    }
    else {
        alert('Elije un ninja por favor')
        return//si la persona no elije un ninja el programa no sigue su funcion
    }

    sectionSeleccionarNinja.style.display = 'none'//oculta la seccion de elejir ninjas

    //sectionVerMapa.style.display ='flex'
    seleccionarNinja(ninjaJugador)
   
    extraerAtaques(ninjaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function seleccionarNinja(ninjaJugador) {
    fetch(`http://192.168.134.100:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: ninjaJugador
        })
    })//peticion tipo post
}

function extraerAtaques(ninjaJugador) {
    let ataques
    for(let i = 0; i< ninjas.length; i++) {
        if(ninjaJugador===ninjas[i].nombre) {
            ataques = ninjas[i].ataques
        }
    }
    mostrarAtaques(ataques)
   
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesNinja=`
        <button id=${ataque.id} class="boton-ataque BATataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesNinja
    })

    botonBalon = document.getElementById('boton-balon')
    botonTierra = document.getElementById('boton-tierra')
    botonMiraculous = document.getElementById('boton-miraculous')
    botones = document.querySelectorAll('.BATataque') 

}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) =>{
          if(e.target.innerText == '⚽'){
                ataqueJugador.push('BALON')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            }
            else if(e.target.innerText == '🪀'){
                ataqueJugador.push('MIRACULOUS')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            }
            else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            }

            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
           
        })
    })
   
}

function enviarAtaques(){
    fetch(`http://192.168.134.100/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)//cada 50 milesegundos comprueba los ataques

}

function obtenerAtaques() {
    fetch(`http://192.168.134.100/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json() 
            .then(function ({ ataques }) {
                if (ataques.length == 5) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })

}


function seleccionarNinjaEnemigo(enemigo) {
    spanNinjaEnemigo.innerHTML = enemigo.nombre
    ataquesNinjaEnemigo = enemigo.ataques
    secuenciaAtaque()
}

//la maquina escoje de forma aleatoria el ataque del enemigo
// y se guarda en variables globales
//  function  ataqueAleatorioEnemigo() {
//     let ataqueAleatorio = aleatorio(0, ataquesNinjaEnemigo.length -1)

//     if(ataqueAleatorio==0 || ataqueAleatorio==1){
//         ataqueEnemigo.push('BALON')
//     }
//      else if(ataqueAleatorio==2 || ataqueAleatorio==4){
//         ataqueEnemigo.push('MIRACULOUS')
//      }
//      else{
//         ataqueEnemigo.push('TIERRA')
//      }

//      console.log(ataqueEnemigo)
//     iniciarCombate()
//  }

// function iniciarCombate(){
//     if(ataqueJugador.length==5){
       
//          combate()
//     }
//  }

function indexDosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){ 
    clearInterval(intervalo)
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexDosOponentes(index, index)
            crearMensaje("Empate")
           
        }
        else if(ataqueJugador[index] === 'BALON' && ataqueEnemigo[index] === 'TIERRA'){
            indexDosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if(ataqueJugador[index] === 'MIRACULOUS' && ataqueEnemigo[index] === 'BALON'){
            indexDosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'MIRACULOUS'){
            indexDosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else{
            indexDosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}
//cuando las vidas llegan a cero se acaba el juego
//y se anuncia al ganador y perdedor
function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("El combate termino en empate")
    }
    else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('FELICIDADES GANASTE!, GAME OVER')
    }
    else{
        crearMensajeFinal('Lo siento perdiste!, game over')
    }
}

function crearMensaje(resultado) {
   
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
   
    //muestra por pantalla el mensaje de ataque
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal
    
    sectionReiniciar.style.display = 'block'//aparece el boton reiniciar

}

function reiniciarJuego(){
    location.reload()//se carga nuevamente la pagina con el boton reiniciar
}


function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){//pintarCanva

    ninjaJugadorObjeto.x  =  ninjaJugadorObjeto.x  +  ninjaJugadorObjeto.velocidadx
    ninjaJugadorObjeto.y  =  ninjaJugadorObjeto.y  +  ninjaJugadorObjeto.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    ninjaJugadorObjeto.pintarNinja()

    enviarPosicion(ninjaJugadorObjeto.x, 
    ninjaJugadorObjeto.
    y)

    ninjasEnemigos.forEach(function (mokepon) {
    if (mokepon != undefined) {
        mokepon.pintarNinja()
        revisarColiciones(mokepon)
    }
    })

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.56.100/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
            
        body: JSON.stringify({
            x,
            y
        })
    })

    .then(function (res) {
        if(res.ok){
            res.json()
            .then(function ({ enemigos }){
                console.log(enemigos)
                
                ninjasEnemigos = enemigos.map(function (enemigo) {
                    let ninjaEnemigo = null
                    if(enemigo.mokepon !== undefined){
                   
                    
                    const ninjaNombre = enemigo.mokepon.nombre || ""
                    if(ninjaNombre === "Oskar") {
                        ninjaEnemigo = new Ninja ('Oskar', './imagenes/Oskar.jpeg', 5, '/mokepon/js/imagenes/OskarCanvas.jpg', enemigo.id)

                    }
                    else if (ninjaNombre === "Majo") {
                        ninjaEnemigo = new Ninja ('Majo', './imagenes/Majo.jpeg', 5, '/mokepon/js/imagenes/majo-canvas.png', enemigo.id)///mokepon/js/imagenes/majo-canvas.png

                    }
                    else if (ninjaNombre ===  "Cristal"){
                        ninjaEnemigo = new Ninja ('Cristal', './imagenes/Cristal.jpeg', 5, '/mokepon/js/imagenes/Cristal.jpeg', enemigo.id)

                    }
                  
                    ninjaEnemigo.x = enemigo.x || 0
                    ninjaEnemigo.y = enemigo.y || 0

                   return ninjaEnemigo                  
                }
                })               
            })
        }
    })
}

function moverDerecha() {
    ninjaJugadorObjeto.velocidadx = 5
    
}

function moverIzquierda(){
    ninjaJugadorObjeto.velocidadx = - 5
    
}

function moverAbajo(){
    ninjaJugadorObjeto.velocidady =  5
    
}

function moverArriba(){
    ninjaJugadorObjeto.velocidady = - 5
}

function detenerMovimiento() {

    ninjaJugadorObjeto.velocidadx = 0
    ninjaJugadorObjeto.velocidady = 0
}

function sePrecionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowRight':
            moverDerecha()  
            break
        case 'ArrowDown':
            moverAbajo()
            break

        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowUp':
            moverArriba()
            break
        default:
            break
            
    }
}

function iniciarMapa() {
   
    ninjaJugadorObjeto = obtenerObjetoNinja(ninjaJugador)
    console.log(ninjaJugadorObjeto, ninjaJugador);
    intervalo = setInterval(pintarCanvas, 50)//pintarCanvas

    window.addEventListener('keydown', sePrecionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoNinja(){

    for (let i =0; i< ninjas.length; i++){
        if(ninjaJugador===ninjas[i].nombre){
           return ninjas[i]
        }
    }
}

function revisarColiciones(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaNinja = 
        ninjaJugadorObjeto.y
    const abajoNinja = 
        ninjaJugadorObjeto.y + ninjaJugadorObjeto.alto
    const derechaNinja =
        ninjaJugadorObjeto.x + ninjaJugadorObjeto.ancho
    const izquierdaNinja = 
        ninjaJugadorObjeto.x 

    if(
        abajoNinja < arribaEnemigo ||
        arribaNinja > abajoEnemigo ||
        derechaNinja < izquierdaEnemigo ||
        izquierdaNinja > derechaEnemigo

    ) {
        return
    }

    if(enemigo.x == undefined || enemigo.y == undefined){
         return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSelecionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarNinjaEnemigo (enemigo)
    
}

window.addEventListener('load', iniciarJuego)