import './sass/main.scss';
import './fonts/fonts.scss';
import './assets/images/start-screen-puppy.png';
import './assets/images/donation-dog.png';
import './assets/images/footer-puppy.png';
import './assets/images/shelter_dog_cat.png';
import './assets/images/footer-gradient-background.png';
import './assets/images/start-screen-background.jpg';
import './assets/images/linner-nois.png';
import './assets/images/pets-slider/charly.png';
import './assets/images/pets-slider/freddie.png';
import './assets/images/pets-slider/jennifer.png';
import './assets/images/pets-slider/katrine.png';
import './assets/images/pets-slider/scarlett.png';
import './assets/images/pets-slider/sophia.png';
import './assets/images/pets-slider/timmy.png';
import './assets/images/pets-slider/woody.png';
import './assets/images/modal/modal_charly.png';
import './assets/images/modal/modal_freddie.png';
import './assets/images/modal/modal_jennifer.png';
import './assets/images/modal/modal_katrine.png';
import './assets/images/modal/modal_scarlett.png';
import './assets/images/modal/modal_sophia.png';
import './assets/images/modal/modal_timmy.png';
import './assets/images/modal/modal_woody.png';
import './assets/images/pets-slider/pets-charly.png';
import './assets/images/pets-slider/pets-jennifer.png';
import './assets/images/pets-slider/pets-katrine-1.png';
import './assets/images/pets-slider/pets-katrine-2.png';
import './assets/images/pets-slider/pets-katrine.png';
import './assets/images/pets-slider/pets-scarlet.png';
import './assets/images/pets-slider/pets-timmy.png';
import './assets/images/pets-slider/pets-woody.png';
import './assets/images/svg/bowls-and-cups.svg';
import './assets/images/svg/medicines.svg';
import './assets/images/svg/collars-or-leashes.svg';
import './assets/images/svg/shampoos.svg';
import './assets/images/svg/sleeping-area.svg';
import './assets/images/svg/toys.svg';
import './assets/images/svg/transportation.svg';
import './assets/images/svg/Vector.svg';
import './assets/images/svg/vitamins.svg';
import './assets/images/svg/phone.svg';
import './assets/images/svg/mail.svg';
import './assets/images/svg/pin.svg';
import './assets/images/svg/credit-card.svg';
import './assets/images/svg/modal_close_btn.svg';

const pets = [
    {
        "name": "Katrine",
        "img": "./assets/images/modal_katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Jennifer",
        "img": "./assets/images/modal_jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "./assets/images/modal_woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "./assets/images/modal_sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "./assets/images/modal_timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "./assets/images/modal_charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    },
    {
        "name": "Scarlett",
        "img": "./assets/images/modal_scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "./assets/images/modal_freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    }
];

// import './js/imports';
// import './js/Card';
// import './js/Modal';
import { Card } from './js/Card';
import { Modal } from './js/Modal';
// import { MenuBurger } from './js/MenuBurger';

window.onload = function () {
    if (pets) {
        renderSliderToDom();
        addCardClickHandler();
        menuBtnHandler();
    }
}
// ============== SLIDER card ======== start ====

const renderSliderToDom = () => {
    const slider = document.querySelector('.slider');
    let petsPage = false;
    if (slider.classList.contains('slider-pets')) petsPage = true;
    slider.innerHTML = '';
    pets.forEach(dog => slider.append(new Card(dog.name, dog.img, petsPage).generateCard()));
}


const addCardClickHandler = () => {
    document.querySelector('.slider').addEventListener('click', (e) => {
        if (e.target.closest('.card')) {
            let cardId = e.target.closest('.card').dataset.name;
            let cardData = getArrData(cardId);

            renderCardModal(cardData);
        }
    })
}
// ______________ SLIDER card ______ end _______

// ============== Card MODAL ======== start ====

const getArrData = (name) => {
    return pets.find(pet => pet.name === name);
}
const renderCardModal = (oPet) => {
    new Modal(oPet).openModal();
}
// ______________ Card MODAL ______ end _______

// ============== Burger Menu ======== start ====

const menuBtnHandler = () => {
    let menuBtn = document.querySelector('.menu-btn');
    menuBtn.addEventListener('click', toggleBurgerMenu);
}

const toggleBurgerMenu = () => {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.menu');

    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('active-menu');
    toggleMenuOverlay();
}

const toggleMenuOverlay = () => {
    let menuOverlay = document.querySelector('.menu-overlay');
    let menu = document.querySelector('.menu.active');

    if (menuOverlay) {
        menuOverlay.removeEventListener('click', toggleBurgerMenu);
        menu && menu.removeEventListener('click', menuClicked);
        menuOverlay.remove();
    } else {
        menuOverlay = document.createElement('div');
        menuOverlay.classList.add('menu-overlay');
        menuOverlay.addEventListener('click', toggleBurgerMenu);
        document.body.prepend(menuOverlay);

        menu && menu.addEventListener('click', menuClicked);
    }
}
const menuClicked = (e) => {
    console.log(e.target);
    if (
        e.target.closest('.menu-btn') ||
        e.target.closest('.a-menu')
    ) {
        toggleBurgerMenu();
    }
}
// ______________ Burger Menu ______ end _______
