import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Billboard from "./Billboard";
import Popular from "./Popular";
import Slider from "react-slick";

interface Movie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  year: number;
}

const years = (date: string) => {
  let releaseDate = new Date(date);
  return releaseDate.getFullYear();
};

function PageButton({
  onclick,
  disabled,
  name,
  className,
}: {
  onclick: () => void;
  disabled: boolean;
  name: string | number;
  className: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onclick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

const Movie = ({}) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
  const [pages, setPages] = useState(1);
  const [billboardId, setBillboardId] = useState(0);
  const [firstMovieId, setFirstMovieId] = useState<number | null>(null);

  const getMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&page=${pages}`
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
        setFirstMovieId(json.results[0].id);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  };

  useEffect(() => {
    getMovie();
  }, [pages]);

  function handlePageClick() {
    const pageList = pageNumbers.map((page, i) => {
      // Check if the last page in the list equals 'pages'
      if (pageNumbers[4] === pages) {
        return page + 5 - 1;
      } else {
        // If the condition isn't met, just return the page unchanged
        return page;
      }
    });
    setPageNumbers((currentPage) => (currentPage = pageList));
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 8,
    slidesToScroll: 5,
  };

  return (
    <div>
      {firstMovieId && (
        <Billboard
          billboardId={billboardId === 0 ? firstMovieId : billboardId}
        />
      )}

      <Slider {...settings}>
        {movieList.map((movie) => (
          <Popular
            key={movie.id}
            cardId={movie.id}
            imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            onMovieIdChange={setBillboardId}
            currentId={
              (billboardId === 0 || billboardId === null
                ? firstMovieId
                : billboardId) as number
            }
          />
        ))}
      </Slider>
      <div
        className="movie-card"
        style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        {movieList.map((movie) => (
          <Cards
            cardId={movie.id} // Always use a unique key in lists
            title={movie.title}
            year={years(movie.release_date)}
            imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            rating={movie.vote_average}
            overview={
              movie.overview.length > 250
                ? `${movie.overview.substring(0, 250)}...`
                : movie.overview
            }
          />
        ))}
      </div>
      <p>{pages}</p>
      <PageButton
        className="btn btn-outline-primary"
        onclick={() => {
          setPages((prevPages) => prevPages - 1);
          handlePageClick();
        }}
        disabled={pages === 1}
        name={"<"}
      />
      {pageNumbers.map((page) => (
        <PageButton
          className={
            pages === page ? "btn btn-primary" : "btn btn-outline-primary"
          }
          onclick={() => {
            setPages((currentPage) => (currentPage = page));
            handlePageClick();
          }}
          disabled={false}
          name={page}
        />
      ))}

      <PageButton
        className="btn btn-outline-primary"
        onclick={() => {
          setPages((prevPages) => prevPages + 1);
          handlePageClick();
        }}
        disabled={false}
        name={">"}
      />
    </div>
  );
};

export default Movie;
