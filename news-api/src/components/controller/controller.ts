import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources(callback: () => void): void {
      super.getResp(
          {
              endpoint: 'sources',
          },
          callback
      );
  }

  // (data) => this.view.drawNews(data)
  public getNews(e: Event, callback: () => void): void {
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
                          endpoint: 'everything',
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
