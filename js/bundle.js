/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/api.js":
/*!***************************!*\
  !*** ./js/modules/api.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// POST

showThanksModal = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");            

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/forms/spinner.svg',
    success: 'Спасибо, вы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

function post() {
    

    forms.forEach(item => {
        bindPostData(item);

    });

}

async function postData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: data
    });

    return await res.json();
}


function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
        form.insertAdjacentElement('afterend', statusMessage);

        // const request = new XMLHttpRequest();
        // request.open('POST', 'server.php');
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

    });
}

module.exports = post;

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

  // CLASSES

  class Menu {
    constructor(subtitle, descr, total, img, alt, classes) {
        this.subtitle = subtitle;
        this.descr = descr;
        this.total = total;
        this.img = img;
        this.alt = alt;
        this.classes = classes;
    }
    GetDiv() {
        return `
        <img src=${this.img} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
        </div>`;
    }
}



async function GetMenu(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch data ${url}, status ${res.status}`);
    }
    return await res.json();
}

function cards() {

const MenuContainer = document.querySelector(".menu__field").firstElementChild;
GetMenu('http://localhost:3000/menu')
    .then(data => {
        data.forEach(element => {
            const div = document.createElement('div');
            let menuI = new Menu(element.title, element.descr, element.price, element.img, element.altimg, element.classes);
            div.innerHTML = menuI.GetDiv();
            if (menuI.classes == undefined) {
                menuI.classes = ['menu__item'];
            }
            menuI.classes.forEach(className => div.classList.add(className));
            MenuContainer.append(div);
        })
    })
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

// MODAL


function modalinit(task = '') {

    console.log('modal ' + task);

    const ModalDiv = document.querySelector('.modal');
    const ModalTimerId = setTimeout(ModalShow, 60000);


    const ModalBtn = document.querySelectorAll('[data-modal]');
    const ModalClose = document.querySelector('.modal__close');

    if (task === 'show') {
        ModalShow();
        return;
    } else if (task === 'hide') {
        ModalHide();
        return;
    };


    ModalBtn.forEach((item, i) => {
        item.addEventListener("click", () => {
            ModalShow();
        });
    });

    ModalClose.addEventListener("click", () => {
        ModalHide();
    });

    ModalDiv.addEventListener("click", (event) => {
        if (event.target === ModalDiv || event.target.getAttribute('data-close') == "") {
            ModalHide();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && ModalDiv.classList.contains('show')) {
            ModalHide();
        }
    });

    window.addEventListener('scroll', ModalShowScroll);

    function ModalShowScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            ModalShow();
            window.removeEventListener('scroll', ModalShowScroll);
        }
    }

    function ModalHide() {
        ModalDiv.classList.add('hide');
        ModalDiv.classList.remove('show');
        document.body.style.overflow = '';
    }


    function ModalShow() {
        console.log('show');
        ModalDiv.classList.add('show');
        ModalDiv.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(ModalTimerId);
    }


};

function showThanksModal(message) {
    if (message == null) {
        return;
    }; 

    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    console.trace();
    modal('show');

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
       <div class="modal__content">
           <div class="modal__close" data-close>×</div>
           <div class="modal__title">${message}</div>
       </div>
   `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        modal('hide');
    }, 4000);
}

module.exports = showThanksModal;
module.exports = modalinit;






/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {



// SLIDER



function sliders() {

    let offset = 0;
    let slideIndex = 1;
    const dots = [];
    
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
    
    
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');
    

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.1s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');




    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    };

    next.addEventListener('click', () => {

        if (offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }



        dotOpacity(slideIndex);
    });


    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        dotOpacity(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dotOpacity(slideIndex);
        });
    });
    function dotOpacity(slideIndex) {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach((dot) => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    }
}



module.exports = sliders;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

// TABS
function tabs() {

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsMenuItem = document.querySelectorAll('.tabheader__item'),
        tabsMenu = document.querySelector('.tabheader__items');

    function hideTabs() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }

    function showTabs(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
    }

    tabsMenu.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabsMenuItem.forEach((item, i) => {
                item.classList.remove('tabheader__item_active');
                if (item == target) {
                    hideTabs();
                    showTabs(i);
                    item.classList.add('tabheader__item_active');
                }
            });
        }
    });

    hideTabs();
    showTabs();

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

//TIMERS


function timer() {

    const deadLine = Date.parse('2023-01-01T00:00:00.000+06:00');
    countTime(deadLine);
};

function countTime(deadLine) {
    settime();

    let st = setInterval(settime, 1000);

    function settime() {

        const t = deadLine - new Date();
        const fullTime = {
            't': t,
            'days': Math.floor(t / (1000 * 60 * 60 * 24)),
            'hours': Math.floor(t / (1000 * 60 * 60) % 24),
            'minutes': Math.floor(t / (1000 * 60) % 60),
            'seconds': Math.floor(t / (1000) % 60)
        };

        let days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');

        days.innerHTML = getZero(fullTime.days);
        hours.innerHTML = getZero(fullTime.hours);
        minutes.innerHTML = getZero(fullTime.minutes);
        seconds.innerHTML = getZero(fullTime.seconds);

        if (t >= deadLine) {
            clearInterval(st);
        }

    }

}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

module.exports = timer;



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {

    const   tabs = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js"),
            cards = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js"),  
            modalinit = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js"),
            //showThanksModal = require('./modules/modal.js'),            
            timer = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js"),
            post = __webpack_require__(/*! ./modules/api.js */ "./js/modules/api.js"),
            sliders = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js"),
            calc = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");

   tabs();
   cards();
   modalinit();
   timer();
   post();
   sliders();
   calc();         
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map