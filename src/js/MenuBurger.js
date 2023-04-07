export class MenuBurger {

    // constructor() {

    //     this.menuBtn = document.querySelector('.menu-btn');
    //     this.menu = document.querySelector('.menu');
    //     this.menuOverlay = document.querySelector('.menu-overlay');
    //     this.burgerToggleHandler();
    // }

    // menuBtnHandler() {
    //     let menuBtn = document.querySelector('.menu-btn');
    //     if (menuBtn) {
    //         menuBtn.addEventListener('click', this.toggleBurgerMenu, false);

    //     }
    // }

    // toggleBurgerMenu() {
    //     let menuBtn = document.querySelector('.menu-btn');
    //     let menu = document.querySelector('.menu');

    //     menuBtn.classList.toggle('active');
    //     menu.classList.toggle('active');
    //     document.body.classList.toggle('active-menu');
    //     this.toggleMenuOverlay();
    // }

    // toggleMenuOverlay() {
    //     let menuOverlay = document.querySelector('.menu-overlay');
    //     if (menuOverlay) {
    //         menuOverlay.remove();
    //     } else {
    //         let menuOverlay = document.createElement('div');
    //         menuOverlay.classList.add('menu-overlay');
    //         menuOverlay.addEventListener('click', this.toggleBurgerMenu, false);
    //         document.body.prepend(menuOverlay);

    //         let menu = document.querySelector('.menu.active');
    //         menu.addEventListener('click', function (e) {
    //             if (
    //                 e.target.closest('.menu-btn') ||
    //                 e.target.closest('.p-menu')
    //             ) {
    //                 this.toggleBurgerMenu();
    //             }
    //         });
    //     }
    // }

}