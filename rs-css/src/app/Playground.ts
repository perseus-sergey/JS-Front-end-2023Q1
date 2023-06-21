// import Cell from './Cell';
// import { constants, menuClasses } from './constants';
// import { gameTimer } from './gameTimer';
// import { gameLevel } from './Level';
// import { generateDomElement } from './utilities';

import { constants } from './auxiliary/constants';
import { ILevel, IUserStatus } from './auxiliary/types';
import { generateDomElement } from './auxiliary/utilites';
import { gameLevels } from './Levels';

// import boom from '../assets/sounds/boom.wav';
// import audioEndLev from '../assets/sounds/end-level.wav';
// import deleteSound from '../assets/sounds/delete.wav';
// import choise from '../assets/sounds/choise.wav';
// import keyboard from '../assets/sounds/keyboard.wav';
// import shortBell from '../assets/sounds/upali-dengi-na-igrovoy-schet.wav';

const {
  ACTIVE_CLASS,
  ACTIVE_MENU_CLASS,
  ACTIVE_LEVEL_CLASS,
  SIDE_LEVEL_CHECK_CLASS,
  SIDE_LEVEL_NUMBER_CLASS,
  ENTER_BTN_CLASS,
  EDITORS_CLASS,
  LEVEL_MENU_WRAPPER_CLASS,
  LEVELS_MENU_BTN_IMG_CLASS,
  ATTR_LEVEL_NUMBER,
  LEVEL_SIDE_WRAPPER_CLASS,
  LEVEL_RESET_BTN_CLASS,
  LEVEL_FINISHED_CLASS,
  GAME_WRAPPER_CLASS,
  LEVELS_MENU_BTN_CLASS,
  COUNTER_CLASS,
  CLICK_CLASS,
  CELL_ROW_TAG,
  CELL_ROW_CLASS,
  CELL_TAG,
  END_GAME_TEXT_CLASS,
  END_GAME_TEXT_WIN,
  END_GAME_TEXT_LOSE,
  FONT_RATIO,
  STORAGE_LEVEL_NUMBER,
  STORAGE_GAME_STATUS,
  WRONG_ANSWER_CLASS,
  LAST_WINS_KEY,
  LOCAL_DATA_KEY,
  EDITOR_INFO_TEXT,
  MAIN_CLASS,
  EDITOR_CLASS,
  VIEWER_CLASS,
  PLAYGROUND_TAG,
  PLAYGROUND_CLASS,
  // TIMER_MS_CLASS,
  // TIMER_SEC_CLASS,
  // TIMER_MIN_CLASS,
} = constants;

// const { SOUND_SLIDER, THEME_SLIDER } = menuClasses;

export class Playground {
  constructor(private level: ILevel = gameLevels[11], private savingData = '', public isSound = true) {
    // this.savingData = savingData;
    // this.isSound = isSound;
    // this.setSounds();
    // this.getSavingData(savingData);
    this.playgrMousOverHandler = this.playgrMousOverHandler.bind(this);
    this.playgrMousOutHandler = this.playgrMousOutHandler.bind(this);
    this.enterPressedHandler = this.enterPressedHandler.bind(this);
    this.inputKeyUpHendler = this.inputKeyUpHendler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    // this.mediaQueryHandler = this.mediaQueryHandler.bind(this);
    this.start();
  }

  private h1!: HTMLElement;

  private mainSection!: HTMLElement;

  private enterBtn!: HTMLElement;

  private levelsMenuBtn!: HTMLElement;

  private playgroundElement!: HTMLElement;

  private rightElements!: HTMLElement[];

  private playgroundHint!: HTMLElement;

  private editors!: HTMLElement;

  private viewerPre!: HTMLDivElement;

  private editorInput!: HTMLInputElement;

  private sideTitle!: HTMLInputElement;

  private sideTitleCompleteMark!: HTMLInputElement;

  private sideNavPrev!: HTMLInputElement;

  private levelsSideWrapper!: HTMLInputElement;

  private levelsMenuWrapper!: HTMLInputElement;

  private levelsResetBtn!: HTMLInputElement;

  private sideNavNext!: HTMLInputElement;

  private sideProgress!: HTMLInputElement;

  private sideLearnSelector!: HTMLInputElement;

