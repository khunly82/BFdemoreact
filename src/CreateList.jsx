import { useEffect, useState } from "react";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

const loadPokemons = async () => {
    const response = await fetch(baseUrl).then(r => r.json());    
    const promises = response.results.map(({url}) => fetch(url).then(r => r.json()));
    return Promise.all(promises);
}

function CreateList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        loadPokemons().then(setPokemons);
    }, [])

    return <ul className="listPokemons">
        { pokemons.map(p => <CreateLine key={p.id} {...p}></CreateLine>) }
    </ul>
}

const CreateLine = (pokemon) => {
    return <li className="pokemon">
        <img src={pokemon.sprites.front_default} />
        {pokemon.name}
    </li>
}

export default CreateList
