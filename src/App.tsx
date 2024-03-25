import { useState, useRef } from 'react';
import "./App.css";
import GameCardsContainer from "./components/model/card/GameCardsContainer";
import { games } from "./components/model/service/gamesService";

function App() {
  const searchInput = useRef(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    searchInput.current?[!isSearchOpen? "focus" : "blur"]();
  };

  return (
    <>
      <header>
        <span id="menu-button" className="material-symbols-outlined header-button">menu</span>
        <h1>Game Search</h1>
        <div id="search-bar">
          <span id="search-button" className="material-symbols-outlined header-button" onClick={toggleSearch}>search</span>
          <div id="search-collapse" className={isSearchOpen? "show" : ""}>
            <input id="search-input" ref={searchInput} type="search" placeholder="Search" />
            <span id="search-go" className="material-symbols-outlined header-button">send</span>
          </div>
          <span id="random-button" className="material-symbols-outlined header-button">casino</span>
        </div>
      </header>
      <GameCardsContainer games={games} />

    </>
  );
}

export default App;
