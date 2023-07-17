export const API_BASE_URL = 'http://127.0.0.1:3000';

// B - Body
export class Resp <B = undefined> {
  public response!: Promise<Response | null>;

  constructor(
    private url: string,
    private apiMethod = 'GET',
    private body?: B,
    private headers = { 'Content-Type': 'application/json' },
  ) {
    this.response = this.carCRUD(this.url, this.apiMethod, this.body, this.headers);
  }

  private async carCRUD(
    url: string,
    apiMethod = 'GET',
    body?: B,
    headers = { 'Content-Type': 'application/json' },
  ):Promise<Response | null> {
    try {
      const response = await fetch(API_BASE_URL + url, {
        method: apiMethod,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
