const pokemonName = document.querySelector(".name-pokemon");
const pokemonId = document.querySelector(".number-pokemon");
const pokemonHeight = document.querySelector(".height-pokemon");
const pokemonWeight = document.querySelector(".weight-pokemon");
const pokemonImage = document.querySelector(".img-pokemon")
const pokemonType = document.querySelector(".type-pokemon");
const buttonPrev = document.querySelector("#btn-previous");
const buttonNext = document.querySelector("#btn-next");

const form = document.querySelector(".search");
const input = document.querySelector(".search-bar");

const displayPokemon = document.querySelector(".card-box");
const notDisplayPokemon = document.querySelector(".card-box-nfound");

const types = {
	fire: {color: "#f42", translate: "fogo"},
	grass: {color: "#7c5", translate: "planta"},
	electric: {color: "#fc3", translate: "elétrico"},
	water: {color: "#39f", translate: "água"},
	ground: {color: "#db5", translate: "terra"},
	rock: {color: "#ba6", translate: "pedra"},
	fairy: {color: "#e9e", translate: "fada"},
	poison: {color: "#a59", translate: "veneno"},
	bug: {color: "#ab2", translate: "inseto"},
	dragon: {color: "#76e", translate: "dragão"},
	psychic: {color: "#f59", translate: "psíquico"},
	flying: {color: "#89f", translate: "voador"},
	fighting: {color: "#b54", translate: "lutador"},
	normal: {color: "#aa9", translate: "normal"},
    ghost: {color: "#66b", translate: "fantasma"},
    steel: {color: "#aab", translate: "metal"},
    ice: {color: "#6cf", translate: "gelo"},
    dark: {color: "#754", translate: "noturno"}
};

// Para buscar os dados da API

/**
 * Function to get the data from the API.
 * @param {string | number} pokemon  - Will search the API by the Pokemon's name or id.
 * @returns The data form the API.
 */
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    } 
}

/**
 * Function to render the Pokemon card, with its name, id, types, height, and weight.
 * @param {string | number} pokemon - Can render based on the pokemon's id or name
 */
const renderPokemon = async (pokemon) => {

    input.value = "";
    const data = await fetchPokemon(pokemon);

    displayPokemon.style.display = data ? "block" : "none";
    notDisplayPokemon.style.display = data ? "none" : "flex";

    if(data) {
        clearCard();
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = "nº " + data.id;
        pokemonHeight.innerHTML = data.height/10 + "m";
        pokemonWeight.innerHTML = data.weight/10 + "kg";

        const imgBackup = data.sprites.front_default;
        const animatedImg = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        pokemonImage.src = animatedImg || imgBackup;

        data.types.forEach(element => {
            var typeName = element.type.name;
            var translate = types[typeName]["translate"];
            var color =  types[typeName]["color"];

            pokemonType.innerHTML += 
            `<div class='one-type-pokemon' style="background-color:${color}">${translate}</div>`;
        });

        localStorage.setItem("pokemonId", data.id);
    }
}

/**
 * An event listener to wait for the user to search for a pokemon's name or id.
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

//Função para limpar o display
/**
 * Function to clear the data from the pokemon card.
 */
function clearCard () {
    pokemonName.innerHTML = "";
    pokemonId.innerHTML = "";
    pokemonHeight.innerHTML = "";
    pokemonWeight.innerHTML = "";
    pokemonImage.src = "";
    pokemonType.innerHTML = "";
}

/**
 * An event to open the page with an id set in the localStorage.
 */
window.onload = () => {
    renderPokemon(localStorage.getItem("pokemonId"));
}

/**
 * An event listener to wait for the user to click in the previous button, so it can storage the previous id number in the localStorage. Will acess the previous pokemon card based on this new number.
 */
buttonPrev.addEventListener("click", event => {
    event.preventDefault();
    const storageId = parseInt(localStorage.getItem("pokemonId"));
    if(storageId > 1) {
        renderPokemon(storageId - 1);
    } else {

    }
})

/**
 * An event listener to wait for the user to click in the next button, so it can storage the next id number in the localStorage. Will acess the next pokemon card based on this new number.
 */
buttonNext.addEventListener("click", event => {
    event.preventDefault();
    const storageId = parseInt(localStorage.getItem("pokemonId"));
    if(storageId < 906) {
        renderPokemon(storageId + 1);
    }
})
