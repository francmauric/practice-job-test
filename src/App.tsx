import { MantineProvider } from '@mantine/core';
import PokemonComponent from '../components/PokemonComponent';
import '@mantine/core/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderPoke from '../components/SliderPoke'


const App: React.FC = () => {

  return (
    <MantineProvider >

      <h1>proyecto pokemon</h1>
      <PokemonComponent />
      <SliderPoke />
    </MantineProvider>
  )
}

export default App
