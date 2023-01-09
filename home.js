var arrayObjects = [];
var pokemonCard = document.querySelector(".pokemons");

var form = document.querySelector(".search");
var input = document.querySelector(".search-bar");

var displayCard = pokemonCard;
var displayWelcome = document.querySelector(".welcome-container");
var displayNotFound = document.querySelector(".pokemon-nfound");

async function fetchPokemonById(id) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

    const response = await APIResponse.json();
    return response;
}

async function fetchAllPokemons() {
    var numberPokemons = 905;

    for (let index = 1; index <= numberPokemons; index++) {
        fetchPokemonById(index).then( (dataPromise) => {
            const pokemon = new Object();
            pokemon.name = dataPromise.name;
            pokemon.id = dataPromise.id;
            pokemon.img = dataPromise.sprites.front_default;
            arrayObjects.push(pokemon);
        })
    }
}

function renderPokemonHome() { 

    pokemonCard.innerHTML = "";

    var findAny = false;

    arrayObjects.forEach(element => {
        if(element.name.includes(input.value.toLowerCase()) && input.value.length > 1) {
            renderPokemonCard(element)
            findAny = true;
        }
    });

    displaysControl(findAny);
    
}

function displaysControl(findAny) {
    if(findAny) {
        displayCard.style.display = "flex";
        displayNotFound.style.display = "none";
        displayWelcome.style.display = "none";
    } else {
        displayCard.style.display = "none";
        if(input.value.length > 2) {
            displayNotFound.style.display = "flex";
            displayWelcome.style.display = "none";
        } else {
            displayWelcome.style.display = "flex";
            displayNotFound.style.display = "none";
        }
    } 
}

function renderPokemonCard(element) {
    pokemonCard.innerHTML += 
        `<div class='home-poke-card' onclick='clickPokemon(${element.id})'> 
            <div class='home-poke-card-id'> 
                    ${element.id} 
                </div> 
            <div class='home-poke-card-img'> 
                <img src='${element.img}'>
            </div>
            <div class='home-poke-card-data'>
                <div class='home-poke-card-name'> 
                    ${element.name} 
                </div>
                
            </div> 
            
        <div>`;
}

function clickPokemon(pokemonId){
    localStorage.setItem("pokemonId", pokemonId);
    window.open("card.html","_self");
}

window.onload = () => {
    fetchAllPokemons();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemonHome();
});

input.addEventListener("input", (event) => {
    renderPokemonHome();
 });



