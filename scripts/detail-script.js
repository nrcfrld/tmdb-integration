import { API_READ_ACCESS_TOKEN } from "./config.js";

const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get("id");

const defineMovieFunc = () => {
    let movie = null;

    return {
        getMovieById : async (id) => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
                headers : {
                    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
                }
            })

            const data = await response.json();

            movie = data;
        },
        render: () => {
            const posterEl = document.querySelector("#hero-section .poster-detail img");
            const heroSection = document.querySelector("#hero-section");

            posterEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

            heroSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }
    }
}

const movieDetail = defineMovieFunc();

async function init(){
    await movieDetail.getMovieById(movieId);
    movieDetail.render();
}

init();


