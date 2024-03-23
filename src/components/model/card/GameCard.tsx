import React, { useState } from 'react';
import { GameCardProps } from '../domain/games';
import './GameCard.css';
import GameModal from '../modal/GameModal';

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

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
