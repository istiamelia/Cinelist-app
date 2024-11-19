import { useState } from "react";

const getMovieDetails = async (movieId: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching date:", err);
    return null;
  }
};

export default getMovieDetails;
