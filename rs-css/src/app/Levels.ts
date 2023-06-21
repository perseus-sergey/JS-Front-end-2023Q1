import { ILevel } from './auxiliary/types';

export const gameLevels: ILevel[] = [
  {
    levelH1: 'Select the plates',
    levelDescr: 'Select elements by their type',
    learnTitle: 'Type Selector',
    learnSelector: 'A',
    promptText:
      'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    levelRightAnswer: 'plate',
    levelTask: `
      <plate></plate>
      <plate></plate>
  `,
  },
  {
    levelH1: 'Select the bento boxes',
    levelDescr: 'Select elements by their type',
    learnTitle: 'Type Selector',
    learnSelector: 'A',
    promptText:
      'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    levelRightAnswer: 'bento',
    levelTask: `
    <bento></bento>
    <plate></plate>
    <bento></bento>
    `,
  },
  {
    levelH1: 'Select the fancy plate',
    levelDescr: 'Select elements with an ID',
    learnTitle: 'ID Selector',
    learnSelector: '#id',
    promptText:
      'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    levelRightAnswer: '#fancy',
    levelTask: `
    <plate id="fancy"></plate>
    <plate></plate>
    <bento></bento>
    `,
  },
  {
    levelH1: 'Select the apple on the plate',
    levelDescr: 'Select an element inside another element',
    learnTitle: 'Descendant Selector',
    learnSelector: 'A&nbsp;&nbsp;B',
    promptText:
      'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
    examples: [
      '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    levelRightAnswer: 'plate apple',
    levelTask: `
    <bento></bento>
    <plate>
      <apple></apple>
    </plate>
    <apple></apple>
    `,
  },
  {
    levelH1: 'Select the pickle on the fancy plate',
    levelDescr: 'Combine the Descendant & ID Selectors',
    learnTitle: 'Combine Classes',
    learnSelector: '#id&nbsp;&nbsp;A',
    promptText: 'You can combine any selector with the descendent selector.',
    examples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    levelRightAnswer: '#fancy pickle',
    levelTask: `
    <bento>
    <orange></orange>
    </bento>
    <plate id="fancy">
      <pickle></pickle>
    </plate>
    <plate>
      <pickle></pickle>
    </plate>
    `,
  },
  {
    levelH1: 'Select the small apples',
    levelDescr: 'Select elements by their class',
    learnTitle: 'Class Selector',
    learnSelector: '.classname',
    promptText:
      'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: [
      '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>',
    ],
    levelRightAnswer: '.small',
    levelTask: `
    <apple></apple>
    <apple class="small"></apple>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate></plate>
    `,
  },
  {
    levelH1: 'Select the small oranges',
    levelDescr: 'Combine the Class Selector',
    learnTitle: 'Combine Classes',
    learnSelector: 'A.className',
    promptText:
      'You can combine the class selector with other selectors, like the type selector.',
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    levelRightAnswer: 'orange.small',
    levelTask: `
    <apple></apple>
    <apple class="small"></apple>
    <bento>
      <orange class="small"></orange>
    </bento>
    <plate>
      <orange></orange>
    </plate>
    <plate>
      <orange class="small"></orange>
    </plate>`,
  },
  {
    levelH1: 'Select the small oranges in the bentos',
    levelDescr: 'You can do it...',
    learnTitle: 'Combine Classes',
    learnSelector: 'Put your back into it!',
    promptText:
      'Combine what you learned in the last few levels to solve this one!',
    levelRightAnswer: 'bento orange.small',
    levelTask: `
    <bento>
      <orange></orange>
    </bento>
    <orange class="small"></orange>
    <bento>
      <orange class="small"></orange>
    </bento>
    <bento>
      <apple class="small"></apple>
    </bento>
    <bento>
      <orange class="small"></orange>
    </bento>
    `,
  },
  {
    levelH1: 'Select all the plates and bentos',
    levelDescr: 'Combine, selectors, with... commas!',
    learnTitle: 'Comma Combinator',
    learnSelector: 'A, B',
    promptText:
      'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
    ],
    levelRightAnswer: 'plate,bento',
    levelTask: `
    <pickle class="small"></pickle>
    <pickle></pickle>
    <plate>
      <pickle></pickle>
    </plate>
    <bento>
      <pickle></pickle>
    </bento>
    <plate>
      <pickle></pickle>
    </plate>
    <pickle></pickle>
    <pickle class="small"></pickle>
    `,
  },
  {
    levelH1: 'Select all the things!',
    levelDescr: 'You can select everything!',
    learnTitle: 'The Universal Selector',
    learnSelector: '*',
    promptText: 'You can select all elements with the universal selector! ',
    examples: [
      '<strong>p *</strong> selects any element inside all <tag>p</tag> elements.',
    ],
    levelRightAnswer: '*',
    levelTask: `
    <apple></apple>
    <plate>
      <orange class="small"></orange>
    </plate>
    <bento></bento>
    <bento>
      <orange></orange>
    </bento>
    <plate id="fancy"></plate>
    `,
  },
  {
    levelH1: 'Select all elements inside another one',
    levelDescr: 'Combine the Universal Selector',
    learnTitle: 'The Universal Selector',
    learnSelector: 'A&nbsp;&nbsp;*',
    promptText: 'This selects all elements inside of <strong>A</strong>.',
    examples: [
      '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
      '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
    ],
    levelRightAnswer: 'plate *',
    levelTask: `
    <plate id="fancy">
      <orange class="small"></orange>
    </plate>
    <plate>
      <pickle></pickle>
    </plate>
    <apple class="small"></apple>
    <plate>
      <apple></apple>
    </plate>`,
  },
  {
    levelH1: "Select every apple that's next to a plate",
    levelDescr: 'Select an element that directly follows another element',
    learnTitle: 'Adjacent Sibling Selector',
    learnSelector: 'A + B',
    promptText:
      "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
    examples: [
      '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
      '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>',
    ],
    levelRightAnswer: 'plate + apple',
    levelTask: `
    <bento>
      <apple class="small"></apple>
    </bento>
    <plate></plate>
    <apple class="small"></apple>
    <plate></plate>
    <apple></apple>
    <apple class="small"></apple>
    <apple class="small"></apple>
    `,
  },
];
