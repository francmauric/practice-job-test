import { MantineProvider } from '@mantine/core';
import PokemonComponent from '../components/PokemonComponent';
import '@mantine/core/styles.css';
import PokemonFilter from '../components/FiltroPoke/PokemonFilter'
import "./App.css"
import SliderPoke from '../components/SliderPoke/SliderPoke'

const App: React.FC = () => {

  return (
    <MantineProvider >

      
      <PokemonComponent />
      <SliderPoke />
      <PokemonFilter />
    </MantineProvider>
  )
}

export default App
