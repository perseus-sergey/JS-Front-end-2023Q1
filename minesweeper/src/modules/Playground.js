import Field from './Field';

class Playground {
  constructor(rowNumber = 10, colNumber = 10, mineNum = 10) {
    this.ROW_NUM = rowNumber;
    this.COL_NUM = colNumber;
    this.MINE_NUM = mineNum;
    this.makeMainSection();
    this.startPlay();
    this.addListners();
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

  startPlay() {
    this.initPlayground();
    this.insertMines();
    this.setupPlayground();
    this.appendPlayground();
  }

  addListners() {
    document.addEventListener('click', (event) => this.fieldClickHandler(event));

    // this.monitor.addEventListener('blur', () => {
    //   this.monitor.focus();
    // });

    // document.addEventListener('keydown', (event) => {
    //   if (!this.isMeta) this.keyDownHandler(event);
    // });

    // document.addEventListener('keyup', (event) => {
    //   if (event.key === 'Shift') this.keyDownHandler(event);
    //   this.isMeta = false;
    // });
  }

  fieldClickHandler(event, element = event.target.closest(`.${this.fields[0][0].fieldStyle.FIELD}`)) {
    if (element) {
      // this.moovingCharColor = window.getComputedStyle(element).color;
      // this.addKeyBtnPressedClass(element);

      const [x, y] = element.dataset.id.split('-').map((el) => el / 1);
      const oFieldPressed = this.fields[x][y];
      console.log(oFieldPressed);

      // to insert mines after first click
      if (this.isFirstClick) {
        this.isFirstClick = false;
        do {
          this.startPlay();
        } while (this.calcMinesAround(x, y) !== 0);
      }

      if (oFieldPressed.isMine) alert('BOOOOOM!!!!!');
      else { this.openField(x, y, element); }
      // this.removeKeyBtnPressedClass(element);
    }
  }

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
      this.fields.push(x);
      this.fields[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        this.fields[x].push(new Field(x, y));
        // this.fields[x][y] = new Field(x, y);
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
      const randX = Math.floor(Math.random() * this.ROW_NUM);
      const randY = Math.floor(Math.random() * this.COL_NUM);

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
        const calcX = aroundX + x;
        const calcY = aroundY + y;
        if (!this.outBounds(calcX, calcY)) { counter += this.fields[calcX][calcY].isMine; }
      }
    }
    return counter;
  }

  openField(x, y) {
    if (this.outBounds(x, y)) return;
    const oField = this.fields[x][y];
    if (oField.isOpened) return;

    // oField.openField();
    const domField = document.querySelector(`[data-id="${x}-${y}"]`);
    if (oField.VALUE) domField.textContent = oField.VALUE;
    domField.classList.add(oField.fieldStyle.OPENED, oField.fieldStyle.MINES_AROUND[oField.VALUE]);

    oField.isOpened = true;
    if (oField.VALUE !== 0) return;
    // if (this.calcMinesAround(x, y) !== 0) return;

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
// playground.startPlay();
