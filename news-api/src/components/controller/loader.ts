import { UrlOptions, RequestMaker, NewsJson, Endpoint } from "../types";

class Loader {
  private baseLink;

  private options;

  constructor(baseLink: string, options: Partial<UrlOptions>) {
    // console.log("baseLink  ")
      this.baseLink = baseLink;
      this.options = options;
  }

  protected getResp(
      { endpoint, options = {} }: RequestMaker<Endpoint>,
      callback = (data: NewsJson): void => {
          console.error('No callback for GET response\nData :\n', data);
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

  private makeUrl(options: Partial<UrlOptions>, endpoint: string): string {
      const urlOptions = { ...this.options, ...options };
      console.log(urlOptions)
      let url = `${this.baseLink}${endpoint}?`;

      Object.keys(urlOptions).forEach((key) => {
          if (key) url += `${key}=${urlOptions[key]}&`;
      });
      console.log('url.slice(0, -1) ', url.slice(0, -1))
      return url.slice(0, -1);
  }
// https://newsapi.org/v2/everything?q=tesla&from=2023-05-05&sortBy=publishedAt&apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f
// https://newsapi.org/v2/sources?apiKey=d6ea0b2a090449e58eb36a5b2f8ef27f

  public load(method: string, endpoint: string, callback: (data: NewsJson) => void, options: Partial<UrlOptions> = {}): void {
      fetch(this.makeUrl(options, endpoint), { method })
          .then(this.errorHandler)
          .then((res) => res.json())
          .then((data) => callback(data))
          .catch((err) => console.error(err));
  }
}


export default Loader;
