import movieCardTemplate from './movieCardTemplate.js';

const movieList = document.querySelector('.movie-list');

const movieFavorites = JSON.parse(localStorage.getItem('movie-favorites'));

movieFavorites.forEach(movie => {
    const cardMovie = movieCardTemplate(movie);

    movieList.innerHTML += cardMovie;
})