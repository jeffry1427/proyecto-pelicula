
let movies = [
    { title: "Inception", year: 2010, poster: "https://example.com/inception.jpg" },
    { title: "The Matrix", year: 1999, poster: "https://example.com/matrix.jpg" }
];

const addMovieForm = document.getElementById('addMovieForm');
const movieList = document.getElementById('movieList');
const yearFilter = document.getElementById('yearFilter');
const sortMovies = document.getElementById('sortMovies');
const themeToggle = document.getElementById('themeToggle');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalPoster = document.getElementById('modalPoster');
const closeModal = document.getElementById('closeModal');

function displayMovies(movies) {
    movieList.innerHTML = ''; 

    movies.forEach((movie, index) => {
        
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
            <button class="delete-btn" onclick="deleteMovie(${index})">Eliminar</button>
            <button class="favorite-btn" onclick="markAsFavorite(${index})">★</button>
        `;

    
        movieCard.addEventListener('click', () => showModal(movie));
        movieList.appendChild(movieCard);
    });
}

function showModal(movie) {
    modalTitle.textContent = movie.title;
    modalYear.textContent = `Año: ${movie.year}`;
    modalPoster.src = movie.poster;
    modal.classList.remove('hidden'); 
}

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

addMovieForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const title = document.getElementById('movieTitle').value;
    const year = document.getElementById('movieYear').value;
    const poster = document.getElementById('moviePoster').value;

    if (title && year && poster) {
        
        movies.push({ title, year, poster });
        displayMovies(movies); 
        saveMovies(); 
        addMovieForm.reset(); 
    }
});

yearFilter.addEventListener('input', (e) => {
    const year = e.target.value;
    const filteredMovies = movies.filter(movie => movie.year == year);
    displayMovies(filteredMovies);
});

sortMovies.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const sortedMovies = [...movies].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'year') {
            return a.year - b.year;
        }
    });
    displayMovies(sortedMovies);
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') 
        ? 'Cambiar a modo claro' 
        : 'Cambiar a modo oscuro';
});

function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

document.addEventListener('DOMContentLoaded', () => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
        movies = storedMovies;
    }
    displayMovies(movies); 
});

function deleteMovie(index) {
    movies.splice(index, 1); 
    displayMovies(movies); 
    saveMovies(); 
}

function markAsFavorite(index) {
    alert(`${movies[index].title} marcada como favorita.`);
}
