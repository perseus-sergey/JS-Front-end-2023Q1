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
    levelH1: 'Select the icecream on the fancy plate',
    levelDescr: 'Combine the Descendant & ID Selectors',
    learnTitle: 'Combine Classes',
    learnSelector: '#id&nbsp;&nbsp;A',
    promptText: 'You can combine any selector with the descendent selector.',
    examples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    levelRightAnswer: '#fancy icecream',
    levelTask: `
    <bento>
    <orange></orange>
    </bento>
    <plate id="fancy">
      <icecream></icecream>
    </plate>
    <plate>
      <icecream></icecream>
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
    <icecream class="small"></icecream>
    <icecream></icecream>
    <plate>
      <icecream></icecream>
    </plate>
    <bento>
      <icecream></icecream>
    </bento>
    <plate>
      <icecream></icecream>
    </plate>
    <icecream></icecream>
    <icecream class="small"></icecream>
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
      <icecream></icecream>
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
  {
    levelH1: 'General Sibling Selector',
    learnTitle: 'Select elements that follows another element',
    learnSelector: 'A ~ B',
    levelDescr: 'Select the icecreams beside the bento',
    levelRightAnswer: 'bento ~ icecream',
    promptText: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
    examples: [
      '<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>',
    ],
    levelTask: `
    <icecream></icecream>
    <bento>
      <orange class="small"></orange>
    </bento>
    <icecream class="small"></icecream>
    <icecream></icecream>
    <plate>
      <icecream></icecream>
    </plate>
    <plate>
      <icecream class="small"></icecream>
    </plate>
    `,
  },
  {
    levelH1: 'Child Selector',
    learnSelector: 'A> B&nbsp;',
    levelDescr: 'Select the apple directly on a plate',
    levelRightAnswer: 'plate> apple',
    learnTitle: 'Select direct children of an element',
    promptText: 'You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.',
    examples: [
      '<strong>A> B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>',
    ],
    levelTask: `
    <plate>
      <bento>
        <apple></apple>
      </bento>
    </plate>
    <plate>
      <apple></apple>
    </plate>
    <plate></plate>
    <apple></apple>
    <apple class="small"></apple>
    `,
  },
  {
    levelH1: 'First Child Pseudo-selector',
    learnTitle: 'Select a first child element inside of another element',
    levelDescr: 'Select the top orange',
    levelRightAnswer: 'plate :first-child',
    learnSelector: ':first-child',

    promptText: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
    examples: [
      '<strong>:first-child</strong> selects all first child elements.',
      '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
      '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
    ],
    levelTask: `
    <bento></bento>
    <plate></plate>
    <plate>
      <orange></orange>
      <orange></orange>
      <orange></orange>
    </plate>
    <icecream class="small"></icecream>
    `,
  },
  {
    levelH1: 'Only Child Pseudo-selector',
    learnTitle: 'Select an element that are the only element inside of another one.',
    levelDescr: 'Select the apple and the icecream on the plates',
    levelRightAnswer: 'plate :only-child',
    learnSelector: ':only-child',
    promptText: 'You can select any element that is the only element inside of another one.',
    examples: [
      '<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.',
      '<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.',
    ],
    levelTask: `
    <plate>
      <apple></apple>
    </plate>
    <plate>
      <icecream></icecream>
    </plate>
    <bento>
      <icecream></icecream>
    </bento>
    <plate>
      <orange class="small"></orange>
      <orange></orange>
    </plate>
    <icecream class="small"></icecream>
    `,
  },
  {
    levelH1: 'Last Child Pseudo-selector',
    learnTitle: 'Select the last element inside of another element',
    levelDescr: 'Select the small apple and the icecream',
    levelRightAnswer: '.small:last-child',
    learnSelector: ':last-child',
    promptText: 'You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!',
    examples: [
      '<strong>:last-child</strong> selects all last-child elements.',
      '<strong>span:last-child</strong> selects all last-child <tag>span</tag> elements.',
      '<strong>ul li:last-child</strong> selects the last <tag>li</tag> elements inside of any <tag>ul</tag>.',
    ],
    levelTask: `
    <plate id="fancy">
      <apple class="small"></apple>
    </plate>
    <plate></plate>
    <plate>
      <orange class="small"></orange>
      <orange>
    </plate>
    <icecream class="small"></icecream>`,
  },
  {
    levelH1: 'Nth Child Pseudo-selector',
    learnTitle: 'Select an element by its order in another element',
    levelDescr: 'Select the 3rd plate',
    levelRightAnswer: ':nth-child(3)',
    learnSelector: ':nth-child(A)',
    promptText: 'Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.',
    examples: [
      '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
      '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
    ],
    levelTask: `
    <plate></plate>
    <plate></plate>
    <plate></plate>
    <plate id="fancy"></plate>
    `,
  },
  {
    levelH1: 'Nth Last Child Selector',
    learnTitle: 'Select an element by its order in another element, counting from the back',
    levelDescr: 'Select the 1st bento',
    levelRightAnswer: 'bento:nth-last-child(3)',
    learnSelector: ':nth-last-child(A)',
    promptText: 'Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!',
    examples: [
      '<strong>:nth-last-child(2)</strong> selects all second-to-last child elements.',
    ],
    levelTask: `
    <plate></plate>
    <bento></bento>
    <plate>
      <orange></orange>
      <orange></orange>
      <orange></orange>
    </plate>
    <bento></bento>
    `,
  },
  {
    levelH1: 'First of Type Selector',
    learnTitle: 'Select the first element of a specific type',
    levelDescr: 'Select first apple',
    levelRightAnswer: 'apple:first-of-type',
    learnSelector: ':first-of-type',
    promptText: 'Selects the first element of that type within another element.',
    examples: [
      '<strong>span:first-of-type</strong> selects the first <tag>span</tag> in any element.',
    ],
    levelTask: `
    <orange class="small"></orange>
    <apple></apple>
    <apple class="small"></apple>
    <apple></apple>
    <apple class="small"></apple>
    <plate>
      <orange class="small"></orange>
      <orange></orange>
    </plate>
    `,
  },
  {
    levelH1: 'Only of Type Selector',
    learnTitle: 'Select elements that are the only ones of their type within their parent element',
    levelRightAnswer: 'apple:only-of-type',
    learnSelector: ':only-of-type',
    levelDescr: 'Select the apple on the middle plate',
    promptText: 'Selects the only element of its type within another element.',
    examples: [
      '<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there.',
    ],
    levelTask: `
    <plate id="fancy">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate>
      <icecream></icecream>
    </plate>
    `,
  },
  {
    levelH1: 'Last of Type Selector',
    learnTitle: 'Select the last element of a specific type',
    levelDescr: 'Select the last apple and orange',
    levelRightAnswer: '.small:last-of-type',
    learnSelector: ':last-of-type',
    promptText: 'Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.',
    examples: [
      '<strong>div:last-of-type</strong> selects the last <tag>div</tag> in every element.',
      '<strong>p span:last-of-type</strong> selects the last <tag>span</tag> in every <tag>p</tag>.',
    ],
    levelTask: `
    <orange class="small"></orange>
    <orange class="small"></orange>
    <icecream></icecream>
    <icecream></icecream>
    <apple class="small"></apple>
    <apple class="small"></apple>
    `,
  },
  {
    levelH1: 'Empty Selector',
    learnTitle: "Select elements that don't have children",
    levelDescr: 'Select the empty bentos',
    levelRightAnswer: 'bento:empty',
    learnSelector: ':empty',
    promptText: "Selects elements that don't have any other elements inside of them.",
    examples: [
      '<strong>div:empty</strong> selects all empty <tag>div</tag> elements.',
    ],
    levelTask: `
    <bento></bento>
    <bento>
      <icecream class="small"></icecream>
    </bento>
    <plate></plate>
    <bento></bento>`,
  },
];
