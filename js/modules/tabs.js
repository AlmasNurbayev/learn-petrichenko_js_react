// TABS
function tabs() {

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsMenuItem = document.querySelectorAll('.tabheader__item'),
        tabsMenu = document.querySelector('.tabheader__items');

    function hideTabs() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }

    function showTabs(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
    }

    tabsMenu.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabsMenuItem.forEach((item, i) => {
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

}

module.exports = tabs;