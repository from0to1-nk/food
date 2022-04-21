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

const deadline = '2022-03-30';

function calcTime(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let dates = Math.floor(t / (1000 * 60 * 60 * 24)),
        hour = Math.floor(t / (1000 * 60 / 60) % 24),
        minutes = Math.floor(t / (1000 / 60) % 60),
        seconds = Math.floor(t / (1000) % 60)
    return {
        'total': t,
        dates,
        hour,
        minutes,
        seconds
    }
}
calcTime(deadline)

function setTime(selector) {
    let data = selector.querySelector(selector)
}

function sayHello(name) {
    return `'Привет, ${name}'`
}