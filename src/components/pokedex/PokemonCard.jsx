import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemonUrl }) => {
    const [pokemon, setPokemon] = useState(null)
    const types = pokemon?.types.map((type) => type.type.name).join(" / " );

  useEffect(() => {
    axios
    .get(pokemonUrl)
    .then(({ data }) => setPokemon(data))
    .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.id}`} className="capitalize">
        <header>

        </header>
      <div>
        <img src={pokemon?.sprites.other["official-artwork"].front_default } alt="frontPokemon" />
      </div>
      <h3>{pokemon?.name} </h3>
      <span>{types}</span>
      <h5>Type</h5>
      <ul>
        {
            pokemon?.stats.slice(0, 4).map((stat) => (<li key={stat.stat.name} >
                <h6>{stat.stat.name} </h6>
                <span>{stat.base_stat} </span>
            </li>
             ) )
        }
      </ul>
    </Link>
  );
};
export default PokemonCard;
