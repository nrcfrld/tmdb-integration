import { HEADER_AUTH } from "./config.js";

const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get("id");

const defineMovieFunc = () => {
    let movie = null;
    let videos = [];

    return {
        getMovieById : async (id) => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, HEADER_AUTH)

            const data = await response.json();

            movie = data;
        },
        render: () => {
            const posterEl = document.querySelector("#hero-section .poster-detail img");
            const heroSection = document.querySelector("#hero-section");

            document.querySelector(".movie-detail h1").textContent = movie.title;
            document.querySelector(".movie-detail .movie-detail-release-date").textContent = movie.release_date;

            const genres = movie.genres; // {id , name}
            const genresName = genres.map(genre => genre.name); // Map digunakan untuk memetakan array baru

            document.querySelector(".movie-detail .movie-detail-genres").textContent = genresName.join(",")



            posterEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

            heroSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        },
        getVideoTrailer : async (id) => {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

            const response = await fetch(url, HEADER_AUTH);
            const data = await response.json();

            videos = data.results.filter(video => video.site === "YouTube");

            const iframeTrailer = document.querySelector(".modal-trailer iframe");

            iframeTrailer.src = `https://www.youtube.com/embed/${videos[0].key}`;
        }
    }
}

const movieDetail = defineMovieFunc();

async function init(){
    // Get Data
    await movieDetail.getMovieById(movieId);

    // Render Data
    movieDetail.render();
    movieDetail.getVideoTrailer(movieId);

    // Remove Loading Page
    const loadingElement = document.querySelector(".loading-page");
    loadingElement.remove()

    // add event listener to button trailer
    const btnTrailer = document.querySelector(".btn-trailer");
    const modalTrailer = document.querySelector(".modal-trailer");

    btnTrailer.addEventListener("click", () => {
        modalTrailer.style.right = "0";
    })

    // add event listener to close modal
    const closeModalBtn = document.querySelector(".close-modal");

    closeModalBtn.addEventListener("click", () => {
        modalTrailer.style.right = "-5000px";
    })
}

init();


