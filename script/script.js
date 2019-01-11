// Fazer a request na API
let pokemonList
const url = 'https://orgnova.concore.io/pokemon';
fetch(url)
    .then(response => response.json()) // retorna uma promise
    .then(data => {
        pokemonList = data
        console.log(pokemonList)
    })
    .catch(err => {  // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
    });

const btn = document.querySelector('.btn')

    
//Evento de click
btn.addEventListener('click', function(event){
    event.preventDefault();

    const loading = document.querySelector('.loading')
    const nomeDoPokemonPesquisado = document.getElementById('input').value.toLowerCase() //convertido para minusculo
    console.log(findPokemonId(nomeDoPokemonPesquisado));

    let Id = findPokemonId(nomeDoPokemonPesquisado);

    loading.innerHTML =  `<img src="img/pikachu-gif.gif">
                            <h3 class="loading-title"> Peraíí, estamos buscando seu pokemon...</h3>`;

    if (Id){
        showPokemonInfo(Id)
    }else{
        alert("Pokemon não encontrado")
    }
   

})

//Função encontrar o pokemon - retorna o número correspondente ao pokemon digitado (se encontrar)
function findPokemonId(nomePesquisado){
    let pokemonEncontrado = false;
    let pokemonId = 0;
    for(pokemon of pokemonList){
        if(pokemon.id == nomePesquisado){ //pokemon.id = Nome do pokemon
            pokemonEncontrado = true;
            pokemonId = pokemon.pokedex_entry;
        } 
    }
    if (pokemonEncontrado){
        return pokemonId
    } else {
        return null
    }
}
//Função mostrar informações do pokemon - retorna as info do pokemon
function showPokemonInfo(id){

    const urlInfo = `https://orgnova.concore.io/pokemon/${id}`;


    fetch(urlInfo)
        .then(response => response.json()) // retorna uma promise
        .then(data => {

            
            const pokeInfo = document.querySelector(".pokeInfo")
            console.log(data)

            let abilities = ""

            for (ability of data.abilities) {
                abilities += `<p class="pokeAbility">${ability.effect}</p>`
            }
            pokeInfo.innerHTML = 

            `<div class="poke-title">  
                <h1 class="pokeName">${data.name} #${data.id}</h1>
                <img class="poke-img" src="${data.sprites.front_default}"/>
                <img class="poke-img" src="${data.sprites.back_default}"/>
            </div>
            ${abilities}`
        
             
        })
        .catch(err => {  // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        });

    }