"use strict";

let numberOfFilms = +(prompt('Сколько фильмов вы посмотрели?',''));
let personalMovieDB = {};

if  (isNaN(numberOfFilms) || numberOfFilms==0) {
    alert("Это не число, повторите ввод");
    numberOfFilms = +(prompt('Сколько фильмов вы посмотрели?',''));
} else {
    personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: {},
        privat: false,
    };
}

//  console.log(personalMovieDB);

let lastFilm = prompt('Один из последних просмотренных фильмов?','');
let lastRating = +(prompt('Насколько его оцените?'));
let movies = {};

if  (isNaN(lastRating) || lastRating==0 ) {
    alert('Это не число, повторите ввод');
    lastRating = +(prompt('Насколько его оцените?'));
} else {
    movies[lastFilm] = String(lastRating);
    personalMovieDB.movies = movies;
}

lastFilm = prompt('Один из последних просмотренных фильмов?','');
lastRating = +(prompt('Насколько его оцените?'));

if  (isNaN(lastRating) || lastRating==0 ) {
    alert('Это не число, повторите ввод');
    lastRating = +(prompt('Насколько его оцените?'));
} else {
    movies[lastFilm] = String(lastRating);
    personalMovieDB.movies = movies;
}



console.log(personalMovieDB);


