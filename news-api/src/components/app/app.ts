import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;

    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
      // console.log("startttttttttttt")
        const sources = document.querySelector('.sources');
        if (sources)
            sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));

        const categories = document.querySelector('.categories');
        if (categories)
            categories.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawSources(data)));

        this.controller.getSources(() => this.view.drawCategories());
    }
}

export default App;
