import { MantineProvider } from '@mantine/core';
import PokemonComponent from '../components/PokemonComponent';
import '@mantine/core/styles.css';
import PokemonFilter from '../components/FiltroPoke/PokemonFilter'

import SliderPoke from '../components/SliderPoke/SliderPoke'

const App: React.FC = () => {

  return (
    <MantineProvider >

      <h1>proyecto pokemon</h1>
      <PokemonComponent />
      {/* <SliderPoke /> */}
      <PokemonFilter />
    </MantineProvider>
  )
}

export default App
