import { useState, useRef, FormEvent } from 'react';
import "./App.css";
import GameCardsContainer from "./components/model/card/GameCardsContainer";
import { Game } from "./components/model/domain/games";
import { games } from "./components/model/service/gamesService";

function App() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    searchInput.current?.[!isSearchOpen? "focus" : "blur"]();
  };

  const [searchString, setSearchString] = useState("");
  const [gameFilterStack, _setGameFilterStack] = useState([]);
  const gameFilter = (games: Game[]) => gameFilterStack
    .reduce((a,f) => a.filter(f), games)
    .filter(game => !searchString || game.title.toLowerCase().includes(searchString.toLowerCase()));

  const doSearchInput = (e: FormEvent<HTMLInputElement>) => setSearchString(e.currentTarget.value);

  return (
    <>
      <header>
        <span id="menu-button" className="material-symbols-outlined header-button">menu</span>
        <h1>Game Search</h1>
        <div id="search-bar">
          <span id="search-button" className="material-symbols-outlined header-button" onClick={toggleSearch}>search</span>
          <div id="search-collapse" className={isSearchOpen? "show" : ""}>
            <input id="search-input" ref={searchInput} type="search" placeholder="Search" onInput={doSearchInput} />
            <span id="search-go" className="material-symbols-outlined header-button">send</span>
          </div>
          <span id="random-button" className="header-button">
            <span id="random-button-icon" className="material-symbols-outlined">casino</span>
          </span>
        </div>
      </header>

      <GameCardsContainer games={gameFilter(games)} />
    </>
  );
}

export default App;
