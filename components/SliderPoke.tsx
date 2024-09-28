import Slider from 'react-slick';
import { Card, Image, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Pokemon {
    name: string;
    sprites: { front_default:string};
}


function SliderPoke () {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const callPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
                const results = await Promise.all(
                    response.data.results.map(async (pokemon: { url:string }) => {
                        const pokeData = await axios.get(pokemon.url);
                        return pokeData.data;
                    })
                );
                setPokemons(results);
            } catch (error) {
                console.error('Error en llamada de datos:', error);
            }
        };
        callPokemons();
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        rtl: true,
    };
 
    return(
        <Slider {...settings}>
            {pokemons.map((pokemon) => (
                <Card key={pokemon.name} shadow='sm' padding='lg'>
                    <Card.Section>
                        <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </Card.Section>
                    <Text>{pokemon.name}</Text>
                </Card>
            ))}
        </Slider >
    )
}

export default SliderPoke;