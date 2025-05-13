/* ----------------------------------------------------------------------- */
// VARIÁVEIS GLOBAIS
const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input-search");

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 25;

/* ----------------------------------------------------------------------- */
// FUNÇÕES

/* Função de busca do pokemon 
---------------------------------- */

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  // validando resposta
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

/* OBS para esta função:
- le-se: fetchPokemon vai buscar um pokemon como parametro e, depois, irá buscar suas informações;
- APIResponse recebe o metodo fetch com a api como uma promise (entre crase) e o parametro pokemon, mas o fetch é assincrono, então usamos o await declarando que a função é async;
le-se: quando o codigo chegar no fetch, ele vai esperar o que tá entre parenteses concluir, sem passar para a próxima linha antes de obter a resposta; isso significa que o código "pausa" enquanto n obtiver a resposta, voltando a ler o resto quando a "promise" for cumprida;
- depois, necessitamos extrair os dados JSON da resposta da api e retornar esses dados
- uma função ASYNC sempre retorna uma PROMISE */

/* Função para renderizar os dados na tela 
---------------------------------- */
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  //até este ponto, recuperamos os dados do pokemon, agora precisamos renderizar na tela. É agora que criamos a primeira variável global.

  //   validando se existe um data
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name; //name estabelecido na api
    pokemonNumber.innerHTML = data.id; //id estabelecido na api

    // depois de termos atribuído ao innerHTML os nomes e numeros dos pokemons, agora iremos atribuir as imagens. para isso, precisamos percorrer o caminho dentro da api acessando a propriedades não com o . , mas com [] pq o . vai dar um erro no caminho da api:
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    inputSearch.value = ''; // limpando input apos pesquisa

    searchPokemon = data.id; //atribuindo valor da id nova
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :(';
    pokemonNumber.innerHTML = '';
  }
};

// renderPokemon('3'); para testes de vsualização

/* OBS para essa função:
- ela quer dizer: função renderPokemon, estou te dando esse (pokemon) e quero que vc o renderize;
- uma função ASYNC sempre retorna uma PROMISE
 */

/* ----------------------------------------------------------------------- */
// EVENTOS

form.addEventListener('submit', (e) => {
  e.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

/* precisamos fazer com que o que for digitado no formulario seja lido e sua resposta retornada;
assim, fazemos com que o formulário receba um evento de submit e depois execute uma função: */

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    // le-se: clicou em next, funçao vai pegar a variavel searchPokemon(25) e incrementar + 1; depois, chamamos a função renderPokemon para renderizar esse novo valor;
});

console.log()

/* ----------------------------------------------------------------------- */
// INICIALIZAÇÃO
renderPokemon(searchPokemon); // iniciando a aplicação com a imagem do pikachu
