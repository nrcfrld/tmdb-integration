import { API_READ_ACCESS_TOKEN } from "./config.js";
import movieCardTemplate from "./movieCardTemplate.js";

const nowPlayingMoviesHelper = () => {
    let movies = [];

    return {
        getNowPlayingMovies : async () => {
            const url = "https://api.themoviedb.org/3/movie/now_playing";

            const response = await fetch(url, {
                headers : {
                    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
                }
            })

            const result = await response.json();

            movies = result.results;
        },
        renderNowPlayingMovies : () => {
            const movieListElement = document.querySelector("#now-playing-movies .movie-list");
            let templateFullCard = ''

            movies.forEach((movie) => {
                let templateCard = movieCardTemplate(movie);

                templateFullCard += templateCard;
            })

            movieListElement.innerHTML = templateFullCard;
        }
    }
}

export default nowPlayingMoviesHelper;