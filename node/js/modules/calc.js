// calc 
const result = document.querySelector('.calculating__result span');
let sex, height, weight, age, ratio;

function calc() {

readCalcStorage();
calcTotal();

const calcElements1 = document.querySelectorAll('#female, #male');
calcElements1.forEach(element => {
    if (element.classList.contains('calculating__choose-item_active')) {
        sex = element.getAttribute('id');
    };
    element.addEventListener('click', (e) => {
        calcElements1.forEach(element1 => {
            element1.classList.remove('calculating__choose-item_active');
        });
        element.classList.add('calculating__choose-item_active');
        let elementId = e.target.getAttribute('id');
        if (elementId == 'male' || elementId == 'female') {
            sex = elementId;
            localStorage.setItem('sex', elementId);
        };
        calcTotal();
    });
});

const calcElements2 = document.querySelectorAll('#height, #weight, #age');
calcElements2.forEach(element => {
    element.addEventListener('input', (e) => {
        if (element.value.match(/\D/g)) {
            element.style.border = '1px solid red';
        } else {
            element.style.border = 'none';
        };
        let elementId = e.target.getAttribute('id');
        if (elementId == 'height') { height = element.value; }
        if (elementId == 'weight') { weight = element.value; }
        if (elementId == 'age') { age = element.value; }
        calcTotal();
    });
});

const calcElements3 = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');
calcElements3.forEach(element => {
    if (element.classList.contains('calculating__choose-item_active')) {
        ratio = element.getAttribute('data-ratio');
    };
    element.addEventListener('click', (e) => {
        calcElements3.forEach(element1 => {
            element1.classList.remove('calculating__choose-item_active');
        });
        element.classList.add('calculating__choose-item_active');
        let elementId = e.target.getAttribute('data-ratio');
        ratio = elementId;
        localStorage.setItem('ratio', ratio);
        calcTotal();
    });
});
}

function readCalcStorage() {
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
        const calcElements3 = document.querySelectorAll('#female, #male');
        calcElements3.forEach(element => {
            element.classList.remove('calculating__choose-item_active');
            if (element.getAttribute('id') == sex) {
                element.classList.add('calculating__choose-item_active');
            };
        });
    };
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
        const calcElements4 = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');
        calcElements4.forEach(element => {
            element.classList.remove('calculating__choose-item_active');
            if (element.getAttribute('data-ratio') == ratio) {
                element.classList.add('calculating__choose-item_active');
            };
        });
    };
}

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    };
    if (sex == 'male') {
        result.textContent = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
    } else if (sex == 'female') {
        result.textContent = Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
    };
};

module.exports = calc;