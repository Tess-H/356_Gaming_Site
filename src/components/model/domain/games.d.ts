//TODO: Review json and make sure it looks good and got what we need
export interface Game {
  title: string; //name of game
  description: string;
  imageCover: string;
  imageHero: string;
  musician: string[]; //name of muscisian or band or whatever
  similarGames: string[]; //array of similar games
  gamesByDevelopers: string[]; //other games by same developers
  genre: string[];
  vibe: string[];
  price: number; //made number do be able to do price comparision?
  reviews: number; //should this be number if we do stars?
  multiplayer: string; //yes or no
  competitive: string; //yes or no
  developerSite: string; //link to developers site
  soldWhere: string[]; //gamestop, online, etc.
  rating: string; //e, e10, t, m, etc.
  awards: string;
  accessibilities: string[];
  warnings: string[];
  gameSpecs: string[];
  platforms: string[]; //platform game is playable on like xbox, pc, etc.
  memoryUsage: string;
  sale?: number;
}
export interface GameCardProps {
  game: Game;
  starred: boolean;
  onToggleStarred: () => void;
  onOpenModal: () => void;
}
