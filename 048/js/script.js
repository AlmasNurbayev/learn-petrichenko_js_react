window.addEventListener('DOMContentLoaded', () => {
    
    'use strict';


    // TABS
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsMenuItem = document.querySelectorAll('.tabheader__item'),
          tabsMenu = document.querySelector('.tabheader__items');   

    function hideTabs() {
        tabsContent.forEach ((item) =>{
            item.classList.add('hide'); 
            item.classList.remove('show'); 
        });
    }    

    function showTabs(i = 0) {
        tabsContent[i].classList.remove('hide'); 
        tabsContent[i].classList.add('show', 'fade'); 
    }

    tabsMenu.addEventListener("click", (event)=>{
        const target = event.target; 
        if (target && target.classList.contains("tabheader__item")) {
            tabsMenuItem.forEach((item,i)=> {
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
              'days': Math.floor( t / (1000*60*60*24)),
              'hours': Math.floor( t / (1000*60*60) % 24),
              'minutes': Math.floor( t / (1000*60) % 60),
              'seconds': Math.floor( t / (1000) % 60)
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
        if (num>=0 && num < 10) {
            return '0'+num;
        } else {
            return num;
        }
    }

    countTime(deadLine);
   
    // MODAL

    const ModalBtn = document.querySelectorAll('[data-modal]');
    const ModalDiv = document.querySelector('.modal');
    const ModalClose = document.querySelector('.modal__close');
    
    ModalBtn.forEach ((item,i)=> {
        item.addEventListener("click", ()=>{    
            ModalShow();
        });    
    }); 

    ModalClose.addEventListener("click", ()=>{    
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
    
    ModalDiv.addEventListener("click", (event)=>{
        if (event.target === ModalDiv) {
            ModalHide();      
        }
    });
    
    document.addEventListener('keydown', (event)=> {
        if (event.code === 'Escape' && ModalDiv.classList.contains('show')) {
            ModalHide();  
        }
    });
     
   const ModalTimerId = setTimeout(ModalShow, 8000);
   
   function ModalShowScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            ModalShow();
            window.removeEventListener('scroll', ModalShow);
        }
   }

   window.addEventListener('scroll', ModalShowScroll);

   const MenuContainer = document.querySelector(".menu__field").firstElementChild;
   console.log(MenuContainer);

   class Menu {
        constructor (subtitle, descr, total, img, alt) {
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.img = img;
            this.alt = alt;
        }
        GetDiv() {
            return `<div class="menu__item">
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
            </div>
        </div>`;     
        }
   }

   const MenuArr = [
    {
        subtitle: 'Меню "Фитнес"',
        descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        total : 229,
        img : "img/tabs/vegy.jpg",
        alt : "vegy"       
    }, {
        subtitle: 'Меню “Премиум”',
        descr : 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        total : 550,
        img : 'img/tabs/elite.jpg',
        alt : 'elite'     
    }, {
        subtitle: 'Меню "Постное"',
        descr : 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        total : 430,
        img : "img/tabs/post.jpg",
        alt : "post"    
    }
   ];
   
   MenuArr.forEach(element => {
    MenuContainer.insertAdjacentHTML("afterbegin",  
    new Menu(element.subtitle, element.descr, element.total, element.img, element.alt).GetDiv());
   });



});