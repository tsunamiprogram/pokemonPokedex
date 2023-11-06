import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { bgByType, borderByType, colorTxtByType } from "../../constants/pokemon";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  const types = pokemon?.types.map((type) => type.type.name).join(" / ");
  const firstType = pokemon?.types[0].type.name;

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`capitalize border-8 rounded-lg ${borderByType[firstType]} text-center`}
    >
      <header className={`${bgByType[firstType]} h-[130px]`}> </header>
      <div className="relative pt-14">
        <div className="absolute w-full top-0 -translate-y-2/3">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt="frontPokemon"
            className="max-w-[180px] mx-auto"
          />
        </div>
        <h3 className={`text-xl font-semibold ${colorTxtByType[firstType] } `}>{pokemon?.name} </h3>
        <span className="text-sm font-semibold">{types}</span>
        <h5 className="font-semibold text-slate-400 text-xs mb-2">Type</h5>
        <hr />
        <ul className="grid grid-cols-2 text-sm p-2">
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <li className="grid gap-1" key={stat.stat.name}>
              <h6 className="font-semibold">{stat.stat.name} </h6>
              <span className="font-bold">{stat.base_stat} </span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
export default PokemonCard;
