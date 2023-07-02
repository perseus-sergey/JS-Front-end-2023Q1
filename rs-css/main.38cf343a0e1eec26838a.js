!function(){"use strict";var e={325:function(e,t,l){l.r(t)},889:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.gameLevels=void 0,t.gameLevels=[{levelH1:"Select the plates",levelDescr:"Select elements by their type",learnTitle:"Type Selector",learnSelector:"A",promptText:"Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",examples:["<strong>div</strong> selects all <tag>div</tag> elements.","<strong>p</strong> selects all <tag>p</tag> elements."],levelRightAnswer:"plate",levelTask:"\n      <plate></plate>\n      <plate></plate>\n  "},{levelH1:"Select the bento boxes",levelDescr:"Select elements by their type",learnTitle:"Type Selector",learnSelector:"A",promptText:"Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",examples:["<strong>div</strong> selects all <tag>div</tag> elements.","<strong>p</strong> selects all <tag>p</tag> elements."],levelRightAnswer:"bento",levelTask:"\n    <bento></bento>\n    <plate></plate>\n    <bento></bento>\n    "},{levelH1:"Select the fancy plate",levelDescr:"Select elements with an ID",learnTitle:"ID Selector",learnSelector:"#id",promptText:"Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.",examples:['<strong>#cool</strong> selects any element with <strong>id="cool"</strong>','<strong>ul#long</strong> selects <tag>ul id="long"</tag>'],levelRightAnswer:"#fancy",levelTask:'\n    <plate id="fancy"></plate>\n    <plate></plate>\n    <bento></bento>\n    '},{levelH1:"Select the apple on the plate",levelDescr:"Select an element inside another element",learnTitle:"Descendant Selector",learnSelector:"A&nbsp;&nbsp;B",promptText:"Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",examples:["<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>",'<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>'],levelRightAnswer:"plate apple",levelTask:"\n    <bento></bento>\n    <plate>\n      <apple></apple>\n    </plate>\n    <apple></apple>\n    "},{levelH1:"Select the icecream on the fancy plate",levelDescr:"Combine the Descendant & ID Selectors",learnTitle:"Combine Classes",learnSelector:"#id&nbsp;&nbsp;A",promptText:"You can combine any selector with the descendent selector.",examples:['<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>'],levelRightAnswer:"#fancy icecream",levelTask:'\n    <bento>\n    <orange></orange>\n    </bento>\n    <plate id="fancy">\n      <icecream></icecream>\n    </plate>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    '},{levelH1:"Select the small apples",levelDescr:"Select elements by their class",learnTitle:"Class Selector",learnSelector:".classname",promptText:"The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",examples:['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],levelRightAnswer:".small",levelTask:'\n    <apple></apple>\n    <apple class="small"></apple>\n    <plate>\n      <apple class="small"></apple>\n    </plate>\n    <plate></plate>\n    '},{levelH1:"Select the small oranges",levelDescr:"Combine the Class Selector",learnTitle:"Combine Classes",learnSelector:"A.className",promptText:"You can combine the class selector with other selectors, like the type selector.",examples:['<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>','<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>'],levelRightAnswer:"orange.small",levelTask:'\n    <apple></apple>\n    <apple class="small"></apple>\n    <bento>\n      <orange class="small"></orange>\n    </bento>\n    <plate>\n      <orange></orange>\n    </plate>\n    <plate>\n      <orange class="small"></orange>\n    </plate>'},{levelH1:"Select the small oranges in the bentos",levelDescr:"You can do it...",learnTitle:"Combine Classes",learnSelector:"Put your back into it!",promptText:"Combine what you learned in the last few levels to solve this one!",levelRightAnswer:"bento orange.small",levelTask:'\n    <bento>\n      <orange></orange>\n    </bento>\n    <orange class="small"></orange>\n    <bento>\n      <orange class="small"></orange>\n    </bento>\n    <bento>\n      <apple class="small"></apple>\n    </bento>\n    <bento>\n      <orange class="small"></orange>\n    </bento>\n    '},{levelH1:"Select all the plates and bentos",levelDescr:"Combine, selectors, with... commas!",learnTitle:"Comma Combinator",learnSelector:"A, B",promptText:"Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.",examples:['<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',"<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements"],levelRightAnswer:"plate,bento",levelTask:'\n    <icecream class="small"></icecream>\n    <icecream></icecream>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    <bento>\n      <icecream></icecream>\n    </bento>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    <icecream></icecream>\n    <icecream class="small"></icecream>\n    '},{levelH1:"Select all the things!",levelDescr:"You can select everything!",learnTitle:"The Universal Selector",learnSelector:"*",promptText:"You can select all elements with the universal selector! ",examples:["<strong>p *</strong> selects any element inside all <tag>p</tag> elements."],levelRightAnswer:"*",levelTask:'\n    <apple></apple>\n    <plate>\n      <orange class="small"></orange>\n    </plate>\n    <bento></bento>\n    <bento>\n      <orange></orange>\n    </bento>\n    <plate id="fancy"></plate>\n    '},{levelH1:"Select all elements inside another one",levelDescr:"Combine the Universal Selector",learnTitle:"The Universal Selector",learnSelector:"A&nbsp;&nbsp;*",promptText:"This selects all elements inside of <strong>A</strong>.",examples:["<strong>p *</strong> selects every element inside all <tag>p</tag> elements.",'<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.'],levelRightAnswer:"plate *",levelTask:'\n    <plate id="fancy">\n      <orange class="small"></orange>\n    </plate>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    <apple class="small"></apple>\n    <plate>\n      <apple></apple>\n    </plate>'},{levelH1:"Select every apple that's next to a plate",levelDescr:"Select an element that directly follows another element",learnTitle:"Adjacent Sibling Selector",learnSelector:"A + B",promptText:"This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",examples:['<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',"<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>"],levelRightAnswer:"plate + apple",levelTask:'\n    <bento>\n      <apple class="small"></apple>\n    </bento>\n    <plate></plate>\n    <apple class="small"></apple>\n    <plate></plate>\n    <apple></apple>\n    <apple class="small"></apple>\n    <apple class="small"></apple>\n    '},{levelH1:"General Sibling Selector",learnTitle:"Select elements that follows another element",learnSelector:"A ~ B",levelDescr:"Select the icecreams beside the bento",levelRightAnswer:"bento ~ icecream",promptText:"You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.",examples:["<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>"],levelTask:'\n    <icecream></icecream>\n    <bento>\n      <orange class="small"></orange>\n    </bento>\n    <icecream class="small"></icecream>\n    <icecream></icecream>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    <plate>\n      <icecream class="small"></icecream>\n    </plate>\n    '},{levelH1:"Child Selector",learnSelector:"A> B&nbsp;",levelDescr:"Select the apple directly on a plate",levelRightAnswer:"plate> apple",learnTitle:"Select direct children of an element",promptText:"You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.",examples:["<strong>A> B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>"],levelTask:'\n    <plate>\n      <bento>\n        <apple></apple>\n      </bento>\n    </plate>\n    <plate>\n      <apple></apple>\n    </plate>\n    <plate></plate>\n    <apple></apple>\n    <apple class="small"></apple>\n    '},{levelH1:"First Child Pseudo-selector",learnTitle:"Select a first child element inside of another element",levelDescr:"Select the top orange",levelRightAnswer:"plate :first-child",learnSelector:":first-child",promptText:"You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.",examples:["<strong>:first-child</strong> selects all first child elements.","<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.","<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>."],levelTask:'\n    <bento></bento>\n    <plate></plate>\n    <plate>\n      <orange></orange>\n      <orange></orange>\n      <orange></orange>\n    </plate>\n    <icecream class="small"></icecream>\n    '},{levelH1:"Only Child Pseudo-selector",learnTitle:"Select an element that are the only element inside of another one.",levelDescr:"Select the apple and the icecream on the plates",levelRightAnswer:"plate :only-child",learnSelector:":only-child",promptText:"You can select any element that is the only element inside of another one.",examples:["<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.","<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>."],levelTask:'\n    <plate>\n      <apple></apple>\n    </plate>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    <bento>\n      <icecream></icecream>\n    </bento>\n    <plate>\n      <orange class="small"></orange>\n      <orange></orange>\n    </plate>\n    <icecream class="small"></icecream>\n    '},{levelH1:"Last Child Pseudo-selector",learnTitle:"Select the last element inside of another element",levelDescr:"Select the small apple and the icecream",levelRightAnswer:".small:last-child",learnSelector:":last-child",promptText:"You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!",examples:["<strong>:last-child</strong> selects all last-child elements.","<strong>span:last-child</strong> selects all last-child <tag>span</tag> elements.","<strong>ul li:last-child</strong> selects the last <tag>li</tag> elements inside of any <tag>ul</tag>."],levelTask:'\n    <plate id="fancy">\n      <apple class="small"></apple>\n    </plate>\n    <plate></plate>\n    <plate>\n      <orange class="small"></orange>\n      <orange>\n    </plate>\n    <icecream class="small"></icecream>'},{levelH1:"Nth Child Pseudo-selector",learnTitle:"Select an element by its order in another element",levelDescr:"Select the 3rd plate",levelRightAnswer:":nth-child(3)",learnSelector:":nth-child(A)",promptText:"Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.",examples:["<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.","<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>"],levelTask:'\n    <plate></plate>\n    <plate></plate>\n    <plate></plate>\n    <plate id="fancy"></plate>\n    '},{levelH1:"Nth Last Child Selector",learnTitle:"Select an element by its order in another element, counting from the back",levelDescr:"Select the 1st bento",levelRightAnswer:"bento:nth-last-child(3)",learnSelector:":nth-last-child(A)",promptText:"Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!",examples:["<strong>:nth-last-child(2)</strong> selects all second-to-last child elements."],levelTask:"\n    <plate></plate>\n    <bento></bento>\n    <plate>\n      <orange></orange>\n      <orange></orange>\n      <orange></orange>\n    </plate>\n    <bento></bento>\n    "},{levelH1:"First of Type Selector",learnTitle:"Select the first element of a specific type",levelDescr:"Select first apple",levelRightAnswer:"apple:first-of-type",learnSelector:":first-of-type",promptText:"Selects the first element of that type within another element.",examples:["<strong>span:first-of-type</strong> selects the first <tag>span</tag> in any element."],levelTask:'\n    <orange class="small"></orange>\n    <apple></apple>\n    <apple class="small"></apple>\n    <apple></apple>\n    <apple class="small"></apple>\n    <plate>\n      <orange class="small"></orange>\n      <orange></orange>\n    </plate>\n    '},{levelH1:"Only of Type Selector",learnTitle:"Select elements that are the only ones of their type within their parent element",levelRightAnswer:"apple:only-of-type",learnSelector:":only-of-type",levelDescr:"Select the apple on the middle plate",promptText:"Selects the only element of its type within another element.",examples:["<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there."],levelTask:'\n    <plate id="fancy">\n      <apple class="small"></apple>\n      <apple></apple>\n    </plate>\n    <plate>\n      <apple class="small"></apple>\n    </plate>\n    <plate>\n      <icecream></icecream>\n    </plate>\n    '},{levelH1:"Last of Type Selector",learnTitle:"Select the last element of a specific type",levelDescr:"Select the last apple and orange",levelRightAnswer:".small:last-of-type",learnSelector:":last-of-type",promptText:"Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.",examples:["<strong>div:last-of-type</strong> selects the last <tag>div</tag> in every element.","<strong>p span:last-of-type</strong> selects the last <tag>span</tag> in every <tag>p</tag>."],levelTask:'\n    <orange class="small"></orange>\n    <orange class="small"></orange>\n    <icecream></icecream>\n    <icecream></icecream>\n    <apple class="small"></apple>\n    <apple class="small"></apple>\n    '},{levelH1:"Empty Selector",learnTitle:"Select elements that don't have children",levelDescr:"Select the empty bentos",levelRightAnswer:"bento:empty",learnSelector:":empty",promptText:"Selects elements that don't have any other elements inside of them.",examples:["<strong>div:empty</strong> selects all empty <tag>div</tag> elements."],levelTask:'\n    <bento></bento>\n    <bento>\n      <icecream class="small"></icecream>\n    </bento>\n    <plate></plate>\n    <bento></bento>'}]},68:function(e,t,l){var n=this&&this.__awaiter||function(e,t,l,n){return new(l||(l=Promise))((function(s,a){function r(e){try{o(n.next(e))}catch(e){a(e)}}function i(e){try{o(n.throw(e))}catch(e){a(e)}}function o(e){var t;e.done?s(e.value):(t=e.value,t instanceof l?t:new l((function(e){e(t)}))).then(r,i)}o((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Playground=void 0;const s=l(768),a=l(954),r=l(889),{LEVEL_NUMBER:i,GAME_STATUS:o}=s.constantsStorage,{END_GAME:c,EDITOR_INFO:p,EDITOR_BEFORE_TITLE:h,EDITOR_TITLE:m,VIEWER_BEFORE_TITLE:d,VIEWER_TITLE:g,INPUT_PLACEHOLDER:E,ENTER_BTN_TITLE:v,HELP_BTN_TITLE:u}=s.constantsTexts,{HIGHLIGHT:T,LEVEL_NUMB:S,TWIST:L}=s.constantsAttributes,{ACTIVE:y,ACTIVE_MENU:b,ACTIVE_LEVEL:f,ASIDE_HEADER:A,ASIDE_TITLE:_,ASIDE_FINISH_MARK:I,ASIDE_LEARN_WRAP:D,ASIDE_LEARN_SELECTOR:R,ASIDE_LEARN_TITLE:w,ASIDE_LEARN_SINTAX:H,ASIDE_LEARN_DESCR:N,ASIDE_EXAMPLES_TITLE:x,SIDE_LEVEL_CHECK:M,SIDE_LEVEL_NUMBER:C,ENTER_BTN:P,EDITOR_HEADER:B,EDITOR_FIELD:W,EDITOR_NUMBER:O,EDITOR_INFO_FIELD:k,EDITOR_WRAPPER:G,EDITOR_INPUT:V,EDITOR_INFO_PRE:F,HIGHLIGHT_TAG:$,HIGHLIGHT_TAG_NAME:U,VIEWER_HEADER:Y,VIEWER_FIELD:q,VIEWER_NUMBERS:K,VIEWER_INFO:j,HINT_SHOW:X,CHEAT_BTN:J,LEVEL_CHEATED:z,BLINKING_INPUT:Q,EDITORS:Z,END_GAME_TITLE:ee,KEY_PRESSED:te,KEY_DISABLED:le,LEVEL_MENU_WRAPPER:ne,LEVELS_MENU_BTN_IMG:se,LEVEL_SIDE_WRAPPER:ae,LEVEL_RESET_BTN:re,LEVEL_FINISHED:ie,GAME_WRAPPER:oe,LEVELS_MENU_BTN:ce,WRONG_ANSWER:pe,PLAYGROUND_HINT:he,TABLE_WRAPPER:me,TABLE_SURFACE:de,TABLE_EDGE:ge,TABLE_LEG:Ee,VIEWER_PRE:ve,WIN:ue,MAIN:Te,EDITOR:Se,PLAYGROUND:Le}=s.constantsClasses;t.Playground=class{constructor(){this.levelNumber=0,this.isCheat=!1,this.isGameFinished=!1,this.bindListners()}start(){this.appendPlayground(),this.appendEditor(),this.appendViewer(),this.appendRightAside(),this.setGameStatus(),this.makeLevelsMenu(),this.setNewLevel(this.levelNumber),this.startListners()}setGameStatus(){const e=localStorage.getItem(o);this.gameStatus=e?JSON.parse(e):{};try{this.levelNumber=Number(localStorage.getItem(i))}catch(e){this.levelNumber=0}}bindListners(){this.playgrMousOverHandler=this.playgrMousOverHandler.bind(this),this.playgrMousOutHandler=this.playgrMousOutHandler.bind(this),this.enterPressedHandler=this.enterPressedHandler.bind(this),this.inputKeyUpHendler=this.inputKeyUpHendler.bind(this),this.clickHandler=this.clickHandler.bind(this),this.removeFinishedText=this.removeFinishedText.bind(this)}startListners(){document.addEventListener("mouseover",this.playgrMousOverHandler),document.addEventListener("mouseout",this.playgrMousOutHandler),this.editorInput.addEventListener("keyup",this.inputKeyUpHendler),this.editorInput.addEventListener("keypress",this.enterPressedHandler),document.addEventListener("click",this.clickHandler)}inputKeyUpHendler(){this.editorInput.value.length>0?this.editorInput.classList.remove("input-want"):this.editorInput.classList.add("input-want")}clickHandler(e){const t=e.target;t.closest(`.${ne}`)?this.levelMenuClickHandler(t):t.closest(`.${re}`)?this.resetGameStatus():!t.closest(`.${ae}`)&&this.levelsSideWrapper.classList.contains(y)?this.closeLevelsMenu():t.closest(`.${P}`)?this.inputCheckValue():t.closest(`.${J}`)?this.cheatBtnHandler():t.closest(`.${Z}`)?this.editorInput.focus():t.closest(`.${ce}`)&&this.levelsMenuBtnHandler()}levelsMenuBtnHandler(){this.levelsSideWrapper.classList.contains(y)?this.closeLevelsMenu():this.openLevelsMenu()}cheatBtnHandler(){return n(this,void 0,void 0,(function*(){this.isCheat=!0,this.editorInput.classList.remove(Q),this.typingText(this.level.levelRightAnswer,this.editorInput),this.editorInput.focus(),this.cheatBtn.classList.add(te),this.cheatBtn.setAttribute(le,""),yield new Promise((e=>{setTimeout(e,500)})),this.cheatBtn.removeAttribute(le),this.cheatBtn.classList.remove(te)}))}typingText(e,t){const l=t;l.value="",e.split("").forEach(((e,t)=>n(this,void 0,void 0,(function*(){yield new Promise((e=>{setTimeout(e,200*t)})),l.value+=e}))))}levelMenuClickHandler(e){var t;return n(this,void 0,void 0,(function*(){const l=Number(null===(t=e.closest(`[${S}]`))||void 0===t?void 0:t.getAttribute(S))||0;l!==this.levelNumber&&(this.isGameFinished=!1,this.closeLevelsMenu(),yield new Promise((e=>{setTimeout(e,300)})),this.setNewLevel(l))}))}enterPressedHandler(e){"Enter"===e.code&&this.inputCheckValue()}inputCheckValue(){return n(this,void 0,void 0,(function*(){if(this.editorInput.focus(),this.isGameFinished)return;const{value:e}=this.editorInput;let t;if(this.enterBtn.classList.add(te),this.enterBtn.setAttribute(le,""),yield new Promise((e=>{setTimeout(e,100)})),this.enterBtn.removeAttribute(le),this.enterBtn.classList.remove(te),e){try{t=[...this.playgroundElement.querySelectorAll(e)]}catch(e){t=null}t&&0!==t.length?t.length&&t.length===this.rightElements.length&&this.isRightAnswer(t)?(this.saveAnswerToStorage(!0),this.winLevel()):(this.saveAnswerToStorage(!1),t.forEach((e=>e.classList.add(pe)))):(this.editors.classList.add(pe),this.saveAnswerToStorage(!1)),this.removeWrongAnswerClass()}}))}saveAnswerToStorage(e){this.gameStatus[this.levelNumber]||(this.gameStatus[this.levelNumber]={levelFinished:!1,cheat:!1,mistakeCount:0});const t=this.gameStatus[this.levelNumber];t&&(e?(t.cheat=this.isCheat,t.levelFinished=!0):t.levelFinished||(t.mistakeCount+=1),localStorage.setItem(o,JSON.stringify(this.gameStatus)))}resetGameStatus(){this.resetProperties(),localStorage.removeItem(o),this.setNewLevel(0),this.closeLevelsMenu()}resetProperties(){this.levelNumber=0,this.gameStatus={},this.isGameFinished=!1,this.isCheat=!1}removeWrongAnswerClass(){return n(this,void 0,void 0,(function*(){yield new Promise((e=>{setTimeout(e,300)})),[...document.body.querySelectorAll(`.${pe}`)].forEach((e=>e.classList.remove(pe)))}))}isRightAnswer(e){let t=!0;return e.forEach((e=>{this.rightElements.includes(e)||(t=!1)})),t}winLevel(){return n(this,void 0,void 0,(function*(){this.rightElements.forEach((e=>n(this,void 0,void 0,(function*(){e.removeAttribute(L),yield new Promise((e=>{setTimeout(e,30)})),e.classList.add(ue)})))),yield new Promise((e=>{setTimeout(e,300)})),this.setNewLevel(this.levelNumber+1)}))}finishGame(){this.isGameFinished=!0,this.endTextDiv=(0,a.generateDomElement)("div",c,document.body,ee),document.addEventListener("click",this.removeFinishedText,{once:!0})}removeFinishedText(){this.endTextDiv.remove(),this.isGameFinished=!1,this.setNewLevel(0)}playgrMousOverHandler(e){if(this.isGameFinished)return;let t=e.target;if(t===this.playgroundElement||!t.closest(`.${Le}`)&&!t.closest(`.${ve}`))return;const l=[...this.playgroundElement.querySelectorAll("*")],n=[...this.viewerPre.querySelectorAll("div")];let s,a,r;if(t.closest(`.${Le}`))a=t,s=l.indexOf(t),r=n[s];else{if(!t.closest(`.${ve}`))return;t=t.closest("div"),s=n.indexOf(t),r=l[s],a=r}t.setAttribute(T,""),r&&r.setAttribute(T,""),this.showHint(a)}playgrMousOutHandler(e){if(this.isGameFinished)return;const t=e.target;t!==this.playgroundElement&&(t.closest(`.${Le}`)||t.closest(".html-viewer"))&&(document.querySelectorAll(`[${T}]`).forEach((e=>e.removeAttribute(T))),this.playgroundHint.classList.remove(X))}showHint(e){const t=e.getBoundingClientRect();this.playgroundHint.style.top=t.top-65+"px",this.playgroundHint.style.left=`${t.left+t.width/2}px`,this.playgroundHint.textContent=this.removeChildrenFromTag(e.outerHTML),this.playgroundHint.classList.add(X)}removeChildrenFromTag(e){const t=e.replace(/^(<[^>]*>).*(<\/[^>]*>)$/is,"$1$2"),l=new RegExp(`( ${T}| ${L})=".*"`);return t.replace(l,"")}setNewLevel(e){return n(this,void 0,void 0,(function*(){let t=e;this.isCheat=this.isLevelCheated(t),this.cleanPage(),t>=r.gameLevels.length?this.finishGame():(t<0&&(t=0),this.level=r.gameLevels[t],localStorage.setItem(i,`${t}`),yield new Promise((e=>{setTimeout(e,300)})),this.levelNumber=t,this.h1.textContent=this.level.levelH1,this.playgroundElement.insertAdjacentHTML("afterbegin",this.level.levelTask),this.rightElements=[...this.playgroundElement.querySelectorAll(this.level.levelRightAnswer)],this.sideTitle.textContent=`Level ${t+1} of ${r.gameLevels.length}`,this.sideLearnSelector.textContent=this.level.levelDescr,this.sideLearnTitle.textContent=this.level.learnTitle,this.sideLearnSintaxis.innerHTML=this.level.learnSelector,this.sideLearnDescription.innerHTML=this.level.promptText,this.appendExamples(),[...this.playgroundElement.children].forEach((e=>{const t=this.highlightHtmlElement(e);this.viewerPre.append(t)})),this.rightElements.forEach((e=>e.setAttribute(L,""))),this.updateLevelMenu(t))}))}isLevelFinished(e=this.levelNumber){var t;return!(!this.gameStatus[e]||!(null===(t=this.gameStatus[e])||void 0===t?void 0:t.levelFinished))}isLevelCheated(e=this.levelNumber){var t;return!(!this.gameStatus[e]||!(null===(t=this.gameStatus[e])||void 0===t?void 0:t.cheat))}cleanPage(){this.editorInput.value="",this.editorInput.focus(),this.playgroundElement.innerHTML="",this.sideLearnDescription.innerHTML="",this.sideLearnSintaxis.innerHTML="",this.examplesWrapper&&(this.examplesWrapper.innerHTML=""),this.viewerPre.innerHTML=""}appendPlayground(){const e=document.querySelector(`.${Le}`);e&&e.remove(),this.h1=document.body.querySelector("h1");const t=document.querySelector(`.${oe}`),l=(0,a.generateDomElement)("div","",t,me);(0,a.generateDomElement)("div","",l,de);const n=(0,a.generateDomElement)("div","",t,ge);(0,a.generateDomElement)("div","",n,Ee),(0,a.generateDomElement)("div","",n,Ee),this.playgroundElement=(0,a.generateDomElement)("div","",l,Le),this.mainSection=document.querySelector(`.${Te}`),this.playgroundHint=(0,a.generateDomElement)("div","",document.body,he)}appendEditor(){if(this.editors=document.querySelector(`.${Z}`),!this.editors)return;const e=this.editors.querySelector(`.${Se}`),t=(0,a.generateDomElement)("div","",e,B);(0,a.generateDomElement)("span",h,t),(0,a.generateDomElement)("span",m,t);const l=(0,a.generateDomElement)("div","",e,W),n=(0,a.generateDomElement)("div","",l,O);for(let e=1;e<21;e+=1)(0,a.generateDomElement)("span",`${e}`,n);const s=(0,a.generateDomElement)("div","",l,k),r=(0,a.generateDomElement)("div","",s,G);this.editorInput=(0,a.generateDomElement)("input","",r,V,Q),this.editorInput.placeholder=E,this.enterBtn=(0,a.generateDomElement)("button",v,r,P),(0,a.generateDomElement)("div","",s,F).innerHTML=p,this.cheatBtn=(0,a.generateDomElement)("button",u,s,J),this.editors.append(e)}appendRightAside(){const e=document.querySelector(".learn-side"),t=(0,a.generateDomElement)("div","",e,A);this.sideTitle=(0,a.generateDomElement)("h2","",t,_),this.sideTitleCompleteMark=(0,a.generateDomElement)("span","",t,I),this.learnWrapper=(0,a.generateDomElement)("div","",e,D),this.sideLearnSelector=(0,a.generateDomElement)("h3","",this.learnWrapper,R),this.sideLearnTitle=(0,a.generateDomElement)("h2","",this.learnWrapper,w),this.sideLearnSintaxis=(0,a.generateDomElement)("h3","",this.learnWrapper,H),this.sideLearnDescription=(0,a.generateDomElement)("div","",this.learnWrapper,N)}appendExamples(){this.level.examples&&this.level.examples.length&&(this.examplesWrapper=(0,a.generateDomElement)("div","",null),this.examplesWrapper&&((0,a.generateDomElement)("h3","Examples",this.examplesWrapper,x),this.level.examples.forEach((e=>{(0,a.generateDomElement)("p","",this.examplesWrapper).innerHTML=e})),this.learnWrapper.append(this.examplesWrapper)))}appendViewer(){const e=document.querySelector(".html-viewer"),t=(0,a.generateDomElement)("div","",e,Y);(0,a.generateDomElement)("span",d,t),(0,a.generateDomElement)("span",g,t);const l=(0,a.generateDomElement)("div","",e,q),n=(0,a.generateDomElement)("div","",l,K);for(let e=1;e<21;e+=1)(0,a.generateDomElement)("span",`${e}`,n);const s=(0,a.generateDomElement)("div","",l,j);this.viewerPre=(0,a.generateDomElement)("div","",s,ve)}highlightHtmlElement(e){const t=e.localName,l=(0,a.generateDomElement)("div","",null);let n="";[...e.attributes].forEach((e=>{n+=`${this.spanWrap("hl-attr-name",` ${e.name}=`)}"${this.spanWrap("hl-attr-value",`${e.value}`)}"`}));const s=e.children.length,r=this.spanWrap($,"&lt;")+this.spanWrap(U,t)+n+this.spanWrap($,"&gt;"),i=this.spanWrap($,"&lt;/")+this.spanWrap(U,t)+this.spanWrap($,"&gt;");return s>0?(l.innerHTML+=r,[...e.children].forEach((e=>l.append(this.highlightHtmlElement(e)))),l.innerHTML+=i):l.innerHTML=`${r}${i}`,l}spanWrap(e,t){return`<span class="${e}">${t}</span>`}makeLevelsMenu(){const e=document.body.querySelector("header");this.levelsSideWrapper=(0,a.generateDomElement)("aside","",this.mainSection,ae),(0,a.generateDomElement)("h2","Choose a level",this.levelsSideWrapper),this.levelsMenuWrapper=(0,a.generateDomElement)("div","",this.levelsSideWrapper,ne),(0,a.generateDomElement)("button","RESET",this.levelsSideWrapper,re),this.levelsMenuBtn=(0,a.generateDomElement)("div","",e,ce),(0,a.generateDomElement)("div","",this.levelsMenuBtn,se),this.makeLevelsList()}updateLevelMenu(e){var t;this.makeLevelsList(),null===(t=this.levelsMenuWrapper.querySelector(`[${S}="${e}"]`))||void 0===t||t.classList.add(f),this.isLevelCheated(e)?this.sideTitleCompleteMark.classList.add(z):(this.sideTitleCompleteMark.classList.remove(z),this.isLevelFinished(e)?this.sideTitleCompleteMark.classList.add(ie):this.sideTitleCompleteMark.classList.remove(ie))}makeLevelsList(){this.levelsMenuWrapper.innerHTML="";for(let e=0;e<r.gameLevels.length;e+=1){const t=(0,a.generateDomElement)("div","",this.levelsMenuWrapper);t.setAttribute(S,`${e}`);const l=(0,a.generateDomElement)("span","",t,M);(0,a.generateDomElement)("span",`${e+1}`,t,C),(0,a.generateDomElement)("span",r.gameLevels[e].learnSelector,t),this.isLevelFinished(e)&&l.classList.add(ie),this.isLevelCheated(e)&&l.classList.add(z)}}closeLevelsMenu(){document.body.classList.remove(b),this.levelsMenuBtn.classList.remove(y),this.levelsSideWrapper.classList.remove(y)}openLevelsMenu(){document.body.classList.add(b),this.levelsMenuBtn.classList.add(y),this.levelsSideWrapper.classList.add(y)}}},768:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.constantsAttributes=t.constantsClasses=t.constantsTexts=t.constantsStorage=void 0,t.constantsStorage={LEVEL_NUMBER:"levelNumber",GAME_STATUS:"gameStatus"},t.constantsTexts={END_GAME:"The Last Level Is Completed!",EDITOR_BEFORE_TITLE:"CSS Editor",EDITOR_TITLE:"style.css",VIEWER_BEFORE_TITLE:"HTML Viewer",VIEWER_TITLE:"index.html",INPUT_PLACEHOLDER:"Tipe in a CSS selector",ENTER_BTN_TITLE:"Enter",HELP_BTN_TITLE:"Help",EDITOR_INFO:"\n  { <br>\n    /* Styles would go here. */<br>\n  }<br>\n<br>\n  /*<br>\n    If you need help, <br>\n    Click on the button below.<br>\n  */\n"},t.constantsClasses={ACTIVE:"active",ACTIVE_MENU:"active-menu",ACTIVE_LEVEL:"active-level",SIDE_LEVEL_CHECK:"level-check",SIDE_LEVEL_NUMBER:"level-number",LEVEL_MENU_WRAPPER:"level-menu-wrapper",LEVEL_SIDE_WRAPPER:"level-side-wrapper",LEVEL_RESET_BTN:"level-reset-btn",LEVELS_MENU_BTN:"level-menu-btn",LEVELS_MENU_BTN_IMG:"level-menu-btn-img",LEVEL_FINISHED:"finished",LEVEL_CHEATED:"cheated",ENTER_BTN:"enter-btn",CHEAT_BTN:"cheat-btn",EDITORS:"editors",ASIDE_HEADER:"side-header",ASIDE_TITLE:"side-title",ASIDE_FINISH_MARK:"title-finish-mark",ASIDE_LEARN_WRAP:"side-learn-wrap",ASIDE_LEARN_SELECTOR:"side-learn-selector",ASIDE_LEARN_TITLE:"side-learn-title",ASIDE_LEARN_SINTAX:"side-learn-sintaxis",ASIDE_LEARN_DESCR:"side-learn-descr",ASIDE_EXAMPLES_TITLE:"side-examples-title",VIEWER_HEADER:"viewer-header",VIEWER_FIELD:"viewer-field",VIEWER_NUMBERS:"viewer-numbers",VIEWER_INFO:"viewer-info",EDITOR_FIELD:"editor-field",EDITOR_NUMBER:"editor-numbers",EDITOR_INFO_FIELD:"editor-info",EDITOR_WRAPPER:"input-wrapper",EDITOR_INPUT:"editor-input",EDITOR_INFO_PRE:"editor-info__pre",EDITOR_HEADER:"editor-header",HIGHLIGHT_TAG:"hl-tag",HIGHLIGHT_TAG_NAME:"hl-tag-name",PLAYGROUND_HINT:"playground-hint",BLINKING_INPUT:"input_blink",END_GAME_TITLE:"end-game-text",HINT_SHOW:"show",WRONG_ANSWER:"wrong-answer",EDITOR:"css-editor",GAME_WRAPPER:"game-wrapper",MAIN:"main",KEY_PRESSED:"pressed",KEY_DISABLED:"disabled",PLAYGROUND:"table",TABLE_WRAPPER:"table-wrapper",TABLE_SURFACE:"table-surface",TABLE_EDGE:"table-edge",TABLE_LEG:"table-leg",VIEWER_PRE:"viewer-pre",WIN:"win"},t.constantsAttributes={LEVEL_NUMB:"data-level-number",TWIST:"twist",HIGHLIGHT:"highlight"}},954:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.CreateElement=t.generateDomElement=void 0,t.generateDomElement=(e,t,l,...n)=>{const s=document.createElement(e),a=[];return n.forEach((e=>{Array.isArray(e)?e.forEach((e=>a.push(e))):e&&e.split(" ").forEach((e=>a.push(e)))})),a.length&&s.classList.add(...a),s.textContent=t,l&&l.append(s),s},t.CreateElement=class{constructor(e,t="",...l){this.innerText=t,this.classes=l,this.element=document.createElement(e),this.setupEl()}setupEl(){const e=[];this.classes.forEach((t=>{Array.isArray(t)?t.forEach((t=>e.push(t))):t&&t.split(" ").forEach((t=>e.push(t)))})),e.length&&this.element.classList.add(...e),this.element.textContent=this.innerText}}},364:function(e,t,l){e.exports=l.p+"assets/imagesrs-school.png"},259:function(e,t,l){e.exports=l.p+"assets/imagesukraine_stand.png"}},t={};function l(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,l),a.exports}l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e;l.g.importScripts&&(e=l.g.location+"");var t=l.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var s=n.length-1;s>-1&&!e;)e=n[s--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=e}(),l(325),l(364),l(259),(new(l(68).Playground)).start()}();