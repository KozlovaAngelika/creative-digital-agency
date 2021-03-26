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

//slider
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


//last works

const categories = [{
        name: 'Web Design',
        gridType: 'grid-type-1',
        imgsSrc: ['./media//works/web-design/item-1.jpg', './media//works/web-design/item-2.jpg', './media//works/web-design/item-3.jpg', './media//works/web-design/item-4.jpg', './media//works/web-design/item-5.jpg', './media//works/web-design/item-6.jpg', './media//works/web-design/item-7.jpg']
    },
    {
        name: 'Graphic Design',
        gridType: 'grid-type-2',
        imgsSrc: ['./media//works/graphic-design/item-1.jpg', './media//works/graphic-design/item-2.jpg', './media//works/graphic-design/item-3.jpg', './media//works/graphic-design/item-4.jpg', './media//works/graphic-design/item-5.jpg', './media//works/graphic-design/item-6.jpg', './media//works/graphic-design/item-7.jpg']
    },
    {
        name: 'Apps Design',
        gridType: 'grid-type-3',
        imgsSrc: ['./media//works/apps-design/item-1.jpg', './media//works/apps-design/item-2.jpg', './media//works/apps-design/item-3.jpg', './media//works/apps-design/item-4.jpg', './media//works/apps-design/item-5.jpg', './media//works/apps-design/item-6.jpg', './media//works/apps-design/item-7.jpg']
    }, {
        name: 'Development',
        gridType: 'grid-type-4',
        imgsSrc: ['./media//works/development/item-1.jpg', './media//works/development/item-2.jpg', './media//works/development/item-3.jpg', './media//works/development/item-4.jpg', './media//works/development/item-5.jpg', './media//works/development/item-6.jpg', './media//works/development/item-7.jpg']
    }
]
const wrapperWorks = document.querySelector('.last-works');
const worksMenu = document.querySelector('.last-works .control-panel .works-menu');

function zoomImg(e) {
    if (e.target.classList.contains('zoom-btn')) {
        e.currentTarget.classList.toggle('zoom');
        document.querySelector('body').classList.toggle('lock');
    }
}

function initWorksMenu() {

    categories.forEach(category => {
        const liHTML = document.createElement('li');
        liHTML.innerText = category.name;
        worksMenu.append(liHTML);
        liHTML.addEventListener('click', function(e) {
            e.target.parentNode.querySelectorAll('li').forEach(elem => elem.classList.remove('active'));
            e.target.classList.add('active');
            createItems(category)
        });
    });
    if (worksMenu.firstChild) {
        worksMenu.firstChild.classList.add('active');
    }
    const divHTML = document.createElement('div');
    wrapperWorks.append(divHTML);
    divHTML.classList.add('works');
    createItems(categories[0]);
}

function createItems(category) {
    const worksHTML = wrapperWorks.querySelector('.works');
    worksHTML.innerHTML = '';
    worksHTML.className = `${category.gridType} works`
    category.imgsSrc.forEach(elem => {
        const itemHTML = document.createElement('div');
        itemHTML.addEventListener('click', function(e) { zoomImg(e) });
        const itemHover = document.createElement('div');
        const itemHoverContent = document.createElement('div');
        const imgHTML = document.createElement('img');
        const title = document.createElement('h3');
        const zoomBtn = document.createElement('div');
        const span = document.createElement('span');
        itemHTML.classList.add('item');
        itemHTML.classList.add(`item-${category.imgsSrc.indexOf(elem)+1}`);
        worksHTML.appendChild(itemHTML);
        imgHTML.src = elem;
        itemHTML.appendChild(imgHTML);
        itemHover.classList.add('item-hover');
        itemHTML.appendChild(itemHover);
        itemHoverContent.classList.add('content');
        itemHover.appendChild(itemHoverContent);
        title.innerText = 'Our Works';
        itemHoverContent.appendChild(title);
        zoomBtn.classList.add('zoom-btn');
        itemHoverContent.appendChild(zoomBtn);
        span.innerText = category.name;
        itemHoverContent.appendChild(span);
    })
}
init();
initWorksMenu();