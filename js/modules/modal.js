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




