  // CLASSES

  class Menu {
    constructor(subtitle, descr, total, img, alt, classes) {
        this.subtitle = subtitle;
        this.descr = descr;
        this.total = total;
        this.img = img;
        this.alt = alt;
        this.classes = classes;
    }
    GetDiv() {
        return `
        <img src=${this.img} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
        </div>`;
    }
}



async function GetMenu(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch data ${url}, status ${res.status}`);
    }
    return await res.json();
}

function cards() {

const MenuContainer = document.querySelector(".menu__field").firstElementChild;
GetMenu('http://localhost:3000/menu')
    .then(data => {
        data.forEach(element => {
            const div = document.createElement('div');
            let menuI = new Menu(element.title, element.descr, element.price, element.img, element.altimg, element.classes);
            div.innerHTML = menuI.GetDiv();
            if (menuI.classes == undefined) {
                menuI.classes = ['menu__item'];
            }
            menuI.classes.forEach(className => div.classList.add(className));
            MenuContainer.append(div);
        })
    })
}

module.exports = cards;