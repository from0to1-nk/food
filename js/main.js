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