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

   
});