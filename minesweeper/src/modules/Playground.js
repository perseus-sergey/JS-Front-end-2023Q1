import Field from './Field';

// TO_DO: remove listner for flagged (rightClick)
// TO_DO: extend element for Field
// TO_DO: try {*} = this

class Playground {
  constructor(rowNumber = 10, colNumber = 10, mineNum = 10) {
    this.ROW_NUM = rowNumber;
    this.COL_NUM = colNumber;
    this.MINE_NUM = mineNum;
    customElements.define(this.FIELD_TAG, Field);
    this.fieldClickHandler = this.fieldClickHandler.bind(this);
    // this.rightClickHandler = this.rightClickHandler.bind(this);
    this.makeMainSection();
    this.startPlay();
    this.startListners();
    // this._bindEvents = this._bindEvents.bind(this);
  }

  fields = [];

  mines = [];

  flags = [];

  mainSection = '';

  domPlayground = '';

  isFirstClick = true;

  isGameFinished = false;

  MAIN_TAG = 'main';

  MAIN_CLASS = 'main';

  PLAYGROUND_TAG = 'section';

  PLAYGROUND_STYLE = 'playground';

  FIELD_TAG = 'field-div';

  FIELD_ROW_TAG = 'div';

  FIELD_ROW_STYLE = 'playground__row';

  startPlay() {
    // this.initPlayground();
    // this.setupPlayground();
    this.appendPlayground();
    // this.insertMines();
  }

  startListners() {
    document.addEventListener('click', this.fieldClickHandler);

    document.oncontextmenu = function () {
      return false;
    };

    window.addEventListener('contextmenu', this.fieldClickHandler);

    // TO_DO: add listner for flagged (rightClick)

    // document.addEventListener('click', (event) => this.fieldClickHandler(event));

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

  endListners() {
    document.removeEventListener('click', this.fieldClickHandler);
    document.removeEventListener('contextmenu', this.fieldClickHandler);
  }

  fieldClickHandler(
    event,
    domField = event.target.closest(`.${this.fields[0][0].fieldStyle.FIELD}`),
  ) {
    if (this.isGameFinished) return;
    if (domField) {
      // this.moovingCharColor = window.getComputedStyle(element).color;
      // this.addKeyBtnPressedClass(element);

      // const [x, y] = element.dataset.id.split('-').map((el) => el / 1);
      // const domField = this.fields[x][y];

      if (domField.isOpened) return;

      if (event.type === 'contextmenu') {
        domField.isFlag = !domField.isFlag;
        if (domField.isFlag) {
          domField.textContent = domField.fieldIcon.FLAG;
          this.flags.push(domField.fieldID);
        } else {
          domField.textContent = domField.fieldIcon.EMPTY;
          this.flags.filter((id) => id !== domField.fieldID);
        }
        return;
      }

      if (domField.isFlag) return;

      const { x, y } = domField;

      // to insert mines after first click
      if (this.isFirstClick) {
        this.isFirstClick = false;
        do {
          this.startPlay();
        } while (this.calcMinesAround(x, y) !== 0);
        this.openField(x, y);
        return;
      }

      // if it's mine:
      if (domField.isMine) {
        domField.textContent = domField.fieldIcon.BOOM;
        this.mines = this.mines.filter((id) => id !== domField.fieldID);
        this.finishGame();
      } else {
        this.openField(x, y);
      }
      // this.removeKeyBtnPressedClass(element);
    }
  }

  finishGame() {
    this.isGameFinished = true;

    this.mines.forEach((id) => {
      const domF = document.querySelector(`[data-id="${id}"]`);
      domF.textContent = domF.fieldIcon.MINE;
      if (this.flags.indexOf(id) !== -1) {
        this.flags = this.flags.filter((el) => el !== id);
        domF.classList.add(this.fields[0][0].fieldStyle.GOOD_FLAG);
      }
    });
    this.flags.forEach((id) => {
      document
        .querySelector(`[data-id="${id}"]`)
        .classList.add(this.fields[0][0].fieldStyle.WRONG_FLAG);
    });
    this.endListners();
  }

  makePlayground() {
    const playgrElem = Playground.generateDomElement(this.PLAYGROUND_TAG, '', this.PLAYGROUND_STYLE);

    this.fields = [];

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const fieldRow = Playground.generateDomElement(this.FIELD_ROW_TAG, '', this.FIELD_ROW_STYLE);

      this.fields[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const field = new Field(x, y);
        if (field.styles.length) field.classList.add(...field.styles);

        this.fields[x].push(field);

        fieldRow.append(field);
        // fieldRow.append(this.fields[x][y].generateField());
      }
      playgrElem.append(fieldRow);
    }

    this.insertMines();

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        this.fields[x][y].VALUE = this.calcMinesAround(x, y);
      }
    }

    return playgrElem;
  }

  appendPlayground() {
    if (this.domPlayground) this.domPlayground.remove();

    this.domPlayground = this.makePlayground();

    this.mainSection.append(this.domPlayground);
  }

  // initPlayground() {
  //   this.fields = [];
  //   for (let x = 0; x < this.ROW_NUM; x += 1) {
  //     this.fields.push(x);
  //     this.fields[x] = [];
  //     for (let y = 0; y < this.COL_NUM; y += 1) {
  //       this.fields[x].push(new Field(x, y));
  //     }
  //   }
  // }

  // setupPlayground() {
  //   for (let x = 0; x < this.ROW_NUM; x += 1) {
  //     for (let y = 0; y < this.COL_NUM; y += 1) {
  //       this.fields[x][y].VALUE = this.calcMinesAround(x, y);
  //     }
  //   }
  // }

  makeMainSection() {
    const mainSection = Playground.generateDomElement(
      this.MAIN_TAG,
      '',
      this.MAIN_CLASS,
    );
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
    this.mines = [];

    while (counter < this.MINE_NUM) {
      const randX = Math.floor(Math.random() * this.ROW_NUM);
      const randY = Math.floor(Math.random() * this.COL_NUM);

      if (!this.fields[randX][randY].isMine) {
        this.fields[randX][randY].isMine = 1;
        this.mines.push(this.fields[randX][randY].fieldID);
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
        if (!this.outBounds(calcX, calcY)) {
          counter += this.fields[calcX][calcY].isMine;
        }
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
    domField.textContent = domField.VALUE ? domField.VALUE : '';
    // domField.textContent = oField.VALUE ? oField.VALUE : '';
    domField.classList.add(
      oField.fieldStyle.OPENED,
      oField.fieldStyle.MINES_AROUND[oField.VALUE],
    );

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

  static generateDomElement(tag, text = '', ...classes) {
    const element = document.createElement(tag);
    const arrClasses = [];
    classes.forEach((el) => {
      if (Array.isArray(el)) el.forEach((i) => arrClasses.push(i));
      else el.split(' ').forEach((e) => arrClasses.push(e));
    });
    if (arrClasses.length) element.classList.add(...arrClasses);
    element.textContent = text;
    return element;
  }
}
const playground = new Playground();
// playground.startPlay();
