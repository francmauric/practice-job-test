import { MantineProvider } from '@mantine/core';
import PokemonComponent from '../components/PokemonComponent';
import '@mantine/core/styles.css';
const App: React.FC = () =>  {

  return (
    <MantineProvider >
     
      <h1>proyecto pokemon</h1>
      <PokemonComponent />
    </MantineProvider>
  )
}

export default App
