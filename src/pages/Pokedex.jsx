import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";

const Pokedex = () => {
  //todos los pokemons estan aqui
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };
//trae todos los pokemons
  useEffect(() => {
    if(currentType === ""){
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);
  //trae tipos disponibles
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);
  //trae los pokemon con base a un tipo
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}`)
        .then(({ data }) =>
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))
        )
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  return (
    <main>
      <section>
        <p>
          <span>
            welcome {trainerName}, here you can find your favorite pokemon
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="pokemonName" type="text" />
            <button>Search</button>
          </div>

          <select onChange={handleChangeType} className="capitalize">
            <option value="">All pokemon's</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}{" "}
              </option>
            ))}
          </select>
        </form>
      </section>

      <PokemonList pokemons={pokemonsByName} />
    </main>
  );
};
export default Pokedex;
