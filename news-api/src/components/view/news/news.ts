import { Articles } from '../../types';
import './news.css';

class News {
    public draw(data: Articles[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            if (newsClone !== null) {
                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                const newsMetaFoto = newsClone.querySelector('.news__meta-photo') as HTMLImageElement;
                newsMetaFoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                newsMetaAuthor.textContent = item.author || item.source.name;
                const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
                newsDescriptionTitle.textContent = item.title;

                const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
                newsDescriptionSource.textContent = item.source.name;

                const newsDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
                newsDescriptionContent.textContent = item.description;
                const newsReadMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
                newsReadMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const newsElem = document.querySelector('.news');
        if (newsElem) {
            newsElem.innerHTML = '';
            newsElem.appendChild(fragment);
        }
    }
}

export default News;
