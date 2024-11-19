import React, { useState, useEffect, useTransition, Suspense } from "react";
import getMovieDetails from "./movieDetails";
import StarIcon from "./StarIcon";
import Navbar from "./Navbar";

interface Props {
  billboardId: number;
}
type Details = {
  id: number;
  name: string;
};

interface Movie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  year: number;
  backdrop_path: string;
  genres: Details[];
}

const Billboard = ({ billboardId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [posterPath, setPosterPath] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const movieId = billboardId;

  useEffect(() => {
    const fetchData = async () => {
      const data: Movie | null = await getMovieDetails(movieId);
      if (data) {
        console.log(data);
        startTransition(() => {
          setPosterPath(data.backdrop_path);
          setMovieDetails(data);
        });
      }
    };

    fetchData();
  }, [movieId]);
  let genreList = [];

  for (const genre of movieDetails?.genres || []) {
    genreList.push(<p key={genre.id}>{genre.name}</p>);
  }
  let imageUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

  // movieDetails;
  function AlbumsGlimmer() {
    return (
      <div className="glimmer-panel">
        <div className="glimmer-line" />
        <div className="glimmer-line" />
        <div className="glimmer-line" />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="frame">
        <Navbar />
        <Suspense fallback={<AlbumsGlimmer />}>
          <img className="billboard" src={imageUrl} alt="" />
        </Suspense>
      </div>
      <div>
        <div className="content">
          <h1 className="content-title">
            <a href="">{movieDetails?.title}</a>
          </h1>
          <section className="content-rating">
            <StarIcon rating={movieDetails?.vote_average ?? 0} />
          </section>
          <section className="genre-list">{genreList}</section>
          <p className="content-info">{movieDetails?.overview}</p>
          <div className="content-button">
            <button className="review-button">Add Review</button>
            <button className="save-button">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
