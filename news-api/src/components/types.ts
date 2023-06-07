enum Category {
    CAT_BUSINESS = 'business',
    CAT_ENTERTAINMENT = 'entertainment',
    CAT_GENERAL = 'general',
    CAT_HEALTH = 'health',
    CAT_SCIENCE = 'science',
    CAT_SPORTS = 'sports',
    CAT_TECHNOLOGY = 'technology',
}

export enum Endpoint {
    ENDPOINT_EVERITHING = 'everything',
    ENDPOINT_HEADLINES = 'top-headlines',
    ENDPOINT_SOURCES = 'sources',
    // ENDPOINT_SOURCES = 'top-headlines/sources',
}

export const BaseUrlApiKey = {
    baseUrl: { baseUrl: 'https://newsapi.org/v2/' },
    apiKey: { apiKey: 'd6ea0b2a090449e58eb36a5b2f8ef27f' },
    // endpoint: { endpoint: Endpoint.ENDPOINT_EVERITHING },
    // category: { category: Category.CAT_GENERAL },
    // find: { q: '' },
    // dateFrom: { from: '' },
    // country: { country: '' },
    // language: { language: '' },
    // sortBy: { sortBy: '' },
};

export type LinkOptions = { [key: string]: string };

export interface RequestMaker<T> {
    endpoint: T;
    options?: Partial<UrlOptions>;
}

export interface UrlOptions extends LinkOptions {
    sources: string;
    q: string;
    category: Category;
    from: string;
    country: string;
    language: string;
    sortBy: string;
}

// var url = 'https://newsapi.org/v2/everything?' +
//           'country=us&' +
//           'q=Apple&' +
//           'from=2023-06-06&' +
//           'sortBy=popularity&' +
//           'apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f';

export interface Source {
    id: string | null;
    name: string;
}
export interface Articles extends Source {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string;
}
export interface NewsJson extends Articles {
    status: string;
    totalResults: number;
    articles?: Articles[];
    sources?: Articles[];
}
