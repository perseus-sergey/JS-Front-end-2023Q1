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
    this.appendPlayground();
    this.makeCountersSection();
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

  FIELD_TAG = Field.FIELD_TAG;

  FIELD_ROW_TAG = 'div';

  FIELD_ROW_STYLE = 'playground__row';

  COUNTER_WRAPPER_STYLE = 'counter-wrapper';

  COUNTER_STYLE = 'counter';

  TIMER_STYLE = 'timer';

  startListners() {
    document.addEventListener('click', this.fieldClickHandler);
    document.oncontextmenu = () => false;

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

  fieldClickHandler(event) {
    const domField = event.target.closest(`.${this.fields[0][0].fieldStyle.FIELD}`);

    if (this.isGameFinished) return;
    if (domField) {
      // this.moovingCharColor = window.getComputedStyle(element).color;
      // this.addKeyBtnPressedClass(element);

      if (domField.isOpened) return;

      // if it's right click:
      if (event.type === 'contextmenu') {
        domField.changeFlag();
        if (domField.isFlag) {
          this.flags.push(domField.fieldID);
        } else {
          this.removeFlag(domField.fieldID);
          // this.flags.filter((id) => id !== domField.fieldID);
        }
        this.flagCount();
        return;
      }

      if (domField.isFlag) return;

      const { x, y } = domField;

      // to insert mines after first click
      if (this.isFirstClick) {
        this.isFirstClick = false;
        do {
          this.appendPlayground();
        } while (this.calcMinesAround(x, y) !== 0);

        window.addEventListener('contextmenu', this.fieldClickHandler);

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
        this.flagCount();
      }
      // console.log(this.flags.length);
      // this.removeKeyBtnPressedClass(element);
    }
  }

  flagCount() {
    this.counterDiv.textContent = this.MINE_NUM - this.flags.length;
  }

  removeFlag(flagId) {
    this.flags = this.flags.filter((el) => el !== flagId);
  }

  finishGame() {
    this.isGameFinished = true;

    this.mines.forEach((id) => {
      const [x, y] = id.split('-');
      const domField = this.fields[x][y];
      domField.showMine();
      if (this.flags.indexOf(id) !== -1) {
        this.removeFlag(id);
        // this.flags = this.flags.filter((el) => el !== id);
        domField.isCorrectFlag(true);
      }
    });
    this.flags.forEach((id) => {
      const [x, y] = id.split('-');
      this.fields[x][y].isCorrectFlag(false);
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

        this.fields[x].push(field);

        fieldRow.append(field);
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

  makeCountersSection() {
    const counterWrapper = Playground.generateDomElement('section', '', this.COUNTER_WRAPPER_STYLE);
    this.counterDiv = Playground.generateDomElement('div', '', this.COUNTER_STYLE);
    this.counterDiv.textContent = 0;
    this.timerDiv = Playground.generateDomElement('div', '', this.TIMER_STYLE);

    counterWrapper.append(this.counterDiv);
    counterWrapper.append(this.timerDiv);

    // this.fields = [];
    document.body.append(counterWrapper);
    // return counterWrapper;
  }

  appendPlayground() {
    if (this.domPlayground) this.domPlayground.remove();

    this.domPlayground = this.makePlayground();

    this.mainSection.append(this.domPlayground);
  }

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

  // removeMines() {
  //   for (let x = 0; x < this.ROW_NUM; x += 1) {
  //     for (let y = 0; y < this.COL_NUM; y += 1) {
  //       this.fields[x][y].isMine = 0;
  //     }
  //   }
  // }

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

    oField.openField();
    this.removeFlag(oField.fieldID);
    if (oField.VALUE !== 0) return;

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
