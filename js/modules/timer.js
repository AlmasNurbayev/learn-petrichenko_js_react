//TIMERS
'use strict';

function timer(deadLine1) {

    const deadLine = Date.parse(deadLine1);
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

export default timer;

