//COMPONENTS
import { Navbar } from "../../Components/Navbar";
import { Banner } from "../../Components/Banner";
import { MovieRow } from "../../Components/MovieRow";

//styling
import styles from "./styles.module.scss";
import requests from "../../requests";

export const HomeScreen = () => {
  return (
    <div className={styles.homeScreen}>
      <Navbar />
      <Banner />
      <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} isLarge />
      <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <MovieRow title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};
