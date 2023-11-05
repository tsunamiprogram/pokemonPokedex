import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import HeaderPokeball from "../components/layouts/HeaderPokeball";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)

  const { pokemonId } = useParams();

  const getPercentStats = (statsValue) => {
    const MaxStatValue = 255
    const PercentStat = ((statsValue * 100) / MaxStatValue).toFixed(1)
    return `${PercentStat}%`

  }

  useEffect(() => {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(({data}) => setPokemon(data))
    .catch((err) => console.log(err))

  }, [])
  

  return (
    <main className=" text-center capitalize">
      <HeaderPokeball/>
      <article className="max-w-[500px] py-10 px-2 mx-auto">
        <header>
          <img src={pokemon?.sprites.other["official-artwork"].front_default } alt="" 
          />
        </header>
        <h3>#{pokemon?.id}</h3>
        <h2>{pokemon?.name} </h2>
        {/* stats */}
        <section className="text-start">
          <h3>Stats</h3>
          <ul className="grid gap-4">
            {
              pokemon?.stats.map((stat) => (
              <li className="capitalize" key={stat.stat.name}>
                <div className="flex justify-between items-center">
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}/255</span>
                </div>
                {/* total Bar */}
                <div className="bg-slate-200 rounded-md h-6">
                  {/* Bar Progress */}
                  <div style={{width: getPercentStats(stat.base_stat)}} className={"bg-yellow-400 h-full"}></div>
                </div>
              </li> 
              ))
            }
          </ul>
        </section>
      </article>
    </main>
  )
}
export default PokemonDetail