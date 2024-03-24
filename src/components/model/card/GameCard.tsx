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
        <img className="game-cover" src={game.imageCover} onClick={toggleModal}></img>

        <div className="game-platforms">
          {/* TODO Platform click event */}
          {game.platforms.map((platform, index) => (
            <img
              key={index}
              src={`img/${platform.toLowerCase()}.png`}
              alt={platform}
              title={platform}
            />
          ))}
        </div>
      </div>

      <div className="game-info">
        {/*<h4 className="game-title">{game.title}</h4>*/}

        <div className="game-genre-tags">
          {/* TODO Tag click event */}
          <div className="game-genre-tags-scroll">{game.genre?.map((genreTag) => (
            <span key={genreTag}>{genreTag}</span>
          ))}</div>
        </div>

        <p className="game-description">{game.description}</p>

        {/*<p className="game-price">${game.price}</p>*/}

        <button className="game-info-button" onClick={toggleModal}>
          Read More
        </button>
      </div>
      <GameModal game={game} isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default GameCard;
