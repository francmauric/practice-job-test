import React, { useState } from 'react';
import { Button, Card, Image, Text, Loader, Group, Collapse } from '@mantine/core';
import { getPokemonDetailsforCard } from '../src/services/pokemonService';
import Buscador from './Buscador/Buscador'
import { useDisclosure } from '@mantine/hooks';

interface Pokemon {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    abilities: Ability[];
    stats: Stat[];
    moves: Move[];
}

interface Ability {
    ability: {
        name: string;
    };
}

interface Stat {
    stat: {
        name: string;
    };
    base_stat: number;
}

interface Move {
    move: {
        name: string;
    }
}

function PokemonComponent() {
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [opened, { toggle }] = useDisclosure(false);

    console.log(search)

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await getPokemonDetailsforCard(search);
            setPokemon(response.data);
            setSearch('')
            console.log(response.data)
        } catch (error) {
            setError('Pokemon not found');
            setPokemon(null);
        }

        setLoading(false)
    };



    return (

        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <h1>Pokemon API</h1>
            <form onSubmit={handleSearch}>
                <Buscador value={search} onValueChange={setSearch} />
                <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'gray', deg: 360 }}
                    type='submit'
                    radius="lg"
                    size='lg'
                    style={{ marginTop: '10px' }}>
                    Search
                </Button>

            </form>

            {loading && <Loader style={{ marginTop: '20px' }} />}

            {error && <Text style={{ marginTop: '20px', color: 'red' }}>{error}</Text>}

            {pokemon && (
                <Card shadow="sm" padding="lg" style={{ marginTop: '20px' }}>
                    <Card.Section>
                        <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </Card.Section>

                    <Text
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'gray', deg: 360 }}
                        size="xl"
                        fw={700}
                    >
                        Name: {pokemon.name}</Text>
                    <Group justify='center' mb={5}>
                        <Button variant="gradient"
                            gradient={{ from: 'gray', to: 'green', deg: 178 }} onClick={toggle}>Details</Button>
                    </Group>
                    <Collapse in={opened} transitionDuration={1000} transitionTimingFunction='linear'>
                        <Text>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</Text>
                        <Text>Abilities: {pokemon.abilities.map(a => a.ability.name).join(',')}</Text>
                        <Text>Base Stats: </Text>
                        <ul>
                            {pokemon.stats.map(stat => (
                                <li key={stat.stat.name}>
                                    {stat.stat.name}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                        <Text>Moves: </Text>
                        <ul>
                            {pokemon.moves.slice(0, 10).map((move, index) => (
                                <li key={index}>{move.move.name}</li>
                            ))}
                        </ul>
                    </Collapse>
                </Card>
            )}
        </div>
    )
}

export default PokemonComponent;