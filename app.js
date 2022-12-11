const container = document.querySelector('.container');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

previous.addEventListener('click', () => {
    if(offset != 1){
        removeChildNodes(container);
        offset -= 9
        FetchPokemons(offset, limit);
    }
})

next.addEventListener('click', () => {
    removeChildNodes(container);
    offset += 9
    FetchPokemons(offset, limit);
})


const PokeFetch = async (id) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(pokemon => {
        CreatePokemon(pokemon);
    })
    .catch(error => console.log(error))
} 

const FetchPokemons = (offset, limit) => {
    for(let i = offset; i <= offset + limit; i++){
        PokeFetch(i);
    }
}

const CreatePokemon = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    const line = document.createElement('hr');

    const stats = document.createElement("div");
    stats.classList.add('stats-container')
        
    const hp = document.createElement('span');
    hp.textContent = `${pokemon.stats[0].stat.name}: ${pokemon.stats[0].base_stat} `;

    const attack = document.createElement('span');
    attack.textContent = ` ${pokemon.stats[1].stat.name}: ${pokemon.stats[1].base_stat}`;

    const defense = document.createElement('span');
    defense.textContent = `${pokemon.stats[2].stat.name}: ${pokemon.stats[2].base_stat} `;

    const speed = document.createElement('span');
    speed.textContent = ` ${pokemon.stats[5].stat.name}: ${pokemon.stats[5].base_stat}`;

    stats.appendChild(hp);
    stats.appendChild(attack);
    stats.appendChild(defense);
    stats.appendChild(speed);

    card.appendChild(number);
    card.appendChild(spriteContainer);
    card.appendChild(name);
    card.appendChild(line);
    card.appendChild(stats)

    container.appendChild(card);
}

const removeChildNodes = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
} 

FetchPokemons(offset, limit)