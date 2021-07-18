import { useState, useEffect, useCallback } from "react";

import axios from "./../../axios";
import requests from "./../../requests";

//styling
import styles from "./styles.module.scss";

export interface MovieData {
  backdrop_path: string;
  first_air_date: string;
  genreIds: Number[];
  id: number;
  name: string;
  origin_country: String[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export const Banner = () => {
  const [movie, setMovie] = useState<MovieData>();

  const truncateText = (text: string, n: number): string => {
    return text?.length > n ? text.substr(0, n - 1) + "..." : text;
  };

  const fetchData = useCallback(async () => {
    const request = await axios.get(requests.fetchNetflixOriginals);
    setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
    return request;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.contents}>
        <h1 className={styles.title}>{movie?.name}</h1>
        <div className={styles.buttons}>
          <button className={styles.button}>play</button>
          <button className={styles.button}>My List</button>
        </div>
        <h2 className={styles.description}>{truncateText(`${movie?.overview}`, 150)}</h2>
      </div>
      <div className={styles.fadeBottom}></div>
    </header>
  );
};
