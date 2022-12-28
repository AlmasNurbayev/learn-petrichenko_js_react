/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
            "Аноним"
        ]
    };


    const adv = document.querySelectorAll('.promo__adv');
    adv.forEach((item) => {
        item.remove();
    });

    const genre = document.querySelectorAll('.promo__genre');
    genre.forEach((item2) => {
        item2.textContent = "Драма";
    });

    const bg = document.querySelectorAll('.promo__bg');
    bg.forEach((item) => {
        //  item2.innerHTML = "Драма";
        item.style.backgroundImage = 'url("./img/bg.jpg")';
    });

    function UpdateList(database) {
        const list = document.querySelector('.promo__interactive-list');
        const li = document.querySelectorAll('.promo__interactive-item');

        li.forEach((item) => {
            item.remove();
            //      item2.innerHTML = (i+1) + '. ' + movieDB.movies[i];
        });

        database.sort();
        let i = 0;
        for (i = 0; i < database.length; i++) {
            let div = document.createElement('li');
            div.classList.add('promo__interactive-item');
            div.innerHTML = (i + 1) + '. ' + database[i];

            let divdel = document.createElement('div');
            divdel.classList.add('delete');
            div.appendChild(divdel);
            // console.log(div);
            list.append(div);
        }
        addEventDelete();
    }

    UpdateList(movieDB.movies);

    /* Задания на урок:
    
    1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    новый фильм добавляется в список. Страница не должна перезагружаться.
    Новый фильм должен добавляться в movieDB.movies.
    Для получения доступа к значению input - обращаемся к нему как input.value;
    P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    
    2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
    
    3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
    
    4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
    "Добавляем любимый фильм"
    
    5) Фильмы должны быть отсортированы по алфавиту */

    //const btn = document.querySelector('button');

    const filmForm = document.querySelector('form.add');
    const filmInput = document.querySelector('.adding__input');
    const filmCheck = document.querySelector('[type="checkbox"]');

    filmForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let text = filmInput.value;
        if (text != "") {
            movieDB.movies.push((text.length >= 20) ? (text.slice(0, 20) + "...") : text);
            UpdateList(movieDB.movies);
            if (filmCheck.checked == true) { console.log("Добавляем любимый фильм"); }
        } else {
            alert('Пустая строка!');
        }
        filmForm.reset();
    });

    function addEventDelete() {
        const deleteBin = document.querySelectorAll('.delete');
        deleteBin.forEach((item, i) => {
        console.log(item.parentElement.textContent);
        item.addEventListener("click", (event) => {
            event.preventDefault();
            // console.log(item.parentElement.textContent);
            // let text = item.parentElement.textContent;
            // text = text.slice(text.indexOf('. ')+2);
            // let finded = movieDB.movies.indexOf(text);
            // if (finded != -1) {
                movieDB.movies.splice(i ,1);
                UpdateList(movieDB.movies);
            //}
            console.log(movieDB.movies);
        });
    });
    }
    
    addEventDelete();

});