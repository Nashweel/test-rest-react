import { Component } from "react";
import PokemonDataView from "./PokemonDataView";
import PokemonErrorView from "./PokemonErrorView";
import PokemonPendingView from "./PokemonPendingView";
import pokemonAPI from "../services/pokemon-api";

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const newName = this.props.pokemonName;
    if (prevName !== newName) {
      this.setState({ status: "pending" });

      pokemonAPI
        .fetchPokemon(newName)
        .then((pokemon) => this.setState({ pokemon, status: "resolved" }))
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  render() {
    const { pokemon, status, error } = this.state;
    const { pokemonName } = this.props;

    if (status === "idle") {
      return <div>Введите имя покемона.</div>;
    }

    if (status === "pending") {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }
    if (status === "rejected") {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === "resolved") {
      return <PokemonDataView pokemon={pokemon} />;
    }
    // return (
    //   <div>
    //     {error && <h1>{error.message}</h1>}
    //     {loading && <div>Загружаем...</div>}
    //     {!pokemonName && <div>Введите имя покемона</div>}
    //     {pokemon && (
    //       <div>
    //         <p>{pokemon.name}</p>
    //         <img
    //           src={pokemon.sprites.other["official-artwork"].front_default}
    //           alt={pokemon.name}
    //           width="240"
    //         />
    //       </div>
    //     )}
    //   </div>
    // );
  }
}
