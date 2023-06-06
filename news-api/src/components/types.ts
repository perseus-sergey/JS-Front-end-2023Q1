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

export const RequestUrl = {
  baseUrl:   {key: 'baseUrl', value: 'https://newsapi.org/v2/'},
  endpoint:  {key: 'endpoint', value: Endpoint},
  apiKey:    {key: 'apiKey', value: 'd6ea0b2a090449e58eb36a5b2f8ef27f'},
  category:   {key: 'category', value: Category},
  find:       {key: 'q', value: ''},
  dateFrom:   {key: 'from', value: ''},
  country:    {key: 'country', value: ''},
  language:   {key: 'language', value: ''},
  sortBy:     {key: 'sortBy', value: ''},
}

// var url = 'https://newsapi.org/v2/everything?' +
//           'country=us&' +
//           'q=Apple&' +
//           'from=2023-06-06&' +
//           'sortBy=popularity&' +
//           'apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f';

// export interface IJson {
//     status: string;
//     totalResults: number;
//     // articles: Array<{ [x: string]: string }>;
// }

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

// export type NewsJsonArray = (string | number | boolean | Date | NewsJson | NewsJsonArray)[];
export type LinkOptions = { [key: string]: string };
export interface ResponseMaker {
    endpoint: string;
    options?: {
        sources?: string;
    };
}


// {
//   "status": "ok",
//   "totalResults": 8058,
//   -"articles": [
//   -{
//   -"source": {
//   "id": null,
//   "name": "Daily Mail"
//   },
//   "author": "Tim Dornin",
//   "title": "Australia's most popular vehicles revealed with Toyota selling 5,772 Hi-Lux models in May",
//   "description": "Australia's auto industry has posted its best May sales on record, with Toyota, Mazda and Hyundai taking the top three spot for most popular car brands.",
//   "url": "https://www.dailymail.co.uk/news/article-12159447/Australias-popular-vehicles-revealed-Toyota-selling-5-772-Hi-Lux-models-May.html",
//   "urlToImage": "https://i.dailymail.co.uk/1s/2023/06/05/06/71768011-0-image-a-21_1685943926585.jpg",
//   "publishedAt": "2023-06-05T06:05:02Z",
//   "content": "Sales of new cars and trucks have jumped with Australia's auto industry posting its best May result on record.\r\nIn a further sign of improving supply, the Federal Chamber of Automotive Industries sai… [+2326 chars]"
//   },
//   -{
//   -"source": {
//   "id": "the-times-of-india",
//   "name": "The Times of India"
//   },
//   "author": "PTI",
//   "title": "Using electric water heaters to store renewable energy could do the work of 2 million home batteries - and save us billions",
//   "description": "Electric water heaters offer a cheap way to store large amounts of energy, in the form of hot water. A heater with a 300-litre tank can store about as much energy as a second-generation Tesla Powerwall - at a fraction of the cost.",
//   "url": "https://economictimes.indiatimes.com/industry/renewables/using-electric-water-heaters-to-store-renewable-energy-could-do-the-work-of-2-million-home-batteries-and-save-us-billions/articleshow/100757490.cms",
//   "urlToImage": "https://img.etimg.com/thumb/msid-100757749,width-1070,height-580,imgsize-14944,overlay-economictimes/photo.jpg",
//   "publishedAt": "2023-06-05T05:44:36Z",
//   "content": "Australia's energy transition is well under way. Some 3 million households have rooftop solar and sales of medium-sized electric cars are surging. But as we work towards fully electric households pow… [+6050 chars]"
//   },
//   -{
//   -"source": {
//   "id": null,
//   "name": "Electrek"
//   },
