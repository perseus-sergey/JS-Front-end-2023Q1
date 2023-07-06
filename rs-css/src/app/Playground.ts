import {
  constantsStorage,
  constantsTexts,
  constantsAttributes,
  constantsClasses,
} from './auxiliary/constants';
import { ILevel, IUserStatus } from './auxiliary/types';
import { generateDomElement, delay } from './auxiliary/utilites';
import { gameLevels } from './Levels';

const {
  LEVEL_NUMBER,
  GAME_STATUS,
} = constantsStorage;

const {
  END_GAME,
  EDITOR_INFO,
  EDITOR_BEFORE_TITLE,
  EDITOR_TITLE,
  VIEWER_BEFORE_TITLE,
  VIEWER_TITLE,
  INPUT_PLACEHOLDER,
  ENTER_BTN_TITLE,
  HELP_BTN_TITLE,
} = constantsTexts;

const {
  HIGHLIGHT,
  LEVEL_NUMB,
  TWIST,
} = constantsAttributes;

const {
  ACTIVE,
  ACTIVE_MENU,
  ACTIVE_LEVEL,
  ASIDE_HEADER,
  ASIDE_TITLE,
  ASIDE_FINISH_MARK,
  ASIDE_LEARN_WRAP,
  ASIDE_LEARN_SELECTOR,
  ASIDE_LEARN_TITLE,
  ASIDE_LEARN_SINTAX,
  ASIDE_LEARN_DESCR,
  ASIDE_EXAMPLES_TITLE,
  SIDE_LEVEL_CHECK,
  SIDE_LEVEL_NUMBER,
  ENTER_BTN,
  EDITOR_HEADER,
  EDITOR_FIELD,
  EDITOR_NUMBER,
  EDITOR_INFO_FIELD,
  EDITOR_WRAPPER,
  EDITOR_INPUT,
  EDITOR_INFO_PRE,
  HIGHLIGHT_TAG,
  HIGHLIGHT_TAG_NAME,
  VIEWER_HEADER,
  VIEWER_FIELD,
  VIEWER_NUMBERS,
  VIEWER_INFO,
  HINT_SHOW,
  CHEAT_BTN,
  LEVEL_CHEATED,
  BLINKING_INPUT,
  EDITORS,
  END_GAME_TITLE,
  KEY_PRESSED,
  KEY_DISABLED,
  LEVEL_MENU_WRAPPER,
  LEVELS_MENU_BTN_IMG,
  LEVEL_SIDE_WRAPPER,
  LEVEL_RESET_BTN,
  LEVEL_FINISHED,
  GAME_WRAPPER,
  LEVELS_MENU_BTN,
  WRONG_ANSWER,
  PLAYGROUND_HINT,
  TABLE_WRAPPER,
  TABLE_SURFACE,
  TABLE_EDGE,
  TABLE_LEG,
  VIEWER_PRE,
  WIN,
  MAIN,
  EDITOR,
  PLAYGROUND,
} = constantsClasses;

export class Playground {
  constructor() {
    this.bindListners();
  }

  private level!: ILevel;

  private h1!: HTMLElement;

  private mainSection!: HTMLElement;

  private enterBtn!: HTMLElement;

  private cheatBtn!: HTMLElement;

  private levelsMenuBtn!: HTMLElement;

  private playgroundElement!: HTMLElement;

  private rightElements!: HTMLElement[];

  private playgroundHint!: HTMLElement;

  private editors!: HTMLElement;

  private viewerPre!: HTMLDivElement;

  private editorInput!: HTMLInputElement;

  private sideTitle!: HTMLInputElement;

  private sideTitleCompleteMark!: HTMLInputElement;

  private levelsSideWrapper!: HTMLInputElement;

  private levelsMenuWrapper!: HTMLInputElement;

  private sideLearnSelector!: HTMLInputElement;

  private sideLearnTitle!: HTMLInputElement;

  private sideLearnSintaxis!: HTMLInputElement;

  private sideLearnDescription!: HTMLInputElement;

  private learnWrapper!: HTMLInputElement;

  private examplesWrapper!: HTMLInputElement;

  private endTextDiv!: HTMLInputElement;

  public levelNumber = 0;

  public gameStatus!: Partial<IUserStatus>;

  public isCheat = false;

  public isGameFinished = false;

