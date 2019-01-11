  
// Fazer a request na API

const pokeInfo = document.querySelector(".pokeInfo")
pokeInfo.innerHTML='<h5> Loading...</h5>'

let pokemonList
const url = 'https://orgnova.concore.io/pokemon';
fetch(url)
    .then(response => response.json()) // retorna uma promise
    .then(data => {
        pokemonList = data
        pokeInfo.innerHTML=' '

    })
    .catch(err => {  // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
    });
    
  
 //Evento de click
    
    const btn = document.querySelector('.btn')

btn.addEventListener('click', function(event){
    event.preventDefault();
    let pokeName = document.getElementById('input').value.toLowerCase() //convertido para minusculo
 
    let Id = findPokemonId(pokeName);
    

    pokeInfo.innerHTML = 
    `<div class="loading">
        <img src="img/pikachu-gif.gif">
        <h3 class="loading-title"> Peraíí, estamos buscando seu pokemon...</h3>
    </div>`;
                        
    if (Id){
        showPokemonInfo(Id)
    }
    else {
        pokeInfo.innerHTML = `<div class="loading">
                                <img src="img/notfound.gif"> 
                                <h3>Iti, não achamos!</h3>
                            </div>`
    }    
})


//Função encontrar o pokemon - retorna o número correspondente ao pokemon digitado (se encontrar)
function findPokemonId(searchName){
    let pokemonId = 0;
    let pokeFound = false;

    for(pokemon of pokemonList){
        if(pokemon.id == searchName){ //pokemon.id = Nome do pokemon
            pokeFound = true;
            pokemonId = pokemon.pokedex_entry;
        } 
    
    }
    return pokemonId
}

  

//Função mostrar informações do pokemon - retorna as info do pokemon
function showPokemonInfo(id){

    const urlInfo = `https://orgnova.concore.io/pokemon/${id}`;

  
    fetch(urlInfo)
        .then(response => response.json()) // retorna uma promise
        .then(data => {

            let abilities = ""
            let type = ""

            for (ability of data.abilities) {
                abilities += `<p class="pokeAbility">${ability.effect}</p>`
            }

            for (type of data.types) {
                type += `<h1 class="pokeAbilityl">${type}</h1>`
            }

            pokeInfo.innerHTML = 

            `<div class="poke-title">  
                <h1 class="pokeName">${data.name} #${data.id} ${data.types}</h1>
                <img class="poke-img" src="${data.sprites.front_default}"/>
                <img class="poke-img" src="${data.sprites.back_default}"/>
            </div>
            ${abilities}
            `
        
             console.log(data)
        })
        .catch(err => {  // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        });
    

    }

 

