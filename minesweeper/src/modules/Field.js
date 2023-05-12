/* eslint-disable prefer-const */
export default class Field extends HTMLElement {
  // 0 - not mine, 1 - mine
  constructor(x, y, isMine = 0, isFlag = false, isOpened = false) {
    super();
    this.fieldID = `${x}-${y}`;
    this.x = x;
    this.y = y;
    this.isOpened = isOpened;
    this.isMine = isMine;
    this.isFlag = isFlag;
    this.generateField();
  }

  VALUE = 0;

  styles = [];

  FIELD_TAG = 'div';

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

  static get observedAttributes() {
    return ['isOpened', 'isMine', 'isFlag'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.generateField();
  }

  getStyles() {
    return [...this.styles];
  }

  getValue() {
    return this.VALUE;
  }

  generateField() {
    this.styles = [this.fieldStyle.FIELD];

    if (this.isFlag) {
      this.styles.push(this.fieldStyle.FLAG);
    } else if (this.isOpened) {
      this.styles.push(this.fieldStyle.OPENED);
    }

    // styles.push(fieldStyle.MINES_AROUND[VALUE]);

    // if there's mine near this field and field is isOpened
    // if (VALUE) text = VALUE;
    // if (isMine) text = 'B';
    // if (VALUE && isOpened) text = VALUE;

    // const field = Field.generateDomElement(this.FIELD_TAG, '', styles);

    this.dataset.id = this.fieldID;
    // field.dataset.id = this.fieldID;
    // field.dataset.val = VALUE;

    // return field;
  }

  // openField(htmlElement) {
  //   this.isOpened = true;
  //   this.styles.push(this.fieldStyle.OPENED);
  //   this.styles.push(this.fieldStyle.MINES_AROUND[this.VALUE]);
  // }

  swithFlag(htmlElement) {
    this.isFlag = !this.isFlag;
    htmlElement.classList.toggle(this.fieldStyle.FLAG, this.isFlag);
  }
}
