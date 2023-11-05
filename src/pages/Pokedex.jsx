import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  //todos los pokemons estan aqui
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const { itemsIncurrentPage, lastpage, pagesInCurrentBlock } = paginateData(
    pokemonsByName,
    currentPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handlePreviousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastpage) {
      setCurrentPage(newCurrentPage);
    }
  };
  //trae todos los pokemons
  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);
  //trae los tipos disponibles
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

  //Reset Actual Page
  useEffect(() => {
    setCurrentPage(1);
  }, [currentType]);

  return (
    <main>
      <HeaderPokeball />
      <section>
        <p className="my-2">
          <span className="text-red-500">welcome {trainerName},</span>
          <span className="text-black">
            {" "}
            here you can find your favorite pokemon
          </span>
        </p>
        <form className="flex flex-wrap justify-center gap-2 my-8" onSubmit={handleSubmit}>
          <div>
            <input 
              placeholder="Find one pokemon"
              className="shadow-lg rounded pl-4 pr-[250px]"
              name="pokemonName"
              type="text"
            > </input>
            <button className="bg-red-500 border-2 border-red-500 rounded px-8 text-white">
              Search
            </button>
          </div>

          <select onChange={handleChangeType} className="shadow-lg capitalize ml-2 pl-4 pr-[250px]">
            <option  value="">
             {" All pokemon's"}
            </option>
            {types.map((type) => (
              <option
                
                value={type.name}
                key={type.url}
              >
                {type.name}{" "}
              </option>
            ))}
          </select>
        </form>
      </section>

      <ul className="flex flex-wrap justify-center gap-4">
        {currentPage !== 1 && (
          <li>
            <button onClick={handlePreviousPage}> {"<"} </button>
          </li>
        )}
        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`p-2 text-white font-bold rounded-md ${
                currentPage === page ? "bg-red-500" : "bg-red-400"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== lastpage && (
          <li>
            <button onClick={handleNextPage}> {">"} </button>
          </li>
        )}
      </ul>

      <PokemonList pokemons={itemsIncurrentPage} />
    </main>
  );
};
export default Pokedex;
