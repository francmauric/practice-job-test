import { useEffect, useState } from "react";
import { Select, NumberInput, Button, Grid } from '@mantine/core';
import { getPokemonTypes, filterPokemons, getPokemonDetails, getPokemonAbility } from '../../src/services/pokemonService';

interface Pokemon {
    name: string;
    url: string;
}

function PokemonFilter () {
    const [types, setTypes] = useState<{name: string }[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
   
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [minStat, setMinStat] = useState<number>(0);

    const [ability, setAbility] = useState<{name: string}[]>([]);
    const [selectedAbility, setSelectedAbility] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    /* console.log(pokemons) */

    useEffect(() => {
        async function fetchData() {
            const typesData = await getPokemonTypes();
           /*  console.log(typesData) */
            setTypes(typesData);

            const abilityData = await getPokemonAbility();
            /* console.log(abilityData) */
            setAbility(abilityData)

        }
        fetchData();
    }, []);

    const handleFilter = async () => {
        if(!selectedType && !selectedAbility ) {
            alert('selecciona al menos un tipo ');
            return;
        }

        setLoading(true);
        const filteredPokemons = await filterPokemons(selectedType ?? '', selectedAbility ?? '');
        /* console.log(filteredPokemons) */
        const filteredDetails = await Promise.all(filteredPokemons.map((p:any) => getPokemonDetails(p.url)));
       /*  console.log(filteredDetails) */
        
        const result = filteredDetails.filter((pokemon) => 
            pokemon.stats.some((stat: any) => stat.base_stat >= minStat )
        );
        

        setPokemons(result);
        setLoading(false);
    }

    return(
        <div>
            <Grid>
                <Grid.Col span={4} >
                    <Select 
                        label="Filtrar por tipo"
                        placeholder="Selecciona un tipo"
                        data={types.map((type) => ({ value: type.name, label: type.name}))}
                        value={selectedType}
                        onChange={setSelectedType}
                    />

                </Grid.Col>
                <Grid.Col span={4}>
                    <Select 
                        label="Filtrar por habilidad"
                        placeholder="Selecciona habilidad"
                        data={ability.map((ability) => ({value: ability.name, label:ability.name}))}
                        value={selectedAbility}
                        onChange={setSelectedAbility}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <NumberInput 
                        label="Estadistica minima"
                        placeholder="valor minimo"
                        value={minStat}
                        onChange={(value) => setMinStat(typeof value === 'number' ? value : 0)}
                    />
                </Grid.Col>
            </Grid>
            <Button onClick={handleFilter} style={{ marginTop: '20px'}}>
                {loading ? 'Filtrando...' : 'Aplicar Filtro'}
            </Button>

            <div style={{marginTop:'20px'}}>
                {loading && <p>Cargando Pokemon...</p> }
                {!loading && pokemons.length === 0 && <p>No se encontraron Pokemon con los filtros aplicados.</p> }
                {pokemons.map((pokemon) => (
                    <div key={pokemon.name}>
                        
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PokemonFilter;