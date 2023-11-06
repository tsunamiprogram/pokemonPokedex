import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { bgByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);

  const { pokemonId } = useParams();
  const firstType = pokemon?.types[0].type.name;

  const getPercentStats = (statsValue) => {
    const MaxStatValue = 150;
    const PercentStat = ((statsValue * 100) / MaxStatValue).toFixed(1);
    return `${PercentStat}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className=" text-center capitalize">
      <HeaderPokeball />
      <article className={`max-w-[500px] mt-[100px] mx-auto capitalize border-4 p-1 rounded-lg border-slate-100 text-center`}
      >
        <header className={`relative ${bgByType[firstType]} h-[130px]`}><div className="absolute w-full top-0 -translate-y-1/2">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
              className="max-w-[180px] mx-auto"/>
          </div>
        </header>
        <div className="pt-6">
          <div className="mx-auto justify-center ">
            <h3  className=" max-w-[38px] text-xl text-gray-600 font-semibold border-2 mx-auto">#{pokemon?.id}</h3>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-600">{pokemon?.name} </h2>
          {/* stats */}

          <section className="text-start px-12 ">
            <h3>Stats</h3>
            <ul className="grid gap-4">
              {pokemon?.stats.map((stat) => (
                <li className="capitalize" key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <h5>{stat.stat.name}</h5>
                    <span>{stat.base_stat}/150</span>
                  </div>
                  {/* total Bar */}
                  <div className="bg-slate-200 rounded-md h-6">
                    {/* Bar Progress */}
                    <div
                      style={{ width: getPercentStats(stat.base_stat) }}
                      className={"bg-gradient-to-r from-amber-400 to-amber-700 h-full"}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
};
export default PokemonDetail;
