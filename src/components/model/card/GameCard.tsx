import React, { useState } from 'react';
import { GameCardProps } from '../domain/games';
import './GameCard.css';
import GameModal from '../modal/GameModal';

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="game-card">
      {/* Front of the Card */}
      <div className="card-front" style={{ backgroundImage: `url(${game.imageCover})` }}>
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
          onClick={toggleModal}
          
        >
          Game Info
        </button>
      </div>
      <GameModal game={game} isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default GameCard;