  private sideLearnTitle!: HTMLInputElement;

  private sideLearnSintaxis!: HTMLInputElement;

  private sideLearnDescription!: HTMLInputElement;

  private learnWrapper!: HTMLInputElement;

  private examplesWrapper!: HTMLInputElement;

  private levelNumber = 0;

  private gameStatus!: Partial<IUserStatus>;

  private isCheat = false;

  private isGameFinished = false;

  //   isSound = true;

  //   isDarkTheme = true;

  private start(): void {
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
    const storData = localStorage.getItem(STORAGE_GAME_STATUS);
    this.gameStatus = storData ? JSON.parse(storData) : {};
    try {
      this.levelNumber = Number(localStorage.getItem(STORAGE_LEVEL_NUMBER));
    } catch (error) {
      this.levelNumber = 0;
    }
  }

  private startListners(): void {
    document.addEventListener('mouseover', this.playgrMousOverHandler);
    document.addEventListener('mouseout', this.playgrMousOutHandler);
    this.editorInput.addEventListener('keyup', this.inputKeyUpHendler);
    this.editorInput.addEventListener('keypress', this.enterPressedHandler);
    document.addEventListener('click', this.clickHandler);
  }

  private endListners(): void {
    document.removeEventListener('mouseover', this.playgrMousOverHandler);
    document.removeEventListener('mouseout', this.playgrMousOutHandler);
    this.editorInput.removeEventListener('keyup', this.inputKeyUpHendler);
    this.editorInput.removeEventListener('keypress', this.enterPressedHandler);
    document.removeEventListener('click', this.clickHandler);
  }

  private inputKeyUpHendler(): void {
    if (this.editorInput.value.length > 0) this.editorInput.classList.remove('input-want');
    else this.editorInput.classList.add('input-want');
  }

  private clickHandler(event: Event): void {
    const target = event.target as HTMLElement;
    console.log('target', target);
    // console.log('curtarget', event.currentTarget);
    if (target.closest(`.${LEVEL_MENU_WRAPPER_CLASS}`)) this.levelMenuClickHandler(target);
    else if (target.closest(`.${LEVEL_RESET_BTN_CLASS}`)) this.resetGameStatus();
    else if (!target.closest(`.${LEVEL_SIDE_WRAPPER_CLASS}`) && this.levelsSideWrapper.classList.contains(ACTIVE_CLASS)) this.closeLevelsMenu();
    else if (target.closest(`.${ENTER_BTN_CLASS}`)) this.inputCheckValue();
    else if (target.closest(`.${EDITORS_CLASS}`)) this.editorInput.focus();
    else if (target.closest(`.${LEVELS_MENU_BTN_CLASS}`)) this.levelsMenuBtnClickHandler();
  }

  private levelsMenuBtnClickHandler(): void {
    if (this.levelsSideWrapper.classList.contains(ACTIVE_CLASS)) {
      this.closeLevelsMenu();
    } else {
      this.openLevelsMenu();
    }
  }

  private async levelMenuClickHandler(target: HTMLElement): Promise<void> {
    const chosenLevelNum = Number(target.closest(`[${ATTR_LEVEL_NUMBER}]`)?.getAttribute(ATTR_LEVEL_NUMBER)) || 0;
    if (chosenLevelNum === this.levelNumber) return;
    this.isGameFinished = false;
    this.closeLevelsMenu();
    await new Promise((resolve) => { setTimeout(resolve, 300); });
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

    this.enterBtn.classList.add('pressed');
    this.enterBtn.setAttribute('disabled', '');

    await new Promise((resolve) => { setTimeout(resolve, 100); });
    this.enterBtn.removeAttribute('disabled');
    this.enterBtn.classList.remove('pressed');
    if (!value) return;
    try {
      answerElems = [...this.playgroundElement.querySelectorAll(value)] as HTMLElement[];
    } catch (error) {
      answerElems = null;
    }
    if (!answerElems || answerElems.length === 0) {
      this.editors.classList.add(WRONG_ANSWER_CLASS);
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
      answerElems.forEach((ansEl) => ansEl.classList.add(WRONG_ANSWER_CLASS));
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

    localStorage.setItem(STORAGE_GAME_STATUS, JSON.stringify(this.gameStatus));
  }

  private resetGameStatus(): void {
    this.levelNumber = 0;
    this.gameStatus = {};
    localStorage.removeItem(STORAGE_GAME_STATUS);
    this.isGameFinished = false;

    [...document.body.querySelectorAll(`.${LEVEL_FINISHED_CLASS}`)].forEach((el) => el.classList.remove(LEVEL_FINISHED_CLASS));
    this.setNewLevel(0);
    this.closeLevelsMenu();
  }

  private async removeWrongAnswerClass(): Promise<void> {
    await new Promise((resolve) => { setTimeout(resolve, 300); });
    [...document.body.querySelectorAll(`.${WRONG_ANSWER_CLASS}`)]
      .forEach((el) => el.classList.remove(WRONG_ANSWER_CLASS));
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
      ansEl.removeAttribute('twist');
      await new Promise((resolve) => { setTimeout(resolve, 30); });
      ansEl.classList.add('win');
    });

