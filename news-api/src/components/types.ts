export enum Category {
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
    ENDPOINT_SOURCES = 'top-headlines/sources',
}

// https://rss-news-api.onrender.com/
// https://news-proxy.spanb4.shop/
// baseUrl: { baseUrl: 'https://newsapi.org/v2/' },
// apiKey: { apiKey: 'd6ea0b2a090449e58eb36a5b2f8ef27f' },

export const BaseUrlApiKey = {
    baseUrl: { baseUrl: 'https://news-proxy.spanb4.shop/' },
    apiKey: { apiKey: 'a24d4ce99ded4068b87dd3c3973924be' },
};

export type LinkOptions = { [key: string]: string | number };

export interface RequestMaker<T> {
    endpoint: T;
    options?: Partial<UrlOptions>;
}

export interface Endpoints {
    everything: Everything;
    sources: Sources;
}

export interface Sources extends LinkOptions {
    category: Category;
    country: string;
    language: string;
}
export interface Everything extends LinkOptions {
    sources: string;
    q: string;
    from: string;
    language: string;
    sortBy: string;
    pageSize: number;
}
export interface UrlOptions extends LinkOptions {
    sources: string;
    q: string;
    category: Category;
    from: string;
    country: string;
    language: string;
    sortBy: string;
    pageSize: number;
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
export interface NewsJson {
    status: string;
    totalResults: number;
    articles?: Articles[];
    sources?: Articles[];
}
