"use strict";

let numberOfFilms;
let personalMovieDB = {};


do {
    numberOfFilms = +(prompt('Сколько фильмов вы посмотрели?', ''));
} while (!isNaN(numberOfFilms) || numberOfFilms == 0);

personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: {},
    privat: false,
}

alert('Теперь просим оценить каждый из них ' + numberOfFilms);

let movies = {};
let lastFilm;
let lastRating;

if (numberOfFilms > 0) {

    for (let i = 0; i < numberOfFilms; i++) {
        do {
            lastFilm = prompt('Один из последних просмотренных фильмов?', '');
        } while ((lastFilm == null) || (lastFilm.length < 1) || (lastFilm.length > 50));

        do {
            lastRating = +prompt('Насколько его оцените?', '');
        } while (isNaN(lastRating) || lastRating == 0);

        movies[lastFilm] = String(lastRating);
        personalMovieDB.movies = movies;
    }
}

if (personalMovieDB.count < 10) {
    alert("Довольно мало фильмов");
} else if (personalMovieDB.count < 30 && personalMovieDB.count >= 10) {
    alert("вы классический зритель");
} else if (personalMovieDB.count >= 30) {
    alert("вы киноман");
} else {
    alert("что-то пошло не так...(");
}

console.log(personalMovieDB);


