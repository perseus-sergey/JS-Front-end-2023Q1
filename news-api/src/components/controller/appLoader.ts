/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
// import Loader from './loader';

// class AppLoader extends Loader {
//     constructor() {
//         super('https://newsapi.org/v2/', {
//             apiKey: 'd6ea0b2a090449e58eb36a5b2f8ef27f', // получите свой ключ https://newsapi.org/
//         });
//     }
// }

// export default AppLoader;

// type LinkOptions = { string: string } | Record<string, never>;
// type LinkOptions = { apiKey?: string };
interface IJson {
  [x: string]: string|number|boolean|Date|IJson|IJsonArray;
}
type IJsonArray = (string|number|boolean|Date|IJson|IJsonArray)[]
type LinkOptions = { [key: string]: string };
interface ResponseMaker {
    endpoint: string,
    options?: {
        sources?: string
    }
}

class Loader {
    private baseLink;

    private options;

    constructor(baseLink: string, options: LinkOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: ResponseMaker,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: LinkOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
          // if(Object.prototype.hasOwnProperty.call(urlOptions, "apiKey"))
          if(key)
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string, callback: (data?: IJson) => void, options: LinkOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

// export default Loader;

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd6ea0b2a090449e58eb36a5b2f8ef27f', // получите свой ключ https://newsapi.org/
        });
    }
}

// import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: () => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    // (data) => this.view.drawNews(data)
    public getNews(e: Event, callback: () => void): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (!target || !newsContainer) return;
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

// export default AppController;
