import React from 'react';
import { GameCardProps } from '../domain/games';
import './GameCard.css';

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    // 
    const prepend = "../../../public/";
  return (
    <div className="game-card">
      {/* Front of the Card */}
      <div className="card-front" style={{ backgroundImage: `url(${prepend}${game.imageHero})` }}>
        <div className="game-overlay"> {/* Overlay for better text visibility */}
          <h3 className="game-title">{game.title}</h3>
          <div className="game-platforms">
            {game.platforms.map((platform) => (
              <span key={platform}>{/* Platform icon goes here */}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Back of the Card */}
      <div className="card-back">
        <p className="game-genre">{game.genre}</p>
        <p className="game-price">{game.price}</p>
        <p className="game-description">{game.description}</p>
        <button className="game-info-button" 
          // onClick={/* Modal trigger function */}
        >
          Game Info
        </button>
      </div>
    </div>
  );
};

export default GameCard;
