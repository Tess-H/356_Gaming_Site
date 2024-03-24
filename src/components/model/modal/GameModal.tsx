// GameModal.tsx

import React from "react";
import ReactDOM from "react-dom";
import { Game } from "../domain/games";
import "./GameModal.css";

interface GameModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="game-heroimg" src={game.imageHero} alt={game.title} />

        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <p>Rated {game.rating}</p>
        <p>${game.price}</p>

        <ul>
          Accesibility Features:
          {game.accessibilities.map((accessibility, index) => (
            <li key={index}>{accessibility}</li>
          ))}
        </ul>

        <ul>
          Game Spec Requirements:
          {game.gameSpecs.map((specs, index) => (
            <li key={index}>{specs}</li>
          ))}
        </ul>

        <div className="game-genre-tags">
          {/* TODO Tag click event */}
          <div className="game-genre-tags-scroll">{game.genre?.map((genreTag) => (
            <span key={genreTag}>{genreTag}</span>
          ))}</div>
        </div>

        <div class="game-platforms">
          {game.platforms.map((platform, index) => (
            <img
              key={index}
              src={`img/${platform.toLowerCase()}.png`}
              alt={platform}
              title={platform}
            />
          ))}
        </div>
        {/* Any remaining info we want to add */}
        <div className="close-button">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

  // Using `document.body` as the portal target
  // I don't really know how creatPortal works, but it does the trick
  return ReactDOM.createPortal(modalContent, document.body);
};

export default GameModal;
