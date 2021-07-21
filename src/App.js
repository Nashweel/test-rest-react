import { Component } from "react";
import { ToastContainer } from "react-toastify";
import PokemonForm from "./components/PokemonForm";
// import PokemonInfo from "./components/PokemonInfo";

export default class App extends Component {
  state = {
    pokemonName: "",
  };

  handleFormSubmit = (pokemonName) => {
    this.setState({ pokemonName });
    console.log(pokemonName);
  };

  render() {
    return (
      <div style={{ maxWidth: 1170, margin: "0 auto", padding: 20 }}>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <ToastContainer />
      </div>
    );
  }
}

// componentDidMount() {
//   this.setState({ loading: true });
//   setTimeout(() => {
//     fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//       .then((res) => res.json())
//       .then((pokemon) => this.setState({ pokemon }))
//       .finally(() => this.setState({ loading: false }));
//   }, 1000);
// }
