import { Articles, Category, Source } from '../../types';
import './sources.css';

class Sources {
    public draw(data: Articles[]): void {
        // this.drawCategories();
        this.drawSources(data);
    }

    private drawSources(data: Articles[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            sourceItemName.textContent = item.name;

            const dataSourceId = sourceClone.querySelector('.source__item') as HTMLElement;
            dataSourceId.setAttribute('data-source-id', item.id || '');

            fragment.append(sourceClone);
        });
        const sourcesEl = document.querySelector('.sources');

        if (sourcesEl) {
            sourcesEl.innerHTML = '';
            sourcesEl.append(fragment);
        }
    }

    public drawCategories(): void {
        const catFragment = document.createDocumentFragment();
        const categoryItemTemp = document.querySelector('#categoryItemTemp') as HTMLTemplateElement;

        const catArr = Object.values(Category);
        console.log('catArr = ', catArr);
        catArr.forEach((item: string) => {
            const sourceClone = categoryItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemName = sourceClone.querySelector('.category__item-name') as HTMLElement;
            sourceItemName.textContent = item.toUpperCase();

            const dataSourceId = sourceClone.querySelector('.category__item') as HTMLElement;
            dataSourceId.setAttribute('data-source-id', item || '');

            catFragment.append(sourceClone);
        });
        const catEl = document.querySelector('.categories');
        if (catEl) {
            // catEl.innerHTML = '';
            catEl.append(catFragment);
        }
    }
}

export default Sources;
