import { useState } from 'react';
import { TextInput, Button, Card, Image, Text, Loader } from '@mantine/core';
import axios from 'axios';
import Buscador from './Buscador'

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
            {/* <TextInput 
                variant="filled"
                size="md"
                radius="lg"
                label="Input label"
                withAsterisk
                placeholder='Encuentra tu POKEMON'
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            /> */}
            <Buscador value = {search} onValueChange={setSearch}/>
            <Button onClick={handleSearch} style={{ marginTop: '10px'}}>
                Search
            </Button>
            
            {loading && <Loader style={{ marginTop: '20px' }} />}

            {error && <Text  style={{ marginTop: '20px', color:'red' }}>{error}</Text>}

            {pokemon && (
                <Card shadow="sm" padding="lg" style={{ marginTop: '20px' }}>
                    <Card.Section>
                        <Image src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    </Card.Section>
                    <Text>Name: {pokemon.name}</Text>
                    <Text>
                        Type: {pokemon.types.map((t) => t.type.name).join(', ')}
                    </Text>
                    
                </Card>
            )}
        </div>
    )
}

export default PokemonComponent;