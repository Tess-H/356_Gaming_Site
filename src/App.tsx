  import "./App.css";
  import GameCardsContainer from "./components/model/card/GameCardsContainer";
  import { games } from "./components/model/service/gamesService";

  function App() {

    return (
      <>
        <header>
          <span id="menu-button" className="material-symbols-outlined">menu</span>
          <h1>GameSearch</h1>
          <div id="search-bar">
            <span id="search-button" className="material-symbols-outlined">search</span>
          </div>
        </header>
        <GameCardsContainer games={games} />

      </>
    );
  }

  export default App;
