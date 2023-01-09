// Variáveis
const pokemonName = document.querySelector(".name-pokemon");
const pokemonId = document.querySelector(".number-pokemon");
const pokemonHeight = document.querySelector(".height-pokemon");
const pokemonWeight = document.querySelector(".weight-pokemon");
const pokemonImage = document.querySelector(".img-pokemon")
const pokemonType = document.querySelector(".type-pokemon");

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
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    } 
}

// Para pegar os dados do pokemon pesquisado
const renderPokemon = async (pokemon) => {

    input.value = "";
    const data = await fetchPokemon(pokemon);

    displayPokemon.style.display = data ? "block" : "none";
    notDisplayPokemon.style.display = data ? "none" : "flex";

    if(data) {
        clearInput();
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

//Para pegar o input da barra de pesquisa
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

//Função para limpar o display
function clearInput () {
    pokemonName.innerHTML = "";
    pokemonId.innerHTML = "";
    pokemonHeight.innerHTML = "";
    pokemonWeight.innerHTML = "";
    pokemonImage.src = "";
    pokemonType.innerHTML = "";
}

//Função para abrir a aba card
function cardTab() {
    window.open("card.html")
}

//Função para fazer loading da página assim que abrir
window.onload = () => {
    renderPokemon(localStorage.getItem("pokemonId"));
}

const buttonPrev = document.querySelector("#btn-previous");
const buttonNext = document.querySelector("#btn-next");

buttonPrev.addEventListener("click", event => {
    event.preventDefault();
    const storageId = localStorage.getItem("pokemonId");
    const intStorageId = parseInt(storageId);
    if(intStorageId > 1) {
        renderPokemon(intStorageId - 1);
    } else {

    }
})

buttonNext.addEventListener("click", event => {
    event.preventDefault();
    const storageId = localStorage.getItem("pokemonId");
    const intStorageId = parseInt(storageId);
    if(intStorageId < 906) {
        renderPokemon(intStorageId + 1);
    }
})
