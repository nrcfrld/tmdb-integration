import { API_READ_ACCESS_TOKEN } from "./config.js";
import nowPlayingMoviesHelper from "./nowPlayingMoviesHelper.js";

const nowPlayingMovies = nowPlayingMoviesHelper();

async function init () {
    await nowPlayingMovies.getNowPlayingMovies();
    nowPlayingMovies.renderNowPlayingMovies();
}

init();

const keyword = "Avenger"

fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}`, {
                headers : {
                    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
                }
            })
.then((resp) => resp.json())
.then(result => console.log(result));