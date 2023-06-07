import { Endpoint, NewsJson } from '../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources(callback: (data: NewsJson) => void): void {
      super.getResp(
          {
              endpoint: Endpoint.ENDPOINT_SOURCES,
          },
          callback
      );
  }

  // (data) => this.view.drawNews(data)
  public getNews(e: Event, callback: (data: NewsJson) => void): void {
    // if (e.type !== 'click') return
      let target: HTMLElement = e.target as HTMLElement;
      const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

      while (target !== newsContainer) {
          if (!target || !newsContainer) return;
          if (target.classList.contains('source__item')) {
              const sourceId = target.getAttribute('data-source-id') || '';
              if (newsContainer.getAttribute('data-source') !== sourceId) {
                  newsContainer.setAttribute('data-source', sourceId);
                  super.getResp(
                      {
                          endpoint: Endpoint.ENDPOINT_EVERITHING,
                          options: {
                              sources: sourceId,
                          },
                      },
                      callback
                  );
              }
              return;
          }
          target = target.parentNode as HTMLElement;
      }
  }
}

export default AppController;
