/* eslint-disable prefer-const */
export default class Field {
  // 0 - not mine, 1 - mine
  constructor(coordX, coordY, isMine = 0, isFlag = false, isOpened = false) {
    this.fieldID = `${coordX}-${coordY}`;
    this.isOpened = isOpened;
    this.isMine = isMine;
    this.isFlag = isFlag;
    this.isOpened = isOpened;
  }

  VALUE = 0;

  styles = [];

  FIELD_TAG = 'div';

  fieldStyle = {
    FIELD: 'field',
    CLOSED: 'field-closed',
    OPENED: 'field-opened',
    FLAG: 'field-flag',
    WRONG_FLAG: 'field-flag_wrong',
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

  getStyles() {
    return [...this.styles];
  }

  getValue() {
    return this.VALUE;
  }

  generateField() {
    let {
      fieldStyle, styles, isFlag, isOpened, VALUE, isMine,
    } = this;
    styles = [fieldStyle.FIELD];
    // const styles = [fieldStyle.FIELD];
    // let text = '';

    if (isFlag) {
      styles.push(fieldStyle.FLAG);
    } else if (isOpened) {
      styles.push(fieldStyle.OPENED);
    }

    // styles.push(fieldStyle.MINES_AROUND[VALUE]);

    // if there's mine near this field and field is isOpened
    // if (VALUE) text = VALUE;
    // if (isMine) text = 'B';
    // if (VALUE && isOpened) text = VALUE;

    const field = Field.generateDomElement(this.FIELD_TAG, '', styles);

    field.dataset.id = this.fieldID;
    // field.dataset.val = VALUE;

    return field;
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
