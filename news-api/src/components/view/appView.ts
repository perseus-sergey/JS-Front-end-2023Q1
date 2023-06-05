import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news;

    private sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

   protected drawNews(data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

   protected drawSources(data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
