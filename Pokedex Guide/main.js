//Pokemon türlerine ilişkin arkaplan renklerini tutn nesne
/**
 * Elbette! İşte verilen renklerin açıklamaları:

- "grass" (Çimen): "#8BD369" - Bu renk, Pokemon türleri arasında çimen tipini temsil eder. Canlı, parlak yeşil tonuyla ilişkilendirilir.
- "fire" (Ateş): "#FF603F" - Bu renk, ateş tipini temsil eder. Sıcak ve ateşli bir kırmızı renktir.
- "water" (Su): "#3399FF" - Bu renk, su tipini temsil eder. Ferahlatıcı, mavi bir renktir.
- "bug" (Böcek): "#AABB22" - Bu renk, böcek tipini temsil eder. Canlı, sarımsı bir yeşildir.
- "normal" (Normal): "#AAAA99" - Bu renk, normal tipini temsil eder. Nötr ve sakin bir grimsi tonu vardır.
- "flying" (Uçan): "#9AA8FA" - Bu renk, uçan tipini temsil eder. Açık, gökyüzü mavisi bir renktir.
- "poison" (Zehir): "#B76EA4" - Bu renk, zehir tipini temsil eder. Pembeden mora doğru değişen bir renktir.
- "electric" (Elektrik): "#FFD34E" - Bu renk, elektrik tipini temsil eder. Parlak, sarı bir renktir.
- "ground" (Toprak): "#E2C56A" - Bu renk, toprak tipini temsil eder. Sarımtırak bir kahverengidir.
- "fairy" (Peri): "#F1A8EC" - Bu renk, peri tipini temsil eder. Pembe ve mor tonları içeren bir renktir.
- "psychic" (Psişik): "#FF6EA4" - Bu renk, psişik tipini temsil eder. Parlak pembe bir renktir.
- "fighting" (Dövüş): "#C56E5C" - Bu renk, dövüş tipini temsil eder. Kırmızımsı kahverengi bir renktir.
- "rock" (Kaya): "#C5B679" - Bu renk, kaya tipini temsil eder. Bej ve kahverengi tonlarından oluşan bir renktir.
- "dragon" (Ejderha): "#7766EE" - Bu renk, ejderha tipini temsil eder. Mor ve mavi tonları içeren bir renktir.
-
 * 
 * 
 * 
 */
//
const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
const pokemonCount = 151;
//

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};
//
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});
//

//inputta isme göre arama:
searchInput.addEventListener("input", (e) => {
  //console.log(searchInput.value)
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");
  //console.log(pokeName)

  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = "block";

    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
});
//

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  //
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  //console.log(pokemonId)
  const pokemonType = pokemon.types[0].type.name;
  //console.log(pokemonType)
  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;
  //

  const pokemonDivInnerHTML = `<div class="img-container">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
    alt="First Pokemon"
  />
</div>
<div class="poke-info">
  <span class="poke-id">#${pokemonId}</span>
  <h3 class="poke-name">${pokemon.name}</h3>
  <div class="small">
    <small class="poke-exp"
      ><i class="fa solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span></small
    >
    <small class="poke-weight"
      ><i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span></small
    >
  </div>
  <div class="poke-type">
  <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
  </div>
</div>`;

  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  pokeContainer.appendChild(pokemonDiv);
};
fetchPokemons();
