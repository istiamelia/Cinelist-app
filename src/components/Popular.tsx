import React, { useState, useEffect } from "react";

interface Props {
  imageUrl: string;
  cardId: number;
  currentId: number;
  onMovieIdChange: (id: number) => void;
}

const Popular = ({ imageUrl, cardId, currentId, onMovieIdChange }: Props) => {
  let [hoverCard, setHoverCard] = useState(0);

  const handleMouseEnter = (cardId: number) => {
    setHoverCard(cardId);
    onMovieIdChange(cardId);
  };

  return (
    <div>
      <div
        className="popular-card"
        key={cardId}
        onMouseEnter={() => handleMouseEnter(cardId)}
        onMouseLeave={() => setHoverCard(0)}
        style={{
          opacity: currentId === cardId ? 1 : 0.4,
          border: currentId === cardId ? "white 2px solid" : "none",
        }}
      >
        <img src={imageUrl} className="card-img-top" alt="..."></img>
      </div>
    </div>
  );
};

export default Popular;
