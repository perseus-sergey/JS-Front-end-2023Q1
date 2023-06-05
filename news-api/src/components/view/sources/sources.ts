import { Articles } from '../../types';
import './sources.css';

class Sources {
    public draw(data: Articles[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Articles["source"]) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            sourceItemName.textContent = item.name;

            const dataSourceId = sourceClone.querySelector('.source__item') as HTMLElement;
            dataSourceId.setAttribute('data-source-id', item.id || '');

            fragment.append(sourceClone);
        });

        const sourcesEl = document.querySelector('.sources');
        if(sourcesEl) sourcesEl.append(fragment);
    }
}

export default Sources;
