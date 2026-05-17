const movieCardTemplate = (movie) => {
    const date = new Date(movie.release_date);

    return `<div class="movie-card">
                    <a href="./detail.html?id=${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
                    </a>

                    <h3><a href="./detail.html?id=${movie.id}">${movie.title}</a></h3>
                    <span>${date.toLocaleString("en", {month: "long"})} ${date.getDate()}, ${date.getFullYear()}</span>
            </div>`;
}

export default movieCardTemplate;