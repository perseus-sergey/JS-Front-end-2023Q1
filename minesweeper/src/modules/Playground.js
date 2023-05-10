import Field from './Field';

class Playground {
  constructor(rowNumber = 10, colNumber = 10, mineNum = 10) {
    this.ROW_NUM = rowNumber;
    this.COL_NUM = colNumber;
    this.MINE_NUM = mineNum;
    this.initPlayground();
    this.setupPlayground();
    this.makeMainSection();
    this.appendPlayground();
  }

  fields = [];

  mainSection = '';

  domPlayground = '';

  isFirstClick = true;

  MAIN_TAG = 'main';

  MAIN_CLASS = 'main';

  PLAYGROUND_TAG = 'section';

  PLAYGROUND_STYLE = 'playground';

  FIELD_ROW_TAG = 'div';

  FIELD_ROW_STYLE = 'playground__row';

  makePlayground() {
    const playgrElem = Field.generateDomElement(this.PLAYGROUND_TAG, '', this.PLAYGROUND_STYLE);

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const fieldRow = Field.generateDomElement(this.FIELD_ROW_TAG, '', this.FIELD_ROW_STYLE);
      for (let y = 0; y < this.COL_NUM; y += 1) {
        fieldRow.append(this.fields[x][y].generateField());
      }
      playgrElem.append(fieldRow);
    }

    return playgrElem;
  }

  appendPlayground() {
    if (this.domPlayground) this.domPlayground.remove();

    this.domPlayground = this.makePlayground();

    this.mainSection.append(this.domPlayground);
  }

  initPlayground() {
    this.fields = [];
    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        this.fields[x][y] = new Field(x, y);
      }
    }
  }

  setupPlayground() {
    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        this.fields[x][y].VALUE = this.calcMinesAround(x, y);
      }
    }
  }

  makeMainSection() {
    const mainSection = Field.generateDomElement(this.MAIN_TAG, '', this.MAIN_CLASS);
    document.body.append(mainSection);
    this.mainSection = mainSection;
  }

  appendMonitor() {
    this.mainSection.append(this.oEcran.ecran);
    this.monitor = this.oEcran.monitor;
    this.charReceiver = this.oEcran.charReceiver;
  }

  insertMines() {
    let counter = 0;

    while (counter < this.MINE_NUM) {
      const randX = Math.random() * this.ROW_NUM;
      const randY = Math.random() * this.COL_NUM;

      if (!this.fields[randX][randY].isMine) {
        this.fields[randX][randY].isMine = 1;
        counter += 1;
      }
    }
  }

  removeMines() {
    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        this.fields[x][y].isMine = 0;
      }
    }
  }

  calcMinesAround(x, y) {
    if (this.outBounds(x, y)) return 0;

    let counter = 0;
    for (let aroundX = -1; aroundX <= 1; aroundX += 1) {
      for (let aroundY = -1; aroundY <= 1; aroundY += 1) {
        counter += this.fields[aroundX + x][aroundY + y].isMine;
      }
    }
    return counter;
  }

  openField(x, y) {
    if (this.outBounds(x, y)) return;
    if (this.fields[x][y].isOpened) return;

    this.fields[x][y].isOpened = true;
    if (this.calcMinesAround(x, y) !== 0) return;

    this.openField(x, y - 1);
    this.openField(x, y + 1);
    this.openField(x - 1, y);
    this.openField(x + 1, y);
    this.openField(x - 1, y - 1);
    this.openField(x - 1, y + 1);
    this.openField(x + 1, y - 1);
    this.openField(x + 1, y + 1);
  }

  outBounds(x, y) {
    return x < 0 || y < 0 || x >= this.ROW_NUM || y >= this.COL_NUM;
  }
}

const playground = new Playground();
