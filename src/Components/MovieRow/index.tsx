//MODULES
import { FC, useState, useEffect, useCallback } from "react";

//COMPONENTS
import axios from "./../../axios";
import { MovieData } from "./../Banner";

//STYLING
import styles from "./styles.module.scss";

interface MovieRowProps {
  title: string;
  fetchUrl: string;
  isLarge?: boolean;
}

export const MovieRow: FC<MovieRowProps> = ({ title, fetchUrl, isLarge }) => {
  const [movies, setMovies] = useState<MovieData[]>();
  console.log(movies);

  const fetchData = useCallback(async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.movieRow}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>
        {movies &&
          movies.map(
            (movie) =>
              ((isLarge && movie.poster_path) || (!isLarge && movie.backdrop_path)) && (
                <img
                  className={`${styles.image} ${isLarge && styles.imageLarge}`}
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${isLarge ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name}
                  loading="lazy"
                />
              )
          )}
      </div>
    </div>
  );
};
