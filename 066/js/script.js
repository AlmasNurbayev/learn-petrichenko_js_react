window.addEventListener('DOMContentLoaded', () => {

    'use strict';


    // TABS
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

    //TIMERS

    const deadLine = Date.parse('2023-01-01T00:00:00.000+06:00');

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

    countTime(deadLine);

    // MODAL

    const ModalBtn = document.querySelectorAll('[data-modal]');
    const ModalDiv = document.querySelector('.modal');
    const ModalClose = document.querySelector('.modal__close');

    ModalBtn.forEach((item, i) => {
        item.addEventListener("click", () => {
            ModalShow();
        });
    });

    ModalClose.addEventListener("click", () => {
        ModalHide();
    });

    function ModalShow() {
        ModalDiv.classList.add('show');
        ModalDiv.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(ModalTimerId);
    }

    function ModalHide() {
        ModalDiv.classList.add('hide');
        ModalDiv.classList.remove('show');
        document.body.style.overflow = '';
    }

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

    const ModalTimerId = setTimeout(ModalShow, 60000);

    window.addEventListener('scroll', ModalShowScroll);

    function ModalShowScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            ModalShow();
            window.removeEventListener('scroll', ModalShowScroll);
        }
    }


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

    // POST
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо, вы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);

    });

    async function postData(url, data) {
        const res = await fetch('url', {
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

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        ModalShow();

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
            ModalHide();
        }, 4000);
    }

    // SLIDER

    let offset = 0;
    let slideIndex = 1;

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
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
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
    const dots = [];



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

    dots.forEach(dot =>{
        dot.addEventListener('click',(e)=> {
            const slideTo = e.target.getAttribute('data-slide-to'); 
            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dotOpacity(slideIndex);
        });
    });

    function dotOpacity(slideIndex) {
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }        
        dots.forEach((dot) =>{
            dot.style.opacity = '.5';
        });
        dots[slideIndex-1].style.opacity = '1';
    }

    // calc 
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function readCalcStorage() {
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
        const calcElements3 = document.querySelectorAll('#female, #male'); 
        calcElements3.forEach(element =>{
                element.classList.remove('calculating__choose-item_active');
                if (element.getAttribute('id') == sex) {
                element.classList.add('calculating__choose-item_active');
                };   
        });    
    };
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
        const calcElements4 = document.querySelectorAll('.calculating__choose_big .calculating__choose-item'); 
        calcElements4.forEach(element =>{
                element.classList.remove('calculating__choose-item_active');
                if (element.getAttribute('data-ratio') == ratio) {
                element.classList.add('calculating__choose-item_active');
                };   
        });        
    };
    }

    readCalcStorage();

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        };
        if (sex == 'male') {
            result.textContent = Math.round (ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
        } else if (sex == 'female') {
            result.textContent = Math.round (ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
        };
    };

    calcTotal();
    
    const calcElements1 = document.querySelectorAll('#female, #male'); 
    calcElements1.forEach(element =>{
        if (element.classList.contains('calculating__choose-item_active'))
        {
            sex = element.getAttribute('id');
        };
        element.addEventListener('click', (e) => {
            calcElements1.forEach(element1 =>{
                element1.classList.remove('calculating__choose-item_active');
            });    
            element.classList.add('calculating__choose-item_active');
            let elementId = e.target.getAttribute('id');
            if (elementId == 'male' || elementId == 'female') 
            {
                sex = elementId;
                localStorage.setItem('sex', elementId);
            };
            calcTotal();
        });    
    });     

    const calcElements2 = document.querySelectorAll('#height, #weight, #age'); 
    calcElements2.forEach(element =>{
        element.addEventListener('input', (e) => {
            if (element.value.match(/\D/g)) {
               element.style.border = '1px solid red';
            } else {
                element.style.border = 'none';
            };
            let elementId = e.target.getAttribute('id');
             if (elementId == 'height') {height = element.value; }
             if (elementId == 'weight') {weight = element.value;}
             if (elementId == 'age') {age = element.value; }
            calcTotal();
        });    
    });     

    const calcElements3 = document.querySelectorAll('.calculating__choose_big .calculating__choose-item'); 
    calcElements3.forEach(element =>{
        if (element.classList.contains('calculating__choose-item_active'))
        {
            ratio = element.getAttribute('data-ratio');
        };
        element.addEventListener('click', (e) => {
            calcElements3.forEach(element1 =>{
                element1.classList.remove('calculating__choose-item_active');
            });    
            element.classList.add('calculating__choose-item_active');
            let elementId = e.target.getAttribute('data-ratio');
            ratio = elementId;
            localStorage.setItem('ratio', ratio);
            calcTotal();
        });    
    });    

});