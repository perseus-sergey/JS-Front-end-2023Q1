export default class Cell extends HTMLElement {
  // 0 - not mine, 1 - mine
  constructor(x, y) {
    super();
    this.cellID = `${x}-${y}`;
    // this.dataset.id = this.cellID;
    this.x = x;
    this.y = y;
    this.generateCell();
  }

  isOpened = false;

  isMine = 0;

  isFlag = false;

  VALUE = 0;

  styles = [];

  static CELL_TAG = 'cell-div';

  static FONT_RATIO = 0.8;

  cellIcon = {
    EMPTY: '',
    BOOM: '💥',
    MINE: '💣',
    // MINE: '🧨',
    // FLAG: '❓',
    // FLAG: '⚠',
    // FLAG: '🔒',
    FLAG: '✔',
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

  openCell() {
    this.isOpened = true;
    this.textContent = this.VALUE || '';
    this.classList.add(this.cellStyle.OPENED, this.cellStyle.MINES_AROUND[this.VALUE]);
  }

  showMine() {
    this.textContent = this.cellIcon.MINE;
  }

  isCorrectFlag(isCorrect) {
    this.classList.add(isCorrect ? this.cellStyle.GOOD_FLAG : this.cellStyle.WRONG_FLAG);
  }

  changeFlag() {
    this.isFlag = !this.isFlag;
    this.textContent = this.isFlag ? this.cellIcon.FLAG : this.cellIcon.EMPTY;
  }

  isBoom() {
    this.classList.add(this.cellStyle.BOOM);
    this.textContent = this.cellIcon.BOOM;
  }

  generateCell() {
    this.styles = [this.cellStyle.CELL];

    this.classList = [...this.styles];
  }
}