  public start(): void {
    this.appendPlayground();
    this.appendEditor();
    this.appendViewer();
    this.appendRightAside();
    this.setGameStatus();
    this.makeLevelsMenu();
    this.setNewLevel(this.levelNumber);
    this.startListners();
  }

  private setGameStatus(): void {
    const storData = localStorage.getItem(GAME_STATUS);
    this.gameStatus = storData ? JSON.parse(storData) : {};
    try {
      this.levelNumber = Number(localStorage.getItem(LEVEL_NUMBER));
    } catch (error) {
      this.levelNumber = 0;
    }
  }

  private bindListners(): void {
    this.playgrMousOverHandler = this.playgrMousOverHandler.bind(this);
    this.playgrMousOutHandler = this.playgrMousOutHandler.bind(this);
    this.enterPressedHandler = this.enterPressedHandler.bind(this);
    this.inputBlinkHendler = this.inputBlinkHendler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.removeFinishedText = this.removeFinishedText.bind(this);
  }

  private startListners(): void {
    document.addEventListener('mouseover', this.playgrMousOverHandler);
    document.addEventListener('mouseout', this.playgrMousOutHandler);
    this.editorInput.addEventListener('keyup', this.inputBlinkHendler);
    this.editorInput.addEventListener('keypress', this.enterPressedHandler);
    document.addEventListener('click', this.clickHandler);
  }

  private inputBlinkHendler(): void {
    if (this.editorInput.value.length > 0) this.editorInput.classList.remove(BLINKING_INPUT);
    else this.editorInput.classList.add(BLINKING_INPUT);
  }

  private clickHandler(event: Event): void {
    this.inputBlinkHendler();
    const target = event.target as HTMLElement;

    if (target.closest(`.${LEVEL_MENU_WRAPPER}`)) this.levelMenuClickHandler(target);
    else if (target.closest(`.${LEVEL_RESET_BTN}`)) this.resetGameStatus();
    else if (!target.closest(`.${LEVEL_SIDE_WRAPPER}`) && this.levelsSideWrapper.classList.contains(ACTIVE)) this.closeLevelsMenu();
    else if (target.closest(`.${ENTER_BTN}`)) this.inputCheckValue();
    else if (target.closest(`.${CHEAT_BTN}`)) this.cheatBtnHandler();
    else if (target.closest(`.${EDITORS}`)) this.editorInput.focus();
    else if (target.closest(`.${LEVELS_MENU_BTN}`)) this.levelsMenuBtnHandler();
  }

  private levelsMenuBtnHandler(): void {
    if (this.levelsSideWrapper.classList.contains(ACTIVE)) {
      this.closeLevelsMenu();
    } else {
      this.openLevelsMenu();
    }
  }

  private async cheatBtnHandler(): Promise<void> {
    this.isCheat = true;
    const input = this.editorInput;
    this.inputBlinkHendler();
    input.value = '';
    this.cheatBtn.classList.add(KEY_PRESSED);
    this.cheatBtn.setAttribute(KEY_DISABLED, '');

    this.typingText(this.level.levelRightAnswer, input);
    input.focus();

    await delay(5000);
    this.cheatBtn.removeAttribute(KEY_DISABLED);
    this.cheatBtn.classList.remove(KEY_PRESSED);
  }

  private typingText(text: string, inputElement: HTMLInputElement): void {
    const elem = inputElement;
    elem.value = '';
    text.split('').forEach(async (letter, indx) => {
      await delay(indx * 200);
      elem.value += letter;
    });
  }

  private async levelMenuClickHandler(target: HTMLElement): Promise<void> {
    const chosenLevelNum = Number(target.closest(`[${LEVEL_NUMB}]`)?.getAttribute(LEVEL_NUMB)) || 0;
    if (chosenLevelNum === this.levelNumber) return;
    this.isGameFinished = false;
    this.closeLevelsMenu();
    this.setNewLevel(chosenLevelNum);
  }

  private enterPressedHandler(event: KeyboardEvent): void {
    if (event.code === 'Enter') this.inputCheckValue();
  }

