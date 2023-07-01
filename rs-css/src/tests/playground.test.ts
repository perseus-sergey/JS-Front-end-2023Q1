import { constantsAttributes } from '../app/auxiliary/constants';
import { Playground } from '../app/Playground';

const {
  HIGHLIGHT,
  TWIST,
} = constantsAttributes;

describe('playground: ', () => {
  const playgrd = new Playground();

  describe(`removeChildrenFromTag should return pure tag without children and attributus  ${TWIST} and  ${HIGHLIGHT}`, () => {
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
