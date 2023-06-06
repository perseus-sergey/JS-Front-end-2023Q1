// https://newsapi.org/v2/everything?q=tesla&from=2023-05-05&sortBy=publishedAt&apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f

// export interface ApiConstants {
//   BASE_URL = 'https://newsapi.org/v2/',
//   API_KEY = 'd6ea0b2a090449e58eb36a5b2f8ef27f',
//   ENDPOINT_EVERITHING = 'everything',
//   ENDPOINT_HEADLINES = 'top-headlines',
//   ENDPOINT_SOURCES = 'top-headlines/sources',
// }
// export interface RequestUrl {
//   BASE_URL: string = 'https://newsapi.org/v2/',
//   API_KEY = 'd6ea0b2a090449e58eb36a5b2f8ef27f',
//   ENDPOINT_EVERITHING = 'everything',
//   ENDPOINT_HEADLINES = 'top-headlines',
//   ENDPOINT_SOURCES = 'top-headlines/sources',
// }
enum Category {
  CAT_BUSINESS = 'business',
  CAT_ENTERTAINMENT = 'entertainment',
  CAT_GENERAL = 'general',
  CAT_HEALTH = 'health',
  CAT_SCIENCE = 'science',
  CAT_SPORTS = 'sports',
  CAT_TECHNOLOGY = 'technology',
}

enum Endpoint {
  ENDPOINT_EVERITHING = 'everything',
  ENDPOINT_HEADLINES = 'top-headlines',
  ENDPOINT_SOURCES = 'top-headlines/sources',
}

interface RequestUrl {
  baseUrl:   {key: 'baseUrl', value: 'https://newsapi.org/v2/'},
  endpoint:  {key: 'endpoint', value: Endpoint},
  apiKey:    {key: 'apiKey', value: 'd6ea0b2a090449e58eb36a5b2f8ef27f'},
  category?: {key: 'category', value: Category},
  find?:     {key: 'q', value: ''},
  dateFrom?: {key: 'from', value: ''},
  country?:  {key: 'country', value: ''},
  sortBy?:   {key: 'sortBy', value: ''},
}

// type UrlKeyValue = {key: string, value: string}

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
// https://newsapi.org/docs/endpoints

// var url = 'https://newsapi.org/v2/everything?' +
//           'country=us&' +
//           'q=Apple&' +
//           'from=2023-06-06&' +
//           'sortBy=popularity&' +
//           'apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f';

// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f';
