var arrayObjects = [];
var pokemonCard = document.querySelector(".pokemons");
var form = document.querySelector(".search");
var input = document.querySelector(".search-bar");

async function fetchPokemonById(id) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

    const response = await APIResponse.json();
    return response;
}

async function fetchAllPokemons() {
    var numberPokemons = 152;

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

    arrayObjects.forEach(element => {
        if(element.name.includes(input.value.toLowerCase()) && input.value.length > 1) {
            renderPokemonCard(element)
        }
    });
}

function renderPokemonCard(element) {
    pokemonCard.innerHTML += 
        `<div class='home-poke-card'> 
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