  private async inputCheckValue(): Promise<void> {
    this.editorInput.focus();
    if (this.isGameFinished) return;
    const { value } = this.editorInput;
    let answerElems: HTMLElement[] | null;

    this.enterBtn.classList.add(KEY_PRESSED);
    this.enterBtn.setAttribute(KEY_DISABLED, '');

    await delay(100);
    this.enterBtn.removeAttribute(KEY_DISABLED);
    this.enterBtn.classList.remove(KEY_PRESSED);
    if (!value) return;
    try {
      answerElems = [...this.playgroundElement.querySelectorAll(value)] as HTMLElement[];
    } catch (error) {
      answerElems = null;
    }
    if (!answerElems || answerElems.length === 0) {
      this.editors.classList.add(WRONG_ANSWER);
      this.saveAnswerToStorage(false);
    } else if (
      answerElems.length
      && answerElems.length === this.rightElements.length
      && this.isRightAnswer(answerElems)
    ) {
      this.saveAnswerToStorage(true);
      this.winLevel();
    } else {
      this.saveAnswerToStorage(false);
      answerElems.forEach((ansEl) => ansEl.classList.add(WRONG_ANSWER));
    }
    this.removeWrongAnswerClass();
  }

  private saveAnswerToStorage(isCorrectAnswer: boolean): void {
    if (!this.gameStatus[this.levelNumber]) {
      this.gameStatus[this.levelNumber] = {
        levelFinished: false,
        cheat: false,
        mistakeCount: 0,
      };
    }

    const levelStatus = this.gameStatus[this.levelNumber];
    if (!levelStatus) return;

    if (!isCorrectAnswer) {
      if (!levelStatus.levelFinished) levelStatus.mistakeCount += 1;
    } else {
      levelStatus.cheat = this.isCheat;
      levelStatus.levelFinished = true;
    }

    localStorage.setItem(GAME_STATUS, JSON.stringify(this.gameStatus));
  }

  public resetGameStatus(): void {
    this.resetProperties();
    localStorage.removeItem(GAME_STATUS);
    this.setNewLevel(0);
    this.closeLevelsMenu();
  }

  public resetProperties(): void {
    this.levelNumber = 0;
    this.gameStatus = {};
    this.isGameFinished = false;
    this.isCheat = false;
  }

  private async removeWrongAnswerClass(): Promise<void> {
    await delay(300);
    [...document.body.querySelectorAll(`.${WRONG_ANSWER}`)]
      .forEach((el) => el.classList.remove(WRONG_ANSWER));
  }

  private isRightAnswer(answerElems: HTMLElement[]): boolean {
    let isWin = true;
    answerElems.forEach((ansEl) => {
      if (!this.rightElements.includes(ansEl)) isWin = false;
    });
    return isWin;
  }

  private async winLevel(): Promise<void> {
    this.rightElements.forEach(async (ansEl) => {
      ansEl.removeAttribute(TWIST);
      await delay(30);
      ansEl.classList.add(WIN);
    });
    await delay(300);
    this.setNewLevel(this.levelNumber + 1);
  }

  private finishGame(): void {
    this.isGameFinished = true;
    this.endTextDiv = generateDomElement('div', END_GAME, document.body, END_GAME_TITLE);
    document.addEventListener('click', this.removeFinishedText, { once: true });
  }

  private removeFinishedText(): void {
    this.endTextDiv.remove();
    this.isGameFinished = false;
    this.setNewLevel(0);
  }

  private playgrMousOverHandler(event: Event):void {
    if (this.isGameFinished) return;
    let el = event.target as Element;
    if (el === this.playgroundElement || (!el.closest(`.${PLAYGROUND}`) && !el.closest(`.${VIEWER_PRE}`))) return;

    const playgrElmnts = [...this.playgroundElement.querySelectorAll('*')] as Element[];
    const viewElements = [...this.viewerPre.querySelectorAll('div')] as Element[];
    let indx: number;
    let playEl: Element;
    let equalEl: Element;
    if (el.closest(`.${PLAYGROUND}`)) {
      playEl = el;
      indx = playgrElmnts.indexOf(el);
      equalEl = viewElements[indx];
    } else if (el.closest(`.${VIEWER_PRE}`)) {
      el = el.closest('div') as Element;
      indx = viewElements.indexOf(el);
      equalEl = playgrElmnts[indx];
      playEl = equalEl;
    } else return;
    el.setAttribute(HIGHLIGHT, '');
    if (equalEl) equalEl.setAttribute(HIGHLIGHT, '');
    this.showHint(playEl);
  }

