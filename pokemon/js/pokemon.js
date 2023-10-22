const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let pokemones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDePokemones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotajugadorObjeto
let ataquesPokemon
let ataquesPokemonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Pokemon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarPokemon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )  
    }
}

let hipodoge = new Pokemon('Hipodoge', './assets/pokemones_pokemon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepo = new Pokemon('Capipepo', './assets/pokemones_pokemon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueya = new Pokemon('Ratigueya', './assets/pokemones_pokemon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Pokemon('Hipodoge', './assets/pokemones_pokemon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepoEnemigo = new Pokemon('Capipepo', './assets/pokemones_pokemon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueyaEnemigo = new Pokemon('Ratigueya', './assets/pokemones_pokemon_ratigueya_attack.png', 5, './assets/ratigueya.png')

 hipodoge.ataques.push(
 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)


capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

pokemones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display ='none'    

    pokemones.forEach((pokemon) => {
        opcionDePokemones = `
        <input type="radio" name="mascota" id=${pokemon.nombre} />
        <label class="tarjeta-de-pokemon" for=${pokemon.nombre}>
            <p>${pokemon.nombre}</p>
            <img src=${pokemon.foto} alt=${pokemon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDePokemones

     inputHipodoge = document.getElementById('Hipodoge')
     inputCapipepo = document.getElementById('Capipepo')
     inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
    .then(function (res) {
        if (res.ok) {
            res.text()
            .then(function (respuesta) {
                console.log(respuesta)
                jugadorId = respuesta
        })
    }
})
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascotas')
    }
    
    seleccionarPokemon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display ='flex'
   iniciarMapa()
   
}

function seleccionarPokemon(mascotaJugador) {
    fetch(`http://localhost:8080/pokemon/${jugadorId}`, {
        method: "post",
        headers: {
            "Contect-Type": "application/json"
        },
        body: JSON.stringify({
            pokemon: mascotaJugador
        })
       
    })

}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) {
            ataques = pokemones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesPokemon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPokemon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true   
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true  
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true  
            }
            ataqueAleatorioEnemigo()
        })
    })
    

}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesPokemonEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesPokemonEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesPokemonEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal


    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
   mascotajugadorObjeto.x =mascotajugadorObjeto.x +mascotajugadorObjeto.velocidadX
   mascotajugadorObjeto.y =mascotajugadorObjeto.y +mascotajugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
mascotajugadorObjeto.pintarPokemon()

enviarPosicion(mascotajugadorObjeto.x, mascotajugadorObjeto.y)

hipodogeEnemigo.pintarPokemon()
capipepoEnemigo.pintarPokemon()
ratigueyaEnemigo.pintarPokemon()
if (mascotajugadorObjeto.velocidadX !==0 || mascotajugadorObjeto.velocidadY !==0) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
}
}

function enviarPosicion(x, y) {
      fetch(`http//localhost:8080/pokemon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "appication/json"
        },
        body:JSON.strinfity({
x,
y
        })
      })
}

function moverDerecha() {
    mascotajugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
   mascotajugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotajugadorObjeto.velocidadY = 5
}

function moverArriba() {
   mascotajugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
mascotajugadorObjeto.velocidadX = 0
mascotajugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
    case 'ArrowUp':
            moverArriba()
            break
    case 'ArrowDown':
        moverAbajo()
            break
    case 'ArrowLeft':
                moverIzquierda()
            break
    case 'ArrowRight':
        moverDerecha()
        break
        default:
            break
    }
}

function iniciarMapa() {
  
    mascotajugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotajugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) {
           return pokemones[i]
        }
        
    }
}

function  revisarColision(enemigo) {
    const arribaEnemigo=enemigo.y
    const abajoEnemigo =enemigo.y + enemigo.alto
    const derechaEnemigo =enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotajugadorObjeto.y
    const abajoMascota = mascotajugadorObjeto.y + mascotajugadorObjeto.alto
    const derechaMascota = mascotajugadorObjeto.x + mascotajugadorObjeto.ancho
    const izquierdaMascota = mascotajugadorObjeto.x

    if(
abajoMascota < arribaEnemigo ||
arribaMascota > abajoEnemigo ||
derechaMascota < izquierdaEnemigo ||
izquierdaMascota > derechaEnemigo 
     ) {
       return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
