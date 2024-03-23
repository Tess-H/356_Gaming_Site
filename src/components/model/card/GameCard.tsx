import React from 'react';
import { GameCardProps } from '../domain/games';
import './GameCard.css';

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-art">
        <img className="game-cover" src={game.imageCover}></img>
        {/* Priority icons go here */}
      </div>

      <div className="game-info">
        {/*<h4 className="game-title">{game.title}</h4>*/}

        <div className="game-platforms">
          {game.platforms.map((platform) => (
            <span key={platform}>{/* Platform icon goes here */}</span>
          ))}
        </div>

        <p className="game-genre-tags">{game.genre?.map((genreTag) => (
          <span key={genreTag}>{genreTag}</span>
        ))}</p>

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
