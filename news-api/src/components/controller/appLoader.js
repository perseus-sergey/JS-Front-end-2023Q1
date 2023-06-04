import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd6ea0b2a090449e58eb36a5b2f8ef27f', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
