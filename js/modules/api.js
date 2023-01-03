// POST
'use strict';

import {showThanksModal} from './modal.js';            



function post(formText) {
    //console.log(formText);
    const forms = document.querySelectorAll(formText);
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    //console.log(forms);
    forms.forEach(item => {
        bindPostData(item, message);

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


function bindPostData(form, message) {
    //console.log(message);
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
                //console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

    });
}

export default post;