import React, { useState } from 'react';
import {  Button, Card, Image, Text, Loader } from '@mantine/core';
import axios from 'axios';
import Buscador from './Buscador/Buscador'

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

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            <Buscador value = {search} onValueChange={setSearch}/>
            <h1>Pokemon API</h1>
            <form onSubmit={handleSearch}>
                <Buscador value = {search} onValueChange={setSearch}/>
                <Button 
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'gray', deg: 360 }}
                    type='submit' 
                    radius="lg"
                    size='lg'
                    style={{ marginTop: '10px'}}>
                    Search
                </Button>

            </form>
            
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