export default class Cell extends HTMLElement {
  // 0 - not mine, 1 - mine
  constructor(x, y, isOpened = false, VALUE = 0) {
    super();
    this.cellID = `${x}-${y}`;
    this.x = x;
    this.y = y;
    this.isOpened = isOpened;
    this.VALUE = VALUE;
  }

  isMine = 0;

  isFlag = false;

  styles = [];

  cellIcon = {
    EMPTY: '',
    BOOM: '💥',
    MINE: '💣',
    // MINE: '🧨',
    // FLAG: '❓',
    // FLAG: '⚠',
    // FLAG: '🔒',
    FLAG: '✔',
    BAD_FLAG: '❗',
    WIN: '🎁',
  };

  cellStyle = {
    CELL: 'cell',
    CLOSED: 'cell-closed',
    OPENED: 'cell-opened',
    FLAG: 'cell-flag',
    WRONG_FLAG: 'cell-flag_wrong',
    GOOD_FLAG: 'cell-flag_good',
    MINE: 'cell-mine',
    BOOM: 'cell-mine_boom',
    WIN: 'cell-win',
    MINES_AROUND: [
      'cell_mines-around-0',
      'cell_mines-around-1',
      'cell_mines-around-2',
      'cell_mines-around-3',
      'cell_mines-around-4',
      'cell_mines-around-5',
      'cell_mines-around-6',
    ],
  };

  connectedCallback() {
    this.generateClassList();
  }

  openCell() {
    this.isOpened = true;
    this.textContent = this.VALUE || '';
    this.generateClassList();
  }

  showMine() {
    this.textContent = this.cellIcon.MINE;
  }

  isCorrectFlag(isCorrect) {
    if (!isCorrect) this.textContent = this.cellIcon.BAD_FLAG;
    this.classList.add(isCorrect ? this.cellStyle.GOOD_FLAG : this.cellStyle.WRONG_FLAG);
    this.styles.push(isCorrect ? this.cellStyle.GOOD_FLAG : this.cellStyle.WRONG_FLAG);
  }

  changeFlag() {
    this.isFlag = !this.isFlag;
    this.textContent = this.isFlag ? this.cellIcon.FLAG : this.cellIcon.EMPTY;
  }

  isBoom() {
    this.classList.add(this.cellStyle.BOOM);
    this.textContent = this.cellIcon.BOOM;
  }

  isWin() {
    this.classList.add(this.cellStyle.WIN);
    this.textContent = this.cellIcon.WIN;
  }

  generateClassList() {
    if (this.isOpened) {
      this.styles.push(this.cellStyle.OPENED);
      this.styles.push(this.cellStyle.MINES_AROUND[this.VALUE]);
    }

    this.classList = this.cellStyle.CELL;
    this.classList.add(...this.styles);
  }
}