  private playgrMousOutHandler(event: Event):void {
    if (this.isGameFinished) return;
    const elem = event.target as HTMLElement;

    if (elem === this.playgroundElement || (!elem.closest(`.${PLAYGROUND}`) && !elem.closest('.html-viewer'))) return;
    const highlightes = document.querySelectorAll(`[${HIGHLIGHT}]`);
    highlightes.forEach((el) => el.removeAttribute(HIGHLIGHT));
    this.playgroundHint.classList.remove(HINT_SHOW);
  }

  private showHint(playgrElem: Element): void {
    const elPosition = playgrElem.getBoundingClientRect();
    this.playgroundHint.style.top = `${elPosition.top - 65}px`;
    this.playgroundHint.style.left = `${elPosition.left + (elPosition.width / 2)}px`;

    this.playgroundHint.textContent = this.removeChildrenFromTag(playgrElem.outerHTML);
    this.playgroundHint.classList.add(HINT_SHOW);
  }

  public removeChildrenFromTag(outerHTML: string): string {
    const tag = outerHTML.replace(/^(<[^>]*>).*(<\/[^>]*>)$/si, '$1$2');
    const regex = new RegExp(`( ${HIGHLIGHT}| ${TWIST})=".*"`);
    return tag.replace(regex, '');
  }

  private async setNewLevel(levelNumber: number): Promise<void> {
    let levNumber = levelNumber;
    this.isCheat = this.isLevelCheated(levNumber);
    this.cleanPage();
    if (levNumber >= gameLevels.length) {
      this.finishGame();
      return;
    }
    if (levNumber < 0) levNumber = 0;
    this.level = gameLevels[levNumber];
    localStorage.setItem(LEVEL_NUMBER, `${levNumber}`);
    this.levelNumber = levNumber;

    this.inputBlinkHendler();
    this.h1.textContent = this.level.levelH1;
    this.playgroundElement.insertAdjacentHTML('afterbegin', this.level.levelTask);
    this.rightElements = [...this.playgroundElement
      .querySelectorAll(this.level.levelRightAnswer)] as HTMLElement[];
    this.sideTitle.textContent = `Level ${levNumber + 1} of ${gameLevels.length}`;
    this.sideLearnSelector.textContent = this.level.levelDescr;
    this.sideLearnTitle.textContent = this.level.learnTitle;
    this.sideLearnSintaxis.innerHTML = this.level.learnSelector;
    this.sideLearnDescription.innerHTML = this.level.promptText;
    this.appendExamples();
    const tableElmts = [...this.playgroundElement.children] as HTMLElement[];
    tableElmts.forEach((el) => {
      const divWrapped = this.highlightHtmlElement(el);
      this.viewerPre.append(divWrapped);
    });
    this.rightElements.forEach((el) => el.setAttribute(TWIST, ''));
    this.updateLevelMenu(levNumber);
  }

  private isLevelFinished(levelNumb = this.levelNumber): boolean {
    return !!((this.gameStatus[levelNumb] && this.gameStatus[levelNumb]?.levelFinished));
  }

  private isLevelCheated(levelNumb = this.levelNumber): boolean {
    return !!((this.gameStatus[levelNumb] && this.gameStatus[levelNumb]?.cheat));
  }

  private cleanPage(): void {
    this.editorInput.value = '';
    this.editorInput.focus();
    this.playgroundElement.innerHTML = '';
    this.sideLearnDescription.innerHTML = '';
    this.sideLearnSintaxis.innerHTML = '';
    if (this.examplesWrapper) this.examplesWrapper.innerHTML = '';
    this.viewerPre.innerHTML = '';
  }

  private appendPlayground(): void {
    const domPlayground = document.querySelector(`.${PLAYGROUND}`);
    if (domPlayground) domPlayground.remove();

    this.h1 = document.body.querySelector('h1') as HTMLElement;

    const gameWrapper = document.querySelector(`.${GAME_WRAPPER}`) as HTMLElement;
    const tableWrapper = generateDomElement('div', '', gameWrapper, TABLE_WRAPPER);
    generateDomElement('div', '', tableWrapper, TABLE_SURFACE);
    const tableEdge = generateDomElement('div', '', gameWrapper, TABLE_EDGE);
    generateDomElement('div', '', tableEdge, TABLE_LEG);
    generateDomElement('div', '', tableEdge, TABLE_LEG);

    this.playgroundElement = generateDomElement('div', '', tableWrapper, PLAYGROUND);

    this.mainSection = document.querySelector(`.${MAIN}`) as HTMLElement;
    this.playgroundHint = generateDomElement('div', '', document.body, PLAYGROUND_HINT);
  }

