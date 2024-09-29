import { useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import classes from './Search.module.css';
import { searchPokemonByName } from '../../src/services/pokemonService';

interface BuscadorProps {
    value: string;
    onValueChange: (newValue: string) => void;
    
  }

function Buscador({ value, onValueChange }: BuscadorProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

 useEffect(() => {
  const fetchNames = async () => {
    try {
      const names = await searchPokemonByName();
      setSuggestions(names)
    } catch (error) {
      console.error('Error fetching Pokemon names:', error);
    }
  };
  fetchNames();
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