    // this.levelNumber += 1;
    // if (this.levelNumber >= gameLevels.length) {
    //   this.finishGame();
    //   return;
    // }
    await new Promise((resolve) => { setTimeout(resolve, 300); });
    this.updateLevelMenu(true);
    this.setNewLevel(this.levelNumber + 1);
  }

  private async loose(answerElems: HTMLElement | null): Promise<void> {
    if (!answerElems) this.editors.classList.add(WRONG_ANSWER_CLASS);
    else answerElems.classList.add(WRONG_ANSWER_CLASS);
    await new Promise((resolve) => { setTimeout(resolve, 300); });
    if (answerElems) answerElems.classList.remove(WRONG_ANSWER_CLASS);
    this.editors.classList.remove(WRONG_ANSWER_CLASS);
  }

  private playgrMousOverHandler(event: Event):void {
    if (this.isGameFinished) return;
    let el = event.target as HTMLElement;
    if (el === this.playgroundElement || (!el.closest(`.${PLAYGROUND_CLASS}`) && !el.closest('.viewer-pre'))) return;

    const playgrElmnts = [...this.playgroundElement.querySelectorAll('*')] as HTMLElement[];
    const viewElements = [...this.viewerPre.querySelectorAll('div')] as HTMLElement[];
    let indx: number;
    let playEl: HTMLElement;
    let equalEl: HTMLElement;
    if (el.closest(`.${PLAYGROUND_CLASS}`)) {
      playEl = el;
      indx = playgrElmnts.indexOf(el);
      equalEl = viewElements[indx];
    } else if (el.closest('.viewer-pre')) {
      el = el.closest('div') as HTMLElement;
      indx = viewElements.indexOf(el);
      // indx = viewElements.indexOf(el);
      equalEl = playgrElmnts[indx];
      playEl = equalEl;
    } else return;
    el.setAttribute('highlight', '');
    if (equalEl) equalEl.setAttribute('highlight', '');
    this.showHint(playEl);
  }

  private playgrMousOutHandler(event: Event):void {
    if (this.isGameFinished) return;
    const elem = event.target as HTMLElement;

    if (elem === this.playgroundElement || (!elem.closest(`.${PLAYGROUND_CLASS}`) && !elem.closest('.html-viewer'))) return;
    const highlightes = document.querySelectorAll('[highlight]');
    highlightes.forEach((el) => el.removeAttribute('highlight'));
    this.playgroundHint.classList.remove('show');
  }

  private showHint(playgrElem: HTMLElement): void {
    const elPosition = playgrElem.getBoundingClientRect();
    this.playgroundHint.style.top = `${elPosition.top - 65}px`;
    this.playgroundHint.style.left = `${elPosition.left + (elPosition.width / 2)}px`;

    this.playgroundHint.textContent = this.getTagText(playgrElem.outerHTML);
    this.playgroundHint.classList.add('show');
  }

  private getTagText(outerHTML: string): string {
    const tag = outerHTML.replace(/^(<[^>]*>).*(<\/[^>]*>)$/si, '$1$2');
    const highlight = 'highlight';
    const twist = 'twist';
    const regex = new RegExp(`( ${highlight}| ${twist})=".*"`);
    return tag.replace(regex, '');
  }

  private finishGame(): void {
    // this.cleanCurrentStatusData();
    // this.endListners();
    // gameTimer.stopTimer();
    this.isGameFinished = true;
  }

  private async setNewLevel(levelNumber: number): Promise<void> {
    let levNumber = levelNumber;
    this.cleanPage();
    this.isCheat = false;
    if (levNumber >= gameLevels.length) {
      this.finishGame();
      return;
    }
    if (levNumber < 0) levNumber = 0;
    this.level = gameLevels[levNumber];
    localStorage.setItem(STORAGE_LEVEL_NUMBER, `${levNumber}`);
    [...this.levelsMenuWrapper.querySelectorAll(`.${ACTIVE_LEVEL_CLASS}`)].forEach((el) => el.classList.remove(ACTIVE_LEVEL_CLASS));
    const selector = `[${ATTR_LEVEL_NUMBER}="${levNumber}"]`;
    const e = this.levelsMenuWrapper.querySelector(selector);
    this.levelsMenuWrapper.querySelector(`[${ATTR_LEVEL_NUMBER}="${levNumber}"]`)?.classList.add(ACTIVE_LEVEL_CLASS);
    // var percent = (levNumber+1)/gameLevels.length * 100;
    // $(".progress").css("width",percent + "%");
    // loadBoard();
    // resetTable();
    await new Promise((resolve) => { setTimeout(resolve, 300); });
    this.levelNumber = levNumber;
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
      const divWrapped = this.wrapToDiv(el);
      this.viewerPre.append(divWrapped);
    });
    this.rightElements.forEach((el) => el.setAttribute('twist', ''));
    this.updateLevelMenu(this.isLevelFinished(levNumber));
  }

  private isLevelFinished(levelNumb = this.levelNumber): boolean {
    return !!((this.gameStatus[levelNumb] && this.gameStatus[levelNumb]?.levelFinished));
    // return !((this.gameStatus[levelNumb] && this.gameStatus[levelNumb]?.levelFinished));
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
    const domPlayground = document.querySelector(`.${PLAYGROUND_CLASS}`);
    if (domPlayground) domPlayground.remove();

    this.h1 = document.body.querySelector('h1') as HTMLElement;
    // this.h1.textContent = this.level.levelH1;

    this.playgroundElement = generateDomElement('div', '', null, PLAYGROUND_CLASS);

    this.mainSection = document.querySelector(`.${MAIN_CLASS}`) as HTMLElement;
    document.querySelector(`.${GAME_WRAPPER_CLASS}`)?.append(this.playgroundElement);
    // this.playgroundElement.insertAdjacentHTML('afterbegin', this.level.levelTask);
    this.playgroundHint = generateDomElement('div', '', document.body, 'playground-hint');

    // this.rightElements = [...this.playgroundElement
    //   .querySelectorAll(this.level.levelRightAnswer)] as HTMLElement[];
  }

  private appendEditor(): void {
    this.editors = document.querySelector(`.${EDITORS_CLASS}`) as HTMLDivElement;
    if (!this.editors) return;
    const editorWrap = this.editors.querySelector(`.${EDITOR_CLASS}`) as HTMLDivElement;
    const editorHeader = generateDomElement('div', '', editorWrap, 'editor-header');
    generateDomElement('span', 'CSS Editor', editorHeader);
    generateDomElement('span', 'style.css', editorHeader);
    const editorField = generateDomElement('div', '', editorWrap, 'editor-field');
    const lefNumbers = generateDomElement('div', '', editorField, 'editor-numbers');
    for (let i = 1; i < 21; i += 1) {
      generateDomElement('span', `${i}`, lefNumbers);
    }
    const editorInfoField = generateDomElement('div', '', editorField, 'editor-info');
    const inputWrapper = generateDomElement('div', '', editorInfoField, 'input-wrapper');
    this.editorInput = generateDomElement('input', '', inputWrapper, 'editor-input', 'input-want');
    this.editorInput.placeholder = 'Tipe in a CSS selector';
    this.enterBtn = generateDomElement('div', 'Enter', inputWrapper, ENTER_BTN_CLASS);
    const editorInfoPre = generateDomElement('div', '', editorInfoField, 'editor-info__pre');
    editorInfoPre.innerHTML = EDITOR_INFO_TEXT;

    this.editors.append(editorWrap);
  }

  private appendRightAside(): void {
    const rightAside = document.querySelector('.learn-side') as HTMLElement;

    const sideHeader = generateDomElement('div', '', rightAside, 'side-header');
    this.sideTitle = generateDomElement('h2', '', sideHeader, 'side-title');
    this.sideTitleCompleteMark = generateDomElement('span', '', sideHeader, 'title-finish-mark');
    const sideNav = generateDomElement('nav', '', sideHeader, 'side-header__nav');

    this.sideNavPrev = generateDomElement('div', '', sideNav, 'nav-prev');
    this.sideNavNext = generateDomElement('div', '', sideNav, 'nav-next');

    const progressWrapper = generateDomElement('div', '', rightAside, 'side-progress-wrap');
    this.sideProgress = generateDomElement('div', '', progressWrapper, 'side-progress');

    this.learnWrapper = generateDomElement('div', '', rightAside, 'side-learn-wrap');
    this.sideLearnSelector = generateDomElement('h3', '', this.learnWrapper, 'side-learn-selector');
    this.sideLearnTitle = generateDomElement('h2', '', this.learnWrapper, 'side-learn-title');
    this.sideLearnSintaxis = generateDomElement('h3', '', this.learnWrapper, 'side-learn-sintaxis');
    this.sideLearnDescription = generateDomElement('div', '', this.learnWrapper, 'side-learn-descr');
  }

  private appendExamples(): void {
    if (!this.level.examples || !this.level.examples.length) return;
    this.examplesWrapper = generateDomElement('div', '', null);
    if (this.examplesWrapper) {
      generateDomElement('h3', 'Examples', this.examplesWrapper, 'side-examples-title');
      this.level.examples.forEach((exmpl) => {
        const ex = generateDomElement('p', '', this.examplesWrapper);
        ex.innerHTML = exmpl;
      });
      this.learnWrapper.append(this.examplesWrapper);
    }
  }

  private appendViewer(): void {
    const viewerWrap = document.querySelector('.html-viewer') as HTMLElement;
    const viewerHeader = generateDomElement('div', '', viewerWrap, 'viewer-header');
    generateDomElement('span', 'HTML Viewer', viewerHeader);
    generateDomElement('span', 'index.html', viewerHeader);

    const viewerField = generateDomElement('div', '', viewerWrap, 'viewer-field');

    const viewerNumbers = generateDomElement('div', '', viewerField, 'viewer-numbers');
    for (let i = 1; i < 21; i += 1) {
      generateDomElement('span', `${i}`, viewerNumbers);
    }

    const viewerInfoField = generateDomElement('div', '', viewerField, 'viewer-info');
    // const viewerInfoPre = generateDomElement('pre', '', viewerInfoField);

    this.viewerPre = generateDomElement('div', '', viewerInfoField, 'viewer-pre');

    // const tableElmts = [...this.playgroundElement.children] as HTMLElement[];

    // tableElmts.forEach((el) => {
    //   const divWrapped = this.wrapToDiv(el);
    //   this.viewerPre.append(divWrapped);
    // });
    // this.rightElements.forEach((el) => el.setAttribute('twist', ''));
  }

  private wrapToDiv(elem: HTMLElement): HTMLElement {
    const tagName = elem.localName;
    const wrapDiv = generateDomElement('div', '', null);
    let attrStr = '';
    const attrs = [...elem.attributes];
    attrs.forEach((attr) => {
      attrStr += `${this.spanWrap('hl-attr-name', ` ${attr.name}=`)}"${this.spanWrap('hl-attr-value', `${attr.value}`)}"`;
    });

    // const separ = attrStr ? '' : '';
    const childLen = elem.children.length;
    const wrapStartDivText = this.spanWrap('hl-tag', '&lt;') + this.spanWrap('hl-tag-name', tagName) + attrStr + this.spanWrap('hl-tag', '&gt;');
    const wrapEndDivText = this.spanWrap('hl-tag', '&lt;/') + this.spanWrap('hl-tag-name', tagName) + this.spanWrap('hl-tag', '&gt;');

    if (childLen > 0) {
      wrapDiv.innerHTML += wrapStartDivText;

      const elChildren = [...elem.children] as HTMLElement[];
      elChildren.forEach((el: HTMLElement) => wrapDiv.append(this.wrapToDiv(el)));

      wrapDiv.innerHTML += wrapEndDivText;
    } else {
      wrapDiv.innerHTML = `${wrapStartDivText}${wrapEndDivText}`;
    }
    return wrapDiv;
  }

  private spanWrap(className: string, str: string): string {
    return `<span class="${className}">${str}</span>`;
  }

  // https://stackoverflow.com/questions/1787322/what-is-the-htmlspecialchars-equivalent-in-javascript
  // private escapeHtml(text:string): string {
  //   const map: { [key: string]: string } = {
  //     '&': '&amp;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //     '"': '&quot;',
  //     "'": '&#039;',
  //   };
  //   return text.replace(/[&<>"']/g, (m) => map[m]);
  // }

  // --------------===========LEVELS RIGHT MENU =========-----------

  private makeLevelsMenu(): void {
    const header = document.body.querySelector('header');
    this.levelsSideWrapper = generateDomElement('aside', '', this.mainSection, LEVEL_SIDE_WRAPPER_CLASS);
    generateDomElement('h2', 'Choose a level', this.levelsSideWrapper);
    this.levelsMenuWrapper = generateDomElement('div', '', this.levelsSideWrapper, LEVEL_MENU_WRAPPER_CLASS);
    this.levelsResetBtn = generateDomElement('div', 'RESET', this.levelsSideWrapper, LEVEL_RESET_BTN_CLASS);
    this.levelsMenuBtn = generateDomElement('div', '', header, LEVELS_MENU_BTN_CLASS);
    generateDomElement('div', '', this.levelsMenuBtn, LEVELS_MENU_BTN_IMG_CLASS);
    this.makeLevelsList();
  }

  private updateLevelMenu(isLevelFinished: boolean): void {
    if (isLevelFinished) {
      this.levelsMenuWrapper.querySelector(`div:nth-child(${this.levelNumber + 1})`)?.classList.add(LEVEL_FINISHED_CLASS);
      this.sideTitleCompleteMark.classList.add(LEVEL_FINISHED_CLASS);
    } else {
      this.sideTitleCompleteMark.classList.remove(LEVEL_FINISHED_CLASS);
    }
  }

  private makeLevelsList(): void {
    for (let n = 0; n < gameLevels.length; n += 1) {
      const wrapper = generateDomElement('div', '', this.levelsMenuWrapper);
      wrapper.setAttribute(ATTR_LEVEL_NUMBER, `${n}`);
      generateDomElement('span', '', wrapper, SIDE_LEVEL_CHECK_CLASS);
      generateDomElement('span', `${n + 1}`, wrapper, SIDE_LEVEL_NUMBER_CLASS);
      generateDomElement('span', gameLevels[n].learnSelector, wrapper);

      if (this.isLevelFinished(n)) wrapper.classList.add(LEVEL_FINISHED_CLASS);
    }
  }

  private closeLevelsMenu(): void {
    document.body.classList.remove(ACTIVE_MENU_CLASS);
    this.levelsMenuBtn.classList.remove(ACTIVE_CLASS);
    this.levelsSideWrapper.classList.remove(ACTIVE_CLASS);
  }

  private openLevelsMenu(): void {
    document.body.classList.add(ACTIVE_MENU_CLASS);
    this.levelsMenuBtn.classList.add(ACTIVE_CLASS);
    this.levelsSideWrapper.classList.add(ACTIVE_CLASS);
  }

  // $(".level-nav").on("click","a",function(){

  //   var direction;
  //   if($(this).hasClass("next")) {
  //     direction = "next";
  //   }

  //   addAnimation($(this),"link-jiggle");

  //   if(direction == "next") {
  //     currentLevel++;
  //     if(currentLevel >= levels.length) {
  //       currentLevel = levels.length - 1;
  //     }
  //   } else {
  //     currentLevel--;
  //     if(currentLevel < 0) {
  //       currentLevel = 0;
  //     }
  //   }

  //   this.setNewLevel();
  //   return false;
  // });
  // $(window).on("keydown",function(e){
  //   if(e.keyCode == 27) {
  //     closeLevelsMenu();
  //   }
  // });
}
