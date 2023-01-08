var allPokemon = [];
const pokemonsDiv = document.querySelector(".pokemons");
const form = document.querySelector(".search");
const input = document.querySelector(".search-bar");

const fetchAllPokemons = async () => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`);

    if(APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

fetchAllPokemons().then((fetchPokemon) => {
    console.log(fetchPokemon);
    allPokemon = fetchPokemon.results;
})

const renderPokemonHome = () => {
    pokemonsDiv.innerHTML = "";

    allPokemon.forEach(element => {
        if(element.name.includes(input.value.toLowerCase()) && input.value.length > 1) {
            pokemonsDiv.innerHTML += "<div>" + element.name + "</div>";
        }
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemonHome();
});

input.addEventListener("input", (event) => {
   renderPokemonHome();
});