  private appendEditor(): void {
    this.editors = document.querySelector(`.${EDITORS}`) as HTMLDivElement;
    if (!this.editors) return;
    const editorWrap = this.editors.querySelector(`.${EDITOR}`) as HTMLDivElement;
    const editorHeader = generateDomElement('div', '', editorWrap, EDITOR_HEADER);
    generateDomElement('span', EDITOR_BEFORE_TITLE, editorHeader);
    generateDomElement('span', EDITOR_TITLE, editorHeader);
    const editorField = generateDomElement('div', '', editorWrap, EDITOR_FIELD);
    const lefNumbers = generateDomElement('div', '', editorField, EDITOR_NUMBER);
    for (let i = 1; i < 21; i += 1) {
      generateDomElement('span', `${i}`, lefNumbers);
    }
    const editorInfoField = generateDomElement('div', '', editorField, EDITOR_INFO_FIELD);
    const inputWrapper = generateDomElement('div', '', editorInfoField, EDITOR_WRAPPER);
    this.editorInput = generateDomElement('input', '', inputWrapper, EDITOR_INPUT, BLINKING_INPUT);
    this.editorInput.placeholder = INPUT_PLACEHOLDER;
    this.enterBtn = generateDomElement('button', ENTER_BTN_TITLE, inputWrapper, ENTER_BTN);
    const editorInfoPre = generateDomElement('div', '', editorInfoField, EDITOR_INFO_PRE);
    editorInfoPre.innerHTML = EDITOR_INFO;
    this.cheatBtn = generateDomElement('button', HELP_BTN_TITLE, editorInfoField, CHEAT_BTN);

    this.editors.append(editorWrap);
  }

  private appendRightAside(): void {
    const rightAside = document.querySelector('.learn-side') as HTMLElement;

    const sideHeader = generateDomElement('div', '', rightAside, ASIDE_HEADER);
    this.sideTitle = generateDomElement('h2', '', sideHeader, ASIDE_TITLE);
    this.sideTitleCompleteMark = generateDomElement('span', '', sideHeader, ASIDE_FINISH_MARK);

    this.learnWrapper = generateDomElement('div', '', rightAside, ASIDE_LEARN_WRAP);
    this.sideLearnSelector = generateDomElement('h3', '', this.learnWrapper, ASIDE_LEARN_SELECTOR);
    this.sideLearnTitle = generateDomElement('h2', '', this.learnWrapper, ASIDE_LEARN_TITLE);
    this.sideLearnSintaxis = generateDomElement('h3', '', this.learnWrapper, ASIDE_LEARN_SINTAX);
    this.sideLearnDescription = generateDomElement('div', '', this.learnWrapper, ASIDE_LEARN_DESCR);
  }

  private appendExamples(): void {
    if (!this.level.examples || !this.level.examples.length) return;
    this.examplesWrapper = generateDomElement('div', '', null);
    if (this.examplesWrapper) {
      generateDomElement('h3', 'Examples', this.examplesWrapper, ASIDE_EXAMPLES_TITLE);
      this.level.examples.forEach((exmpl) => {
        const ex = generateDomElement('p', '', this.examplesWrapper);
        ex.innerHTML = exmpl;
      });
      this.learnWrapper.append(this.examplesWrapper);
    }
  }

  private appendViewer(): void {
    const viewerWrap = document.querySelector('.html-viewer') as HTMLElement;
    const viewerHeader = generateDomElement('div', '', viewerWrap, VIEWER_HEADER);
    generateDomElement('span', VIEWER_BEFORE_TITLE, viewerHeader);
    generateDomElement('span', VIEWER_TITLE, viewerHeader);

    const viewerField = generateDomElement('div', '', viewerWrap, VIEWER_FIELD);

    const viewerNumbers = generateDomElement('div', '', viewerField, VIEWER_NUMBERS);
    for (let i = 1; i < 21; i += 1) {
      generateDomElement('span', `${i}`, viewerNumbers);
    }

    const viewerInfoField = generateDomElement('div', '', viewerField, VIEWER_INFO);

    this.viewerPre = generateDomElement('div', '', viewerInfoField, VIEWER_PRE);
  }

  private highlightHtmlElement(elem: HTMLElement): HTMLElement {
    const tagName = elem.localName;
    const wrapDiv = generateDomElement('div', '', null);
    let attrStr = '';
    const attrs = [...elem.attributes];
    attrs.forEach((attr) => {
      attrStr += `${this.spanWrap('hl-attr-name', ` ${attr.name}=`)}"${this.spanWrap('hl-attr-value', `${attr.value}`)}"`;
    });

    const childLen = elem.children.length;
    const wrapStartDivText = this.spanWrap(HIGHLIGHT_TAG, '&lt;') + this.spanWrap(HIGHLIGHT_TAG_NAME, tagName) + attrStr + this.spanWrap(HIGHLIGHT_TAG, '&gt;');
    const wrapEndDivText = this.spanWrap(HIGHLIGHT_TAG, '&lt;/') + this.spanWrap(HIGHLIGHT_TAG_NAME, tagName) + this.spanWrap(HIGHLIGHT_TAG, '&gt;');

    if (childLen > 0) {
      wrapDiv.innerHTML += wrapStartDivText;

      const elChildren = [...elem.children] as HTMLElement[];
      elChildren.forEach((el: HTMLElement) => wrapDiv.append(this.highlightHtmlElement(el)));

      wrapDiv.innerHTML += wrapEndDivText;
    } else {
      wrapDiv.innerHTML = `${wrapStartDivText}${wrapEndDivText}`;
    }
    return wrapDiv;
  }

  private spanWrap(className: string, str: string): string {
    return `<span class="${className}">${str}</span>`;
  }

  // --------------===========LEVELS RIGHT MENU =========-----------

  private makeLevelsMenu(): void {
    const header = document.body.querySelector('header');
    this.levelsSideWrapper = generateDomElement('aside', '', this.mainSection, LEVEL_SIDE_WRAPPER);
    generateDomElement('h2', 'Choose a level', this.levelsSideWrapper);
    this.levelsMenuWrapper = generateDomElement('div', '', this.levelsSideWrapper, LEVEL_MENU_WRAPPER);
    generateDomElement('button', 'RESET', this.levelsSideWrapper, LEVEL_RESET_BTN);
    this.levelsMenuBtn = generateDomElement('div', '', header, LEVELS_MENU_BTN);
    generateDomElement('div', '', this.levelsMenuBtn, LEVELS_MENU_BTN_IMG);
    this.makeLevelsList();
  }

  private updateLevelMenu(levNumber: number): void {
    this.makeLevelsList();
    this.levelsMenuWrapper.querySelector(`[${LEVEL_NUMB}="${levNumber}"]`)?.classList.add(ACTIVE_LEVEL);
    if (this.isLevelCheated(levNumber)) {
      this.sideTitleCompleteMark.classList.add(LEVEL_CHEATED);
      return;
    }
    this.sideTitleCompleteMark.classList.remove(LEVEL_CHEATED);

    if (this.isLevelFinished(levNumber)) {
      this.sideTitleCompleteMark.classList.add(LEVEL_FINISHED);
    } else {
      this.sideTitleCompleteMark.classList.remove(LEVEL_FINISHED);
    }
  }

  private makeLevelsList(): void {
    this.levelsMenuWrapper.innerHTML = '';
    for (let n = 0; n < gameLevels.length; n += 1) {
      const wrapper = generateDomElement('div', '', this.levelsMenuWrapper);
      wrapper.setAttribute(LEVEL_NUMB, `${n}`);
      const checkMark = generateDomElement('span', '', wrapper, SIDE_LEVEL_CHECK);
      generateDomElement('span', `${n + 1}`, wrapper, SIDE_LEVEL_NUMBER);
      generateDomElement('span', gameLevels[n].learnSelector, wrapper);

      if (this.isLevelFinished(n)) checkMark.classList.add(LEVEL_FINISHED);
      if (this.isLevelCheated(n)) checkMark.classList.add(LEVEL_CHEATED);
    }
  }

  public closeLevelsMenu(): void {
    document.body.classList.remove(ACTIVE_MENU);
    this.levelsMenuBtn.classList.remove(ACTIVE);
    this.levelsSideWrapper.classList.remove(ACTIVE);
  }

  private openLevelsMenu(): void {
    document.body.classList.add(ACTIVE_MENU);
    this.levelsMenuBtn.classList.add(ACTIVE);
    this.levelsSideWrapper.classList.add(ACTIVE);
  }
}
