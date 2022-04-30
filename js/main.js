window.addEventListener('DOMContentLoaded', () => {

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabcontainer'),
        tabsItem = document.querySelectorAll('.tabheader__item');

    function hideTab() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade')
        })
        tabsItem.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTab(i) {
        tabsContent[i].classList.add('show', 'fade');
        tabsItem[i].classList.add('tabheader__item_active')
    }
    hideTab();
    showTab(i = 0)

    tabsParent.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabsItem.forEach((item, i) => {
                if (item == target) {
                    hideTab();
                    showTab(i)
                }
            })
        }
    })
})
////////////////////timer///////////////////////

const deadline = '2022-07-30';

function calcTime(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 / 60) % 24),
            minutes = Math.floor(t / (1000 / 60) % 60),
            seconds = Math.floor(t / (1000) % 60)
    }
    return {
        'total': t,
        days,
        hours,
        minutes,
        seconds
    }
}
calcTime(deadline)


function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

function setTime(selector, endtime) {
    let timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);


    function updateClock() {
        const t = calcTime(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval)
        }
    }

}
setTime('.timer', deadline)

/////////modal/////////////////////
const modalTrogger = document.querySelectorAll('.js-button-modul'),
    modal = document.querySelector('.modal'),
    modalCloseBTN = document.querySelectorAll('.modal__close');

function openModal() {
    modal.classList.toggle('open');
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = ''
}

modalTrogger.forEach(button => {
    button.addEventListener('click', function (e) {
        openModal()
    })
})

modalCloseBTN.forEach(button => {
    button.addEventListener('click', function (e) {
        closeModal()
    })
})

modal.addEventListener('click', function (e) {
    const target = e.target;
    if (target === modal) {
        closeModal()
    }
})
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('open')) {
        closeModal()
    }
})

function showModalByScroll() {
    if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll)
    }
}
window.addEventListener('scroll', showModalByScroll)

// setTimeout(openModal, 5000);

// let input = document.querySelectorAll('.order__input');
// const observer = new MutationObserver(MutationRecord => {
//     console.log(MutationRecord)
// })
// observer.observe(input, {
//     subtree: true
// })

///////////классы////////////////////
const menuField = document.querySelector('.menu__field')
class MenuItem {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector)
        this.transfer = 70;
        this.changeToRub()
    }
    changeToRub() {
        this.price = this.price * this.transfer
    }
    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.classes = 'menu__item'
            element.classList.add(this.classes)
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`

        this.parent.append(element)
    }
}
new MenuItem(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container",
    "menu__item"
).render();

new MenuItem(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container",
    "menu__item",
    "big"
).render();

new MenuItem(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container",
    "menu__item"
).render();

///////slider -1 ////////

const slides = document.querySelectorAll('.offer__slide'),
    next = document.querySelector('.offer__slider-next'),
    prew = document.querySelector('.offer__slider-prev'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total');
let slideIndex = 1;


// if (slides.length < 10) {
//     current.textContent = `0${slides.length}`
// } else {
//     current.textContent = slides.length;
// }

// function showSlides(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }
//     if (n < 1) {
//         slideIndex = slides.length;

//     }
//     slides.forEach(slide => slide.style.display = 'none');
//     slides[slideIndex - 1].style.display = 'block';

//     if (slideIndex < 10) {
//         current.textContent = `0${slideIndex}`
//     } else {
//         current.textContent = slideIndex
//     }
// }

// function slidesPlus(n) {
//     showSlides(slideIndex += n)
// }

// showSlides(slideIndex)
// next.addEventListener('click', function () {
//     slidesPlus(1)
// })
// prew.addEventListener('click', function () {
//     slidesPlus(-1)
// })

///////////////////////slider-carousel////////////////
const wrapper = document.querySelector('.offer__slider-wrapper'),
    slideTrack = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(wrapper).width;
let widthNumber = +width.slice(0, width.length - 2)
let offset = 0;



wrapper.style.overflow = 'hidden';
slides.forEach(slide => slide.style.width = width);
slideTrack.style.cssText = 'display:flex';
slideTrack.style.width = width.slice(0, width.length - 2) * slides.length + 'px';;
slideTrack.style.transition = 'transform .3s';

next.addEventListener('click', () => {
    if (offset == widthNumber * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += widthNumber;
    }
    console.log(offset)
    slideTrack.style.transform = `translateX(-${offset}px)`;

})
prew.addEventListener('click', () => {
    if (offset == 0) {
        offset = widthNumber * (slides.length - 1);
    } else {
        offset -= widthNumber;
    }
    console.log(offset)
    slideTrack.style.transform = `translateX(-${offset}px)`
})