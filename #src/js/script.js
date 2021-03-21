const burger = document.querySelector('.burger');


function init() {
    burger.addEventListener('click', toggleMenu);
}

function toggleMenu() {
    const menu = document.querySelector('.menu');
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock')
}

init();