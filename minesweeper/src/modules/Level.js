class Level {
  constructor(rowNum, colNum, mineNum) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.mineNum = mineNum;
  }
}
export const gameLevel = {
  easy: new Level(10, 10, 10),
  medium: new Level(15, 15, 40),
  hard: new Level(25, 25, 99),
  custom: '',

  setParams(rowNum = 10, colNum = 15, mineNum = 25) {
    this.custom = new Level(rowNum, colNum, Math.max(1, mineNum));
  },
};
