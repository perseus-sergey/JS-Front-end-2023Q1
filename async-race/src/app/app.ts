import { Page } from '../view/Page';
import { Track } from '../view/Track';
import { constantsTagName } from '../common/constants';
import { Winner } from '../view/Winner';

const { TRACK_TAG, WIN_TAG } = constantsTagName;

export class App {
  public runApplication(): void {
    customElements.define(TRACK_TAG, Track);
    customElements.define(WIN_TAG, Winner);
    const page = new Page();
    page.generateMainPageElements();
  }
}
