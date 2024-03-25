import { useState, useRef, FormEvent, KeyboardEvent, MouseEventHandler } from 'react';
import "./App.css";
import GameCardsContainer from "./components/model/card/GameCardsContainer";
import { Game } from "./components/model/domain/games";
import { games } from "./components/model/service/gamesService";

type Filter = (game: Game) => Boolean;
type FilterSet = { [id: string]: Filter; };

function App() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const sidebarOverlay = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const sidebarOverlayClick: MouseEventHandler<HTMLDivElement> = e => {
    if (e.target === sidebarOverlay.current) setSidebarOpen(false);
  };

  const searchRef = useRef("");
  const [searchString, setSearchString] = useState("");
  searchRef.current = searchString; // Needs ref to maintain state inside arrow function

  const searchFilter: Filter = game => {
    const searchString = searchRef.current;
    return !searchString || game.title.toLowerCase().includes(searchString.toLowerCase());
  };

  const [gameFilterSet, _setGameFilter] = useState<FilterSet>({ searchFilter });
  const filterGames = (games: Game[]) => Object.values(gameFilterSet)
   .reduce((a,f) => a.filter(f), games);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    searchInput.current?.[!isSearchOpen? "focus" : "blur"]();
    if (isSearchOpen /* inverse; hasn't updated yet */) setSearchString("");
  };

  const doSearchInput = (e: FormEvent<HTMLInputElement>) => setSearchString(e.currentTarget.value);
  const doSearchEscapeKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Escape") {
      searchInput.current?.blur();
      setSearchOpen(false);
      setSearchString("");
      e.preventDefault();
    }
  };

  return (
    <>
      <header>
        <span id="menu-button" className="material-symbols-outlined header-button" onClick={toggleSidebar}>{isSidebarOpen? "arrow_back" : "menu"}</span>
        <h1>Game Search</h1>
        <div id="search-bar">
          <span id="search-button" className="material-symbols-outlined header-button" onClick={toggleSearch}>search</span>
          <div id="search-collapse" className={isSearchOpen? "show" : ""}>
            <input id="search-input" ref={searchInput} type="search" placeholder="Search" onInput={doSearchInput} onKeyDown={doSearchEscapeKey} />
            <span id="search-go" className="material-symbols-outlined header-button">send</span>
          </div>
          <span id="random-button" className="header-button">
            <span id="random-button-icon" className="material-symbols-outlined">casino</span>
          </span>
        </div>
      </header>

      <GameCardsContainer games={filterGames(games)} />

      <div id="sidebar-overlay" ref={sidebarOverlay} className={isSidebarOpen? "show" : ""} onClick={sidebarOverlayClick}>
        <div id="sidebar-container">
          Filters...
        </div>
      </div>
    </>
  );
}

export default App;
