const burger = document.querySelector('.burger');

function init() {
    burger.addEventListener('click', toggleMenu);
    sliderInit();
}

function toggleMenu() {
    const menu = document.querySelector('.menu');
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock')
}



//слайдер
const sliderHTML = document.querySelector('.slider');
const slidesHTML = document.querySelectorAll('.slider .slide');
const leftArrowHTML = document.querySelector('.wr-slider .slider-buttons .arrow-left');
const rightArrowHTML = document.querySelector('.wr-slider .slider-buttons .arrow-right');
let count = 0;
let width;

function sliderInit() {
    width = sliderHTML.offsetWidth;
}
sliderHTML.style.width = width * slidesHTML.length + '%';
slidesHTML.forEach(e => {
    e.style.width = width + '%'
})
window.addEventListener('resize', sliderInit);

function rollSliderLeft() {
    rightArrowHTML.disabled = false;
    if (count <= 1) {
        leftArrowHTML.disabled = true;
    } else {
        leftArrowHTML.disabled = false;
    }
    count--;
    sliderHTML.style.transform = `translate(-${count*100}%)`
}

function rollSliderRight() {
    if (count >= slidesHTML.length - 2) {
        rightArrowHTML.disabled = true;
    } else {
        rightArrowHTML.disabled = false;
    }
    leftArrowHTML.disabled = false;
    count++;
    sliderHTML.style.transform = `translate(-${count*100}%)`
}
leftArrowHTML.addEventListener('click', rollSliderLeft)
rightArrowHTML.addEventListener('click', rollSliderRight)
init();