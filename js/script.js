'use strict';

import tabs from './modules/tabs.js';
import cards from './modules/cards.js';  
import timer from './modules/timer.js';
import post from './modules/api.js';
import sliders from './modules/slider.js';
import calc from './modules/calc.js';
import modalinit from '../js/modules/modal.js';



window.addEventListener('DOMContentLoaded', () => {


   tabs('.tabcontent','.tabheader__item','.tabheader__items','tabheader__item_active');
   cards();
   modalinit();
   timer('2023-02-01T00:00:00.000+06:00');
   post('form');
   sliders();
   calc();         
});