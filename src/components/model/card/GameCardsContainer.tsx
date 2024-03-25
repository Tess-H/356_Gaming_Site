// GameCardsContainer.tsx

import React from 'react';
import GameCard from './GameCard';
import { Game } from '../domain/games';

interface GameCardsContainerProps {
  games: Game[];
  starredGames: Set<Game>;
  onToggleStarred: (game: Game) => () => void;
  onOpenModal: (game: Game) => () => void;
}

const GameCardsContainer: React.FC<GameCardsContainerProps> = ({ games, starredGames, onToggleStarred, onOpenModal }) => {
  return (<>
    <div className="game-cards-container">
      {games.map((game) => (
        <GameCard key={game.title} game={game} starred={starredGames.has(game)} onToggleStarred={onToggleStarred(game)} onOpenModal={onOpenModal(game)} />
      ))}
    </div>
    <div className="game-cards-end"></div>
  </>);
};

export default GameCardsContainer;
