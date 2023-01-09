var arrayObjects = [];
const displayCard = document.querySelector(".pokemons");
const displayWelcome = document.querySelector(".welcome-container");
const displayNotFound = document.querySelector(".pokemon-nfound");

const form = document.querySelector(".search");
const input = document.querySelector(".search-bar");

/**
 * Function to get Pokemon data from API by id.
 * @param {number} id - Pokemon Id number.
 * @returns A json Object containing Pokemon data.
 */
const fetchPokemonById = async (id) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

    const response = await APIResponse.json();
    return response;
}

/**
 * Function to add Objects Pokemon in Array.
 */
const fetchAllPokemons = async () => {
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

/**
 * Function to filter Pokemons by name while the user is typing. Will also call the displayControl function.
 */
const filterPokemonByName = () => {
    displayCard.innerHTML = "";

    var findAny = false;

    arrayObjects.forEach(element => {
        if(element.name.includes(input.value.toLowerCase()) && input.value.length > 1) {
            renderPokemonCard(element)
            findAny = true;
        }
    });

    displaysControl(findAny);
}

/**
 * Will change the display from a welcome message, to a pokemon preview card or a Pokemon not found message.
 * @param {boolean} findAny - The param represents the results from the filter function.
 */
const displaysControl = (findAny) => {
    if(findAny) {
        displayCard.style.display = "flex";
        displayNotFound.style.display = "none";
        displayWelcome.style.display = "none";
    } else {
        displayCard.style.display = "none";
        if(input.value.length > 1) {
            displayNotFound.style.display = "flex";
            displayWelcome.style.display = "none";
        } else {
            displayWelcome.style.display = "block";
            displayNotFound.style.display = "none";
        }
    } 
}

/**
 * Function to render a preview card from the searched Pokemon.
 * @param {string} element - A pokemon in the ArrayObjects. 
 */
const renderPokemonCard = (element) => {
    displayCard.innerHTML += 
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

/**
 * Function to storage the id from the clicked card preview. Will also open the card page based on this number and its id pokemon correspondent.
 * @param {number} pokemonId -  A number that will be used to get the pokemon id.
 */
const clickPokemon = (pokemonId) => {
    localStorage.setItem("pokemonId", pokemonId);
    window.open("card.html","_self");
}

/**
 * An event to call the fetchAllPokemons function as soon as the page is loaded.
 */
window.onload = () => {
    fetchAllPokemons();
}

/**
 * An event listener to wait for the user to start typing. Will execute the filter function.
 */
input.addEventListener("input", (event) => {
    filterPokemonByName();
 });

