'use strict';

import tabs from './modules/tabs.js';
import cards from './modules/cards.js';  
import timer from './modules/timer.js';
import post from './modules/api.js';
import sliders from './modules/slider.js';
import calc from './modules/calc.js';
import modalinit from '../js/modules/modal.js';



window.addEventListener('DOMContentLoaded', () => {


   tabs();
   cards();
   modalinit();
   timer();
   post();
   sliders();
   calc();         
});