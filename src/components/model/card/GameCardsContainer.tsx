// GameCardsContainer.tsx

import React from 'react';
import GameCard from './GameCard';
import { Game } from '../domain/games';

interface GameCardsContainerProps {
  games: Game[];
  starGame: (game: Game) => (star: boolean) => void;
}

const GameCardsContainer: React.FC<GameCardsContainerProps> = ({ games, starGame }) => {
  return (<>
    <div className="game-cards-container">
      {games.map((game) => (
        <GameCard key={game.title} game={game} starGame={starGame(game)} />
      ))}
    </div>
    <div className="game-cards-end"></div>
  </>);
};

export default GameCardsContainer;
