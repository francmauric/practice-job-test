import Slider from 'react-slick';
import { Card, Image, Text, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import './PokeSlider.css'
import { getPokemons } from '../../src/services/pokemonService';


interface Pokemon {
    name: string;
    sprites: { front_default:string};
}


function SliderPoke () {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const pokemonData = await getPokemons();
                setPokemons(pokemonData)
            } catch (error) {
                setError('Error llamada data');
            }

            setLoading(false);
        }
        fetchData();
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
                <div key={pokemon.name} className='slider-card'>
                <Card  shadow='lg' radius="md" padding='lg' className='pokemon-card'>
                    <Card.Section>
                        <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </Card.Section>
                    <Text ta="center" size='lg' fw="500">{pokemon.name}</Text>
                </Card>
                </div>
            ))}
            {loading && <Loader style={{ marginTop: '20px' }} />}

            {error && <Text  style={{ marginTop: '20px', color:'red' }}>{error}</Text>}
        </Slider >
    )
}

export default SliderPoke;