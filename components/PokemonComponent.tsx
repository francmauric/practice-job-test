import { useState } from 'react';
import axios from 'axios';

interface Pokemon {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
}



function PokemonComponent() {
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    console.log(search)

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
            setPokemon(response.data);
            console.log(response.data)
        } catch (error) {
            setError('Pokemon not found');
            setPokemon(null);
        } 

        setLoading(false)
    };



    return (

        <div style={{ maxWidth: 400, margin: '0 auto'}}>
            <h1>pokemon api</h1>
            <input 
                placeholder='Encuentra tu POKEMON'
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <button onClick={handleSearch} style={{ marginTop: '10px'}}>
                Search
            </button>
            
            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {pokemon && (
                <div>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
                </div>
            )}
        </div>
    )
}

export default PokemonComponent;