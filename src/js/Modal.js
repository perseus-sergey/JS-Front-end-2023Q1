export class Modal {

    constructor(oPet, petsPage = false) {
        this.name = oPet.name;
        this.imgPath = oPet.img;
        this.type = oPet.type;
        this.breed = oPet.breed;
        this.descriptioin = oPet.description;
        this.age = oPet.age;
        this.inoculations = oPet.inoculations;
        this.diseases = oPet.diseases;
        this.parasites = oPet.parasites;
        this.petsPage = petsPage;
        this.buildModal();
    }

    // Modal window generator

    buildModal() {
        this.closeBtn = '';
        this.overlay = this.generateOverlay();
        document.body.classList.toggle('active-menu');

        this.closeBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
    }

    generateOverlay() {

        let overlay = Modal.generateDomElement('div', '', 'overlay')
        let modalWind = Modal.generateDomElement('div', '', 'modal-wind')
        let petImg = Modal.generateDomElement('img', '', 'pet-img');
        petImg.alt = `Pet ${this.type} - ${this.name}`;
        let dot = this.petsPage ? '.' : '';
        petImg.src = dot + `./assets/images/modal_${this.name.toLowerCase()}.png`;

        let content = Modal.generateDomElement('div', '', 'content');

        let title = Modal.generateDomElement('div', '', 'title');
        title.append(Modal.generateDomElement('h2', this.name));
        title.append(Modal.generateDomElement('h3', `${this.type} - ${this.breed}`));
        // let h4Descr = Modal.generateDomElement('h4', this.descriptioin);

        let ul = Modal.generateDomElement('ul');
        ul.append(this.generateLiInside('Age', this.age));
        ul.append(this.generateLiInside('Inoculations', this.inoculations));
        ul.append(this.generateLiInside('Diseases', this.diseases));
        ul.append(this.generateLiInside('Parasives', this.parasites));

        content.append(title);
        content.append(Modal.generateDomElement('h4', this.descriptioin));
        content.append(ul);

        this.closeBtn = Modal.generateDomElement('div', '', 'close-btn');
        this.closeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
        </svg>`;

        modalWind.append(petImg);
        modalWind.append(content);
        modalWind.append(this.closeBtn);

        overlay.append(modalWind);

        return overlay;
    }

    openModal () {
        document.body.append(this.overlay);
    }
    closeModal (event) {
        if (!document.querySelector('.overlay')) return;
        if (!event.target.closest('.content') && !event.target.closest('.pet-img')) {
            document.querySelector('.overlay').remove();
            document.body.classList.remove('active-menu');
        }
    }

    generateLiInside (title, text) {
        let li = Modal.generateDomElement('li');
        li.append(Modal.generateDomElement('b', `${title}: `));
        li.append(Modal.generateDomElement('span', text))
        return li;
    }

    static generateDomElement(tag, text = '', ...classes) {
        let element = document.createElement(tag);
        if (classes.length) element.classList.add(...classes);
        element.textContent = text;
        return element;
    }
}