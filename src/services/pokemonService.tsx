import axios from 'axios'

interface Pokemon {
    name: string;
    sprites: { front_default: string};
}

const PokeApi = 'https://pokeapi.co/api/v2/pokemon';

//lista de pokemon

export async function getPokemons  (): Promise<Pokemon[]>  {

    try {
        const response = await axios.get(`${PokeApi}?limit=1000`);
        console.log(response.data)
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

//pokemon por nombre

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

//pokemon por detalles

export async function getPokemonDetails  (name: string)  {
    try{
        const response = await axios.get(`${PokeApi}/${name.toLowerCase()}`);
        return response;
    } catch (error) {
        console.error ('Error llamando detalles de Pokemon:', error);
        throw error;
    }
};

