import { Endpoint, NewsJson } from '../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: (data: NewsJson) => void): void {
        super.getResp(
            {
                endpoint: Endpoint.ENDPOINT_SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: NewsJson) => void): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;
        console.log('target = ', target);
        console.log('currentTarget = ', newsContainer);

        while (target !== newsContainer) {
            if (!target || !newsContainer) return;
            if (target.classList.contains('source__item')) {
                this.targetHandler(
                    target,
                    'source__item',
                    newsContainer,
                    callback,
                    Endpoint.ENDPOINT_EVERITHING,
                    'sources'
                );
                return;
            }
            if (target.classList.contains('category__item')) {
                this.targetHandler(
                    target,
                    'category__item',
                    newsContainer,
                    callback,
                    Endpoint.ENDPOINT_SOURCES,
                    'category'
                );
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    private targetHandler(
        target: HTMLElement,
        selector: string,
        container: HTMLElement,
        callback: (data: NewsJson) => void,
        point: Endpoint,
        optionsKey: string
    ): void {
        console.log('targetHandler');
        const sel = document.querySelectorAll(`.${selector}`);
        sel.forEach((item) => item.classList.remove('active'));
        target.classList.add('active');

        const sourceId = target.getAttribute('data-source-id') || '';
        if (container.getAttribute('data-source') !== sourceId) {
            container.setAttribute('data-source', sourceId);
            console.log('Endpoint = ', point);
            super.getResp(
                {
                    endpoint: point,
                    options: {
                        [optionsKey]: sourceId,
                    },
                },
                callback
            );
        }
    }
}

export default AppController;
