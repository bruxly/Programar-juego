
const express = require("express")

const cors = require("cors")//exporto libreria

const app = express()

app.use(express.static('public'))
app.use(cors())//no arroja errores de cors
app.use(express.json())//desabilita posibles errores,habilito capacidad de contenido json

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarNinja(mokepon){
        this.mokepon = mokepon
    }

    //el jugador guarda sus propias coordenadas
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Ninja {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {

    const id = `${Math.random()}`  
    
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => { 
    const jugadorId = req.params.jugadorId || "" 
    const nombre = req.body.mokepon || ""
    const mokepon = new Ninja(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
   
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarNinja(mokepon)
    }
   
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "" 
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)
   
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
    
    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => { 
    const jugadorId = req.params.jugadorId || "" 
    const ataques = req.body.ataques || []
    
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)
   
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
   
   
    res.end()
})

//recibo la peticion, se busca el jugador por medio de su id
//find busca si el jugador existe y se encarga de enviar los ataques

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "" 
    const jugador = jugadores.find((jugador) => jugador.id ===  jugadorId)

    res.send({
        ataques: jugador.ataques || []
    })

})


app.listen(8080, () => {
    console.log("Servidor funcionando")
})