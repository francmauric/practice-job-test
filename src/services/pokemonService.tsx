import axios from 'axios'

interface Pokemon {
    name: string;
    sprites: { front_default: string};
}

const PokeApi = 'https://pokeapi.co/api/v2/pokemon';
const PokeUrl = 'https://pokeapi.co/api/v2/'

//lista de pokemon para slider

export async function getPokemons  (): Promise<Pokemon[]>  {

    try {
        const response = await axios.get(`${PokeApi}?limit=100`);
       /*  console.log(response.data) */
        const pokemonData = await Promise.all(
            response.data.results.map(async (pokemon: { url:string }) => {
                const pokeResponse = await axios.get(pokemon.url);
                return pokeResponse.data;
            })
        );
        return pokemonData;
    } catch (error) {
        console.error('Error en llamada de data:', error);
        throw error;
    }
}

//pokemon por nombre para sugerencias

export async function searchPokemonByName ():Promise<string[]> {
    try {
        const response = await axios.get(`${PokeApi}?limit=1000`);
        const pokemonsNames = response.data.results.map((pokemon: { name: string }) => pokemon.name);
        return pokemonsNames;
    } catch (error) {
        console.error('Error en llamada por nombre:', error);
        throw error;
    }
};

//pokemon por detalles para la card principal desde el buscador

export async function getPokemonDetailsforCard  (name: string)  {
    try{
        const response = await axios.get(`${PokeApi}/${name.toLowerCase()}`);
        return response;
    } catch (error) {
        console.error ('Error llamando detalles de Pokemon:', error);
        throw error;
    }
};





//logica para filtrar pokemon por tipo y habilidad

//pokemon por tipo
export async function getPokemonTypes () {
    try{
        const response = await axios.get(`${PokeUrl}type`);
        /* console.log(response.data.results) */
        return response.data.results;
    } catch (error) {
        console.error('Error llamando tipos de pokemon', error);
        return[];
    }
}
//pokemon por Habilidad
export async function getPokemonAbility () {
    try{
        const response = await axios.get(`${PokeUrl}ability?limit=100`);
        /* console.log(response.data.results) */
        return response.data.results;
    } catch (error)  {
        console.error('Error llamado por habilidad', error);
        return[];
    }
};

// Filtrado por tipo o habilidad

export async function filterPokemons (type: string, ability: string) {
    try {
        let response;

        if (type){
            response = await axios.get(`${PokeUrl}type/${type}`);
            /* console.log('funciona filterpokemon service') */
           
            return response.data.pokemon.map((p:any) => p.pokemon);
        }
        if (ability){
            response = await axios.get(`${PokeUrl}ability/${ability}`);
            return response.data.pokemon.map((p:any) => p.pokemon)
        }

    } catch (error) {
        console.error('error filtrando pokemon', error);
        return[];
    }
}

//detalles de un pokemon por nombre
export async function  getPokemonDetails (url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokemon details', error);
        return null;
    }
}