import {
  useState,
  useRef,
  FormEvent,
  KeyboardEvent,
  MouseEventHandler,
} from "react";
import "./App.css";
import GameCardsContainer from "./components/model/card/GameCardsContainer";
import GameModal from "./components/model/modal/GameModal";
import { Game } from "./components/model/domain/games";
import { games } from "./components/model/service/gamesService";

type Filter = (game: Game) => Boolean;
type FilterSet = { [id: string]: Filter };

function App() {
  const oneUpRef = useRef<HTMLAudioElement>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const sidebarOverlay = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const sidebarOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === sidebarOverlay.current) setSidebarOpen(false);
  };

  const starredRef = useRef(false);
  const [starredOnly, setStarredOnly] = useState(false);
  const toggleStarredOnly = () => setStarredOnly(!starredOnly);
  starredRef.current = starredOnly;

  const starredGamesRef = useRef<Set<Game>>(new Set());
  const [starredGames, setStarredGames] = useState<Set<Game>>(new Set());
  starredGamesRef.current = starredGames;

  const starGame = (game: Game) => (star: boolean) =>
    setStarredGames((prev) => {
      if (star) return new Set([...prev, game]);
      else return new Set([...prev].filter((g) => g !== game));
    });
  const toggleStarred = (game: Game) => () => {
    const starredGames = starredGamesRef.current;
    starGame(game)(!starredGames.has(game));
  };
  const clearAllStars = () => setStarredGames(() => new Set());

  const starredFilter: Filter = (game) => {
    const starredOnly = starredRef.current;
    const starredGames = starredGamesRef.current;
    return !starredOnly || starredGames.has(game);
  };

  const searchRef = useRef("");
  const [searchString, setSearchString] = useState("");
  searchRef.current = searchString; // Needs ref to maintain state inside arrow function

  const searchFilter: Filter = (game) => {
    const searchString = searchRef.current;
    return (
      !searchString ||
      game.title.toLowerCase().includes(searchString.toLowerCase())
    );
  };
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const selectedGenreRef = useRef<string | null>(null);
  selectedGenreRef.current = selectedGenre;

  const genreFilter: Filter = (game) => {
    const selectedGenre = selectedGenreRef.current;
    return !selectedGenre || game.genre?.includes(selectedGenre);
  };

  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const selectedVibeRef = useRef<string | null>(null);
  selectedVibeRef.current = selectedVibe;
  const vibeFilter: Filter = (game) => {
    const selectedVibe = selectedVibeRef.current;
    return !selectedVibe || game.vibe?.includes(selectedVibe);
  };

  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const maxPriceRef = useRef<number | null>(null);
  maxPriceRef.current = maxPrice;

  const maxPriceFilter: Filter = (game) => {
    const maxPrice = maxPriceRef.current;
    if (maxPrice === null) return true;
    const finalPrice = game.sale ?? game.price;
    return finalPrice <= maxPrice;
  };

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const minPriceRef = useRef<number | null>(null);
  minPriceRef.current = minPrice;

  const minPriceFilter: Filter = (game) => {
    const minPrice = minPriceRef.current;
    if (minPrice === null) return true;
    const finalPrice = game.sale ?? game.price;
    return finalPrice >= minPrice;
  };
  // Add a filter that corresponds with a checkbox -- if the checkbox is checked, the filter filters out games that are not on sale
  const [showSale, setShowSale] = useState(false);
  const showSaleRef = useRef(false);
  showSaleRef.current = showSale;

  const saleFilter: Filter = (game) => {
    const showSale = showSaleRef.current;
    return !showSale || game.sale !== undefined;
  };
  // Add filters for where to buy and platform
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const selectedPlatformRef = useRef<string | null>(null);
  selectedPlatformRef.current = selectedPlatform;

  const platformFilter: Filter = (game) => {
    const selectedPlatform = selectedPlatformRef.current;
    return !selectedPlatform || game.platforms.includes(selectedPlatform);
  };

  const [selectedSoldWhere, setSelectedSoldWhere] = useState<string | null>(
    null
  );
  const selectedSoldWhereRef = useRef<string | null>(null);
  selectedSoldWhereRef.current = selectedSoldWhere;

  const soldWhereFilter: Filter = (game) => {
    const selectedSoldWhere = selectedSoldWhereRef.current;
    return !selectedSoldWhere || game.soldWhere.includes(selectedSoldWhere);
  };

  const [gameFilterSet, _setGameFilter] = useState<FilterSet>({
    searchFilter,
    starredFilter,
    genreFilter,
    maxPriceFilter,
    minPriceFilter,
    vibeFilter,
    saleFilter,
    platformFilter,
    soldWhereFilter,
  });

  const filterGames = (games: Game[]) =>
    Object.values(gameFilterSet).reduce((a, f) => a.filter(f), games);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    searchInput.current?.[!isSearchOpen ? "focus" : "blur"]();
    if (isSearchOpen /* inverse; hasn't updated yet */) setSearchString("");
  };

  const doSearchInput = (e: FormEvent<HTMLInputElement>) =>
    setSearchString(e.currentTarget.value);
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
        <span
          id="menu-button"
          className={
            "material-symbols-outlined header-button" +
            (isSidebarOpen ? " sidebar-open" : "")
          }
          onClick={toggleSidebar}
        ></span>
        <audio id="one-up" ref={oneUpRef} src="./1up.mp3"></audio>
        <h1 onClick={() => oneUpRef.current?.play()}>Level Up+</h1>
        <div id="breadcrumbs" className={isSidebarOpen ? "hide" : ""}>
          {starredOnly ? (
            <>
              <span className="bc-chevron material-symbols-outlined">
                chevron_right
              </span>
              <span id="bc-starred-only" onClick={() => setStarredOnly(false)}>
                Starred
                <span className="bc-remove material-symbols-outlined">
                  close
                </span>
              </span>
            </>
          ) : null}
        </div>
        <div id="search-bar">
          <span
            id="search-button"
            className="material-symbols-outlined header-button"
            onClick={toggleSearch}></span>
          <div id="search-collapse" className={isSearchOpen ? "show" : ""}>
            <input id="search-input"
              ref={searchInput}
              type="search"
              placeholder="Search"
              onInput={doSearchInput}
              onKeyDown={doSearchEscapeKey} />
            <span id="search-go"
              className="material-symbols-outlined header-button"></span>
          </div>
          <span id="random-button"
            className="header-button"
            onClick={showRandomGame}>
            <span id="random-button-icon"
              className="material-symbols-outlined"></span>
          </span>
          <span id="user-profile-button"
            className="header-button">
            <img id="user-profile-icon"
              src="img/profile.jpg" alt="User Profile" />
          </span>
        </div>
      </header>

      <GameCardsContainer
        games={filterGames(games)}
        starredGames={starredGames}
        onToggleStarred={toggleStarred}
        onOpenModal={openModal}
      />

      <div id="sidebar-overlay"
        ref={sidebarOverlay}
        className={isSidebarOpen? "show" : ""}
        onClick={sidebarOverlayClick}>
        <div id="sidebar-container">
          <select value={selectedGenre || ""}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="sidebar-control-box">
            <option value="">All Genres</option>
            {[...new Set(games.flatMap((game) => game.genre || []))]
              .sort()
              .map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
          </select>
          <select
            value={selectedVibe || ""}
            onChange={(e) => setSelectedVibe(e.target.value)}
            className="sidebar-control-box">
            <option value="">All Vibes</option>
            {[...new Set(games.flatMap((game) => game.vibe || []))]
              .sort()
              .map((vibe) => (
                <option key={vibe} value={vibe}>
                  {vibe}
                </option>
              ))}
          </select>

          <hr className="sidebar-divider"/>

          <div className="price-filter-container">
            <input type="number"
              placeholder="Min Price"
              value={minPrice || ""} min={0}
              onChange={(e) => setMinPrice(e.target.value?
                parseInt(e.target.value) : null)}
              className="sidebar-control-box min-price"/>
            <input type="number"
              placeholder="Max Price"
              value={maxPrice || ""} min={0}
              onChange={(e) => setMaxPrice(e.target.value?
                parseInt(e.target.value) : null)}
              className="sidebar-control-box max-price"/>
          </div>

          <div className={"sidebar-control-box sidebar-toggle"+(showSale? " on" : "")}
               onClick={() => setShowSale(!showSale)} >
            On Sale Only
          </div>

          <hr className="sidebar-divider"/>

          <div className="select-filter-container">
            <select className="sidebar-control-box"
              value={selectedPlatform || ""}
              onChange={(e) => setSelectedPlatform(e.target.value)}>
              <option value="">All Platforms</option>
              {[...new Set(games.flatMap((game) => game.platforms))]
                .sort()
                .map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
            </select>
            <select className="sidebar-control-box"
              value={selectedSoldWhere || ""}
              onChange={(e) => setSelectedSoldWhere(e.target.value)}>
              <option value="">All Vendors</option>
              {[...new Set(games.flatMap((game) => game.soldWhere))]
                .sort()
                .map((soldWhere) => (
                  <option key={soldWhere} value={soldWhere}>
                    {soldWhere}
                  </option>
                ))}
            </select>
          </div>

          <hr className="sidebar-divider"/>

          <div id="starred-only-toggle"
            className={"sidebar-control-box sidebar-toggle" + (starredOnly? " on" : "")}
            onClick={toggleStarredOnly}>
            Starred Only
          </div>
          <div id="clear-all-stars"
            className="sidebar-control-box sidebar-button"
            onClick={clearAllStars}>
            Clear All Stars
          </div>
        </div>
      </div>

      {modalGame ? (
        <GameModal
          game={modalGame}
          isOpen={isModalOpen}
          onClose={toggleModal}
          isStarred={starredGames.has(modalGame)}
          toggleStarred={toggleStarred(modalGame)}
        />
      ) : null}
    </>
  );
}

export default App;
