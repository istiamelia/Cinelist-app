import React, { useState, useEffect } from "react";
import getMovieDetails from "./movieDetails";
import StarIcon from "./StarIcon";
import ColorthiefC from "./ColorthiefLoad";

interface Props {
  cardId: number;
  title: string;
  year: number;
  imageUrl: string;
  rating: number;
  overview: string;
}

type Details = {
  id: number;
  name: string;
};

type MovieDetailsResponse = {
  genres: Details[];
};

const Cards = ({ title, year, imageUrl, rating, cardId, overview }: Props) => {
  let [hoverCard, setHoverCard] = useState(0);
  const [dominantColor, setDominantColor] = useState("");
  const [firstRGB, setFirstRGB] = useState(0);
  const [genre, setGenre] = useState({});

  //----------- useEffect for generating Movie Details from movieDetails -----------//
  useEffect(() => {
    const fetchData = async () => {
      const data: MovieDetailsResponse = await getMovieDetails(cardId);
      if (data.genres) {
        const genreNames = data.genres.map((genre) => genre.name);
        setGenre(genreNames);
      }
    };
    fetchData();
  }, [cardId]);

  return (
    <div
      className="card"
      style={{
        transform:
          hoverCard === cardId
            ? "scale(1.5)" // Scale up on hover
            : "scale(1)", // Normal size otherwise
        zIndex: hoverCard === cardId ? "10" : "1", // Increase z-index on hover
        top: hoverCard === cardId ? "-10px" : "0",
        width: "10rem",
      }}
      key={cardId}
      onMouseEnter={() => {
        setHoverCard(cardId);
      }}
      onMouseLeave={() => setHoverCard(0)}
    >
      <ColorthiefC
        imageUrl={imageUrl}
        onDominantColorChange={setDominantColor}
        onFirstRGBChange={setFirstRGB}
      />
      <img src={imageUrl} className="card-img-top" alt="..."></img>
      <div
        className="card-content"
        style={{
          visibility: hoverCard === cardId ? "visible" : "hidden",
          opacity: hoverCard === cardId ? 1 : 0,
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          color: firstRGB < 150 ? "#ffffff" : "#000000",
        }}
      >
        <div>
          <span
            className="shadow"
            style={{
              background: `linear-gradient(to top, ${dominantColor}50%, rgba(255, 255, 255, 0))`, // Apply gradient
            }}
          ></span>
          <section className="content1">
            <p id="year" style={{ backgroundColor: `${dominantColor}` }}>
              {year}
            </p>
          </section>
          <section>
            <p>{Object.values(genre).join(" . ")}</p>
          </section>
          <section>
            <StarIcon rating={rating} />
          </section>
          <section>{overview}</section>
        </div>
      </div>
    </div>
  );
};

export default Cards;
