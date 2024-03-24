// GameCardsContainer.tsx

import React from 'react';
import GameCard from './GameCard';
import { Game } from '../domain/games';

interface GameCardsContainerProps {
  games: Game[];
}

const GameCardsContainer: React.FC<GameCardsContainerProps> = ({ games }) => {
  return (<>
    <div className="game-cards-container">
      {games.map((game) => (
        <GameCard key={game.title} game={game} />
      ))}
    </div>
    <div className="game-cards-end"></div>
  </>);
};

export default GameCardsContainer;
