import { useState, useRef, FormEvent, KeyboardEvent, MouseEventHandler } from "react";
import "./App.css";
import GameCardsContainer from "./components/model/card/GameCardsContainer";
import GameModal from "./components/model/modal/GameModal";
import { Game } from "./components/model/domain/games";
import { games } from "./components/model/service/gamesService";

type Filter = (game: Game) => Boolean;
type FilterSet = { [id: string]: Filter; };

function App() {
  const oneUpRef = useRef<HTMLAudioElement>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const sidebarOverlay = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const sidebarOverlayClick: MouseEventHandler<HTMLDivElement> = e => {
    if (e.target === sidebarOverlay.current) setSidebarOpen(false);
  };

  const starredRef = useRef(false);
  const [starredOnly, setStarredOnly] = useState(false);
  const toggleStarredOnly = () => setStarredOnly(!starredOnly);
  starredRef.current = starredOnly;

  const starredGamesRef = useRef<Set<Game>>(new Set());
  const [starredGames, setStarredGames] = useState<Set<Game>>(new Set());
  starredGamesRef.current = starredGames;

  const starGame = (game: Game) => (star: boolean) => setStarredGames(prev => {
    if (star) return new Set([...prev, game]);
    else return new Set([...prev].filter(g => g !== game));
  });
  const toggleStarred = (game: Game) => () => {
    const starredGames = starredGamesRef.current;
    starGame(game)(!starredGames.has(game));
  };

  const starredFilter: Filter = game => {
    const starredOnly = starredRef.current;
    const starredGames = starredGamesRef.current;
    return !starredOnly || starredGames.has(game);
  };

  const searchRef = useRef("");
  const [searchString, setSearchString] = useState("");
  searchRef.current = searchString; // Needs ref to maintain state inside arrow function

  const searchFilter: Filter = game => {
    const searchString = searchRef.current;
    return !searchString || game.title.toLowerCase().includes(searchString.toLowerCase());
  };

  const [gameFilterSet, _setGameFilter] = useState<FilterSet>({ searchFilter, starredFilter });
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

  const [modalGame, setModalGame] = useState<Game | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const openModal = (game: Game) => () => {
    setModalGame(game);
    setModalOpen(true);
  };

  const showRandomGame = () => {
    const gameList = filterGames(games);
    openModal(gameList[Math.floor(Math.random() * gameList.length)])();
  };

  return (
    <>
      <header>
        <span id="menu-button" className={"material-symbols-outlined header-button" + (isSidebarOpen? " sidebar-open" : "")} onClick={toggleSidebar}></span>
        <audio id="one-up" ref={oneUpRef} src="./1up.mp3"></audio>
        <h1 onClick={() => oneUpRef.current?.play()}>Level Up+</h1>
        <div id="breadcrumbs" className={isSidebarOpen? "hide" : ""}>
          {starredOnly? <>
            <span className="bc-chevron material-symbols-outlined">chevron_right</span>
            <span id="bc-starred-only" onClick={() => setStarredOnly(false)}>Starred Only<span className="bc-remove material-symbols-outlined">close</span></span>
          </> : null}
        </div>
        <div id="search-bar">
          <span id="search-button" className="material-symbols-outlined header-button" onClick={toggleSearch}></span>
          <div id="search-collapse" className={isSearchOpen? "show" : ""}>
            <input id="search-input" ref={searchInput} type="search" placeholder="Search" onInput={doSearchInput} onKeyDown={doSearchEscapeKey} />
            <span id="search-go" className="material-symbols-outlined header-button"></span>
          </div>
          <span id="random-button" className="header-button" onClick={showRandomGame}>
            <span id="random-button-icon" className="material-symbols-outlined"></span>
          </span>
        </div>
      </header>

      <GameCardsContainer games={filterGames(games)} starredGames={starredGames} onToggleStarred={toggleStarred} onOpenModal={openModal} />

      <div id="sidebar-overlay" ref={sidebarOverlay} className={isSidebarOpen? "show" : ""} onClick={sidebarOverlayClick}>
        <div id="sidebar-container">
          <div id="starred-only-toggle" className={"sidebar-control-box sidebar-toggle" + (starredOnly? " on" : "")} onClick={toggleStarredOnly}>
            Starred Only
          </div>
        </div>
      </div>

      {modalGame? <GameModal game={modalGame} isOpen={isModalOpen} onClose={toggleModal} isStarred={starredGames.has(modalGame)} toggleStarred={toggleStarred(modalGame)} /> : null}
    </>
  );
}

export default App;
