import { constantsAttributes } from '../app/auxiliary/constants';
import { Playground } from '../app/Playground';

const {
  HIGHLIGHT,
  TWIST,
} = constantsAttributes;

const playgrd = new Playground();

describe('removeChildrenFromTag: ', () => {
  describe(`Should return pure tag without children and attributus  ${TWIST} and  ${HIGHLIGHT}`, () => {
    it(`Should remove attribute ${TWIST} and any children`, () => {
      const tag = `<apple ${TWIST}="true"><div class="some-class"><span>Some Text</span></div></apple>`;
      expect(playgrd.removeChildrenFromTag(tag)).toBe('<apple></apple>');
    });
    it(`Should remove attribute ${HIGHLIGHT} and leave class`, () => {
      const tag = `<apple class="some-class" ${HIGHLIGHT}="false"></apple>`;
      expect(playgrd.removeChildrenFromTag(tag)).toBe('<apple class="some-class"></apple>');
    });
    it(`Should remove all children and attribute ${HIGHLIGHT}`, () => {
      const tag = `<plate ${HIGHLIGHT}="">
      <apple twist=""></apple>
    </plate>`;
      expect(playgrd.removeChildrenFromTag(tag)).toBe('<plate></plate>');
    });
  });
});

describe('resetProperties: ', () => {
  beforeEach(() => {
    playgrd.levelNumber = 5;
    playgrd.gameStatus = {
      3: { levelFinished: true, cheat: false, mistakeCount: 0 },
      4: { levelFinished: true, cheat: true, mistakeCount: 0 },
    };
    playgrd.isGameFinished = true;
    playgrd.isCheat = true;

    playgrd.resetProperties();
  });

  it('levelNumber Should be 0', () => {
    expect(playgrd.levelNumber).toBe(0);
  });
  it('gameStatus Should be empty {}', () => {
    expect(playgrd.gameStatus).toEqual({});
  });
  it('isCheat Should be false', () => {
    expect(playgrd.isCheat).toEqual(false);
  });
  it('isGameFinished Should be false', () => {
    expect(playgrd.isGameFinished).toEqual(false);
  });
});
