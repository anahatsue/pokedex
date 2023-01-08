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
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        data.types.forEach(element => {
            pokemonType.innerHTML += "<div class='one-type-pokemon'>" + element.type.name + "</div>";
        });
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
