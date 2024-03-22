  import "./App.css";
  import GameCardsContainer from "./components/model/card/GameCardsContainer";
  import { games } from "./components/model/service/gamesService";

  function App() {

    return (
      <>
        <div>

        </div>
        <GameCardsContainer games={games} />

      </>
    );
  }

  export default App;
