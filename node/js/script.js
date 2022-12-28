'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const   tabs = require('js/modules/tabs'),
            cards = require('js/modules/cards'),  
            modal = require('js/modules/modal.js'),
            timer = require('js/modules/timer.js'),
            post = require('js/modules/api.js'),
            slider = require('js/modules/slider.js'),
            calc = require('js/modules/calc.js');

   tabs();
   cards();
   modal();
   timer();
   post();
   slider();
   calc();         
});