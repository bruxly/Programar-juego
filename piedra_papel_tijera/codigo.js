function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)+ min)
}

function eleccion(jugada){
    let resultado = ""
    if(jugada==1){
    resultado = "piedra 🪨"
}

else if(jugada==2){
    resultado = " papel  🧻"
}

else if(jugada==3){
    resultado = " tijera ✂️ "
}

else {
    resultado = "Null 😔"
}

return resultado
}

//1 es piedra, 2 es papel, 3 es tijera
let jugador=0
let computador=0
let triunfos=0
let computadora=0

while(triunfos<3 && computadora<3){
    computador =   aleatorio(1,3)
    jugada = prompt("Elije:1 para piedra🪨, 2  para  papel🧻, 3 para tijera✂️")
    //alert("Elejiste " + jugador)

    alert ("El computador eligio: " + eleccion(computador))
    alert ("Tu elegiste: " + eleccion(jugada))


    //combate
    if (computador== jugada ){
        alert("  EMPATE!⚖️ ")
    }

  
    else if(jugada==1 && computador==3 ||jugada==2 && computador==1 || jugada==3 && computador==2){
        alert(" GANASTE😺 " )
        triunfos+=1
    }

    else{
        alert("Perdiste😔 ")
        computadora+=1
    }

}
alert("Ganaste "+triunfos+ " partidas "+ " y computadora  ganos "+ computadora+" veces" )

