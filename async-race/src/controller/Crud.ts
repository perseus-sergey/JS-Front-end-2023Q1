import { API_BASE_URL } from '../constants';

// B - Body, R - Response
export class Crud <R, B = undefined> {
  public responseJson!: Promise<R | null>;

  constructor(
    private url: string,
    private apiMethod = 'GET',
    private body?: B,
    private headers = { 'Content-Type': 'application/json' },
  ) {
    this.responseJson = this.load(this.url, this.apiMethod, this.body, this.headers);
  }

  private async load(
    url: string,
    apiMethod = 'GET',
    body?: B,
    headers = { 'Content-Type': 'application/json' },
  ):Promise<R | null> {
    try {
      const response = await fetch(API_BASE_URL + url, {
        method: apiMethod,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
      await this.loadResponseHandler(response);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async loadResponseHandler(res: Response): Promise<void> {
    if (!res.ok) {
      console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
    }
  }
}
