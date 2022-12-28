'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const   tabs = require('./modules/tabs.js'),
            cards = require('./modules/cards.js'),  
            modal = require('./modules/modal.js'),
            timer = require('./modules/timer.js'),
            post = require('./modules/api.js'),
            sliders = require('./modules/slider.js'),
            calc = require('./modules/calc.js');

   tabs();
   cards();
   modal();
   timer();
   post();
   sliders();
   calc();         
});