import { Page } from '../view/Page';
import { Track } from '../view/Track';
import { constantsTagName } from '../constants';

const { TRACK_TAG } = constantsTagName;

export class App {
  public runApplication(): void {
    customElements.define(TRACK_TAG, Track);
    const page = new Page();
    page.generateMainPageElements();
  }
}
