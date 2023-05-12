export default class Field extends HTMLElement {
  // 0 - not mine, 1 - mine
  constructor(x, y) {
    super();
    this.fieldID = `${x}-${y}`;
    // this.dataset.id = this.fieldID;
    this.x = x;
    this.y = y;
    this.generateField();
  }

  isOpened = false;

  isMine = 0;

  isFlag = false;

  VALUE = 0;

  styles = [];

  static FIELD_TAG = 'field-div';

  fieldIcon = {
    EMPTY: '',
    BOOM: '💥',
    MINE: '💣',
    FLAG: '✔',
  };

  fieldStyle = {
    FIELD: 'field',
    CLOSED: 'field-closed',
    OPENED: 'field-opened',
    FLAG: 'field-flag',
    WRONG_FLAG: 'field-flag_wrong',
    GOOD_FLAG: 'field-flag_good',
    MINE: 'field-mine',
    BOOM: 'field-mine_boom',
    MINES_AROUND: [
      'field_mines-around-0',
      'field_mines-around-1',
      'field_mines-around-2',
      'field_mines-around-3',
      'field_mines-around-4',
      'field_mines-around-5',
    ],
  };

  openField() {
    this.isOpened = true;
    this.textContent = this.VALUE || '';
    this.classList.add(this.fieldStyle.OPENED, this.fieldStyle.MINES_AROUND[this.VALUE]);
  }

  showMine() {
    this.textContent = this.fieldIcon.MINE;
  }

  isCorrectFlag(isCorrect) {
    this.classList.add(isCorrect ? this.fieldStyle.GOOD_FLAG : this.fieldStyle.WRONG_FLAG);
  }

  changeFlag() {
    this.isFlag = !this.isFlag;
    this.textContent = this.isFlag ? this.fieldIcon.FLAG : this.fieldIcon.EMPTY;
  }

  generateField() {
    this.styles = [this.fieldStyle.FIELD];

    this.classList = [...this.styles];
  }
}
