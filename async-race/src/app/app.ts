import { Page } from '../view/Page';

export class App {
  public start(): void {
    const page = new Page();
    page.generateMainPageElements();
  }
}
