export class Card {
    constructor(name, imgPath, petsPage = false) {
        this.name = name;
        this.imgPath = imgPath;
        this.petsPage = petsPage;
    }

    // Article generator

    generateCard() {
        let card = this.generateDomElement('div', '', 'card');
        if (this.petsPage) card.classList.add(this.name.toLowerCase());
        let btnSec = this.generateDomElement('div', '', 'button_secondary');
        let btnPrim = this.generateDomElement('div', '', 'button_primary');
        let btn = this.generateDomElement('button', 'Learn more', 'more');
        let petName = this.generateDomElement('div', this.name, 'pet_name');
        let img = this.generateDomElement('img');
        img.alt = this.name;
        // img.src = this.imgPath;
        let dot = this.petsPage ? '.' : '';
        img.src = dot + `./assets/images/${this.name.toLowerCase()}.png`;
        btnPrim.append(btn);
        btnSec.append(btnPrim);
        card.append(btnSec);
        card.append(petName);
        card.append(img);
        card.dataset.name = this.name;
        return card;
    }

    generateDomElement(tag, text = '', ...classes) {
        let element = document.createElement(tag);
        classes && element.classList.add(...classes);
        element.textContent = text;
        return element;
    }
}