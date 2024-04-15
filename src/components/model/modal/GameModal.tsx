import React from "react";
import ReactDOM from "react-dom";
import { Game } from "../domain/games";
import "./GameModal.css";

interface GameModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
  isStarred: boolean;
  toggleStarred: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose, isStarred, toggleStarred }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="game-hero-container">
          <img className="game-heroimg" src={game.imageHero} alt={game.title} />

          <div className="game-star-target" onClick={toggleStarred}>
            <div className={"game-star-button" + (isStarred? " starred" : "")}>
              <span className="game-star-icon material-symbols-outlined"></span>
              {isStarred? "Starred" : "Star"}
            </div>
          </div>

          <button className="close-button material-symbols-outlined" onClick={onClose}>close</button>
        </div>

        <div className="game-info-columns">
          <div className="game-info-left">
            <h2 className="game-title">{game.title}</h2>

            <div className="game-genre-tags">
              {/* TODO Tag click event */}
              <div className="game-genre-tags-scroll">{game.genre?.map((genreTag) => (
                <span key={genreTag}>{genreTag}</span>
              ))}</div>
            </div>

            <p className="game-desc">{game.description}</p>
            <p className="game-rating">Rated {game.rating}</p>
            <p className={"game-price" + (game.sale? " sale" : "")}>
              {game.sale? (<span className="game-full-price">${game.price.toFixed(2)}</span>) : null}
              <span className="game-current-price">{game.price? "$"+(game.price * (100 - (game.sale || 0))/100).toFixed(2) : "Free to play"}
              {game.sale? (<span className="game-sale-percent">({game.sale}% off)</span>) : null}
              </span>
            </p>
          </div>

          <div className="game-info-right">
            <div className="game-platforms">
              {game.platforms.map((platform, index) => (
                <img
                  key={index}
                  src={`img/${platform.toLowerCase()}.png`}
                  alt={platform}
                  title={platform}
                />
              ))}
            </div>

            <ul className="game-specs">
              Game Spec Requirements:
              {game.gameSpecs.map((specs, index) => (
                <li key={index}>{specs}</li>
              ))}
            </ul>

            <ul className="game-accessibility">
              Accesibility Features:
              {game.accessibilities.map((accessibility, index) => (
                <li key={index}>{accessibility}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Any remaining info we want to add */}
      </div>
    </div>
  );

  // Using `document.body` as the portal target
  // I don't really know how creatPortal works, but it does the trick
  return ReactDOM.createPortal(modalContent, document.body);
};

export default GameModal;
