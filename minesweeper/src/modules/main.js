class Start {
  constructor(rowNumber = 10, colNumber = 10, mineNum = 10) {
    this.ROW_NUM = rowNumber;
    this.COL_NUM = colNumber;
    this.MINE_NUM = mineNum;
  }
  minesAround = 0;
  flags = false;
  opened = false;

  insertMines(){
    let counter = 0;

    while(counter < this.MINE_NUM) {
      const randX = Math.random() * this.ROW_NUM;
      const randY = Math.random() * this.COL_NUM;

      if(this.minesAround[randX][randY] === 1) continue;
      this.minesAround[randX][randY] === 1;
      counter += 1;
    }
  }

  removeMines() {
    for(let x = 0; x < this.ROW_NUM; x += 1){
      for(let y = 0; x < this.COL_NUM; x += 1) {
        this.minesAround[x][y] = 0;
      }
    }
  }

  calcMinesAround(x, y) {
    if (this.outBounds(x, y)) return 0;

    let counter = 0;
    for (let aroundX = -1; aroundX <= 1; aroundX += 1) {
      for (let aroundY = -1; aroundY <= 1; aroundY += 1) {
        counter += this.minesAround[aroundX + x][aroundY + y];
      }
    }
    return counter;
  }

  open(x, y) {
    if (this.outBounds(x, y)) return;
    if (this.opened[x][y]) return;

    this.opened[x][y] = true;
    if (this.calcMinesAround(x, y) != 0) return;

    this.open(x, y - 1);
    this.open(x, y + 1);
    this.open(x - 1, y);
    this.open(x + 1, y);
    this.open(x - 1, y - 1);
    this.open(x - 1, y + 1);
    this.open(x + 1, y - 1);
    this.open(x + 1, y + 1);
  }

  clearToDefault() {
    this.minesAround = 0;
    this.flags = false;
    this.opened = false;
  }

  outBounds(x, y) {
    return x < 0 || y < 0 || x >= this.ROW_NUM || y >= this.COL_NUM;
  }
}
