import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './Demo.module.css';

interface BuscadorProps {
    value: string;
    onValueChange: (newValue: string) => void;
  }

function Buscador({ value, onValueChange }: BuscadorProps) {
 
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;



  return (
    <TextInput
      label="Floating label input"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.value)}
    />
  );
}

export default Buscador;