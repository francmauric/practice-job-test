import { useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import classes from './Demo.module.css';
import axios from 'axios';

interface BuscadorProps {
    value: string;
    onValueChange: (newValue: string) => void;
    
  }

function Buscador({ value, onValueChange }: BuscadorProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  const getPokemonNames = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const pokemonNames = response.data.results.map((pokemon: { name: string }) => pokemon.name );
      setSuggestions(pokemonNames);
      console.log(pokemonNames)
    } catch (error) {
      console.error('Error en la llamada', error);
    }
  };



  useEffect(() => {
    getPokemonNames();
  }, []);


  return (
    <Autocomplete
      label="Encuentra tu Pokemon"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      data={suggestions}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      
      value={value}
      onChange={onValueChange}
      
    />
  );
}

export default Buscador;