    // MODAL

function modal() {

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

};


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

    function ModalShowScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            ModalShow();
            window.removeEventListener('scroll', ModalShowScroll);
        }
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

module.exports = modal;
module.exports = showThanksModal;

