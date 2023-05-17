import { constants, menuClasses } from './constants';
import { gameTimer } from './gameTimer';
import { gameLevel } from './Level';
import { Playground } from './Playground';
import { generateDomElement } from './utilities';

const {
  COUNTER_CLASS,
  COUNTER_WRAPPER_CLASS,
  COUNTER_TITLE_CLASS,
  CLICK_WRAPPER_CLASS,
  CLICK_TITLE_CLASS,
  CLICK_CLASS,
  INFO_SECTION_CLASS,
  LOCAL_DATA_KEY,
  MAIN_TAG,
  MAIN_CLASS,
  START_BTN_CLASS,
  SETTINGS_BTN,
  SETTINGS_BTN_CLASS,
  TIMER_CLASS,
  TIMER_MS_CLASS,
  TIMER_SEC_CLASS,
  TIMER_MIN_CLASS,
} = constants;

const {
  NAV_MENU,
  MENU_OVERLAY,
  NAV_MENU_ACTIVE,
  NAV_MENU_WRAPPER,
  NAV_CLOSE_BTN,
  NAV_CLOSE_BTN_CLASS,
  MENU_TITLE,
  MENU_TITLE_SCORE,
  MENU_LEVEL,
  SLIDER_WRAPPER,
  WRAPPER_THEME,
  WRAPPER_SOUND,
  CUSTOM_DONE_BTN,
  CUSTOM_LEVEL_FORM,
  THEME_SLIDER,
  SOUND_SLIDER,
  CUSTOM_LEVEL_WRAP_CLASS,
  CUSTOM_COLUMN_VAL,
  CUSTOM_ROW_VAL,
  CUSTOM_MINES_VAL,
  LEVEL_ID_EASY,
  LEVEL_ID_MEDIUM,
  LEVEL_ID_HARD,
  LEVEL_ID_CUSTOM,
} = menuClasses;

const navMenu = {
  menuNav: '',
  menuOverlay: '',

  start() {
    this.disactivateMenu = this.disactivateMenu.bind(this);
    this.levelClickHandler = this.levelClickHandler.bind(this);
    this.soundSliderClickHandler = this.soundSliderClickHandler.bind(this);
    this.makeMenuNav();
    // this.addListners();
  },

  makeMenuNav() {
    this.menuNav = generateDomElement('nav', '', NAV_MENU);
    this.closeBtn = generateDomElement(
      'div',
      NAV_CLOSE_BTN,
      NAV_CLOSE_BTN_CLASS,
    );

    const menuWrap = generateDomElement('div', '', NAV_MENU_WRAPPER);

    const scoreTitle = generateDomElement(
      'div',
      'Score',
      MENU_TITLE,
      MENU_TITLE_SCORE,
    );
    const menuScore = generateDomElement('div', '');
    menuScore.append(scoreTitle);

    const menuTheme = generateDomElement('div', '');
    const themeTitle = generateDomElement('div', 'Theme', MENU_TITLE);
    const themeSliderWrapper = generateDomElement(
      'div',
      '',
      SLIDER_WRAPPER,
      WRAPPER_THEME,
    );
    const themeLabel = generateDomElement('label', '');
    const themeSlider = generateDomElement('input', '', THEME_SLIDER);
    themeSlider.id = THEME_SLIDER;
    themeSlider.type = 'checkbox';
    themeLabel.htmlFor = themeSlider.id;
    themeSliderWrapper.append(themeSlider);
    themeSliderWrapper.append(themeLabel);
    menuTheme.append(themeTitle);
    menuTheme.append(themeSliderWrapper);

    const menuSound = generateDomElement('div', '');
    const soundTitle = generateDomElement('div', 'Sound', MENU_TITLE);
    const soundSliderWrapper = generateDomElement(
      'div',
      '',
      SLIDER_WRAPPER,
      WRAPPER_SOUND,
    );
    const soundLabel = generateDomElement('label', '');
    this.soundSlider = generateDomElement('input', '', THEME_SLIDER);
    this.soundSlider.id = SOUND_SLIDER;
    this.soundSlider.type = 'checkbox';
    soundLabel.htmlFor = this.soundSlider.id;
    soundSliderWrapper.append(this.soundSlider);
    soundSliderWrapper.append(soundLabel);
    menuSound.append(soundTitle);
    menuSound.append(soundSliderWrapper);

    const menuLevel = generateDomElement('div', '');
    this.levelTitle = generateDomElement('div', 'Level', MENU_TITLE);
    this.menuLevels = generateDomElement('div', '', MENU_LEVEL);
    this.leveldivEasy = generateDomElement('div', 'Easy', LEVEL_ID_EASY);
    this.leveldivEasy.dataset.level = 'easy';
    this.leveldivMed = generateDomElement('div', 'Medium', LEVEL_ID_MEDIUM);
    this.leveldivMed.dataset.level = 'medium';
    this.leveldivHard = generateDomElement('div', 'Hard', LEVEL_ID_HARD);
    this.leveldivHard.dataset.level = 'hard';
    this.leveldivCustom = generateDomElement('div', 'Custom', LEVEL_ID_CUSTOM);
    this.leveldivCustom.dataset.level = 'custom';

    this.customLevelForm = generateDomElement('div', '', CUSTOM_LEVEL_FORM);

    const levelColWrapDiv = generateDomElement(
      'div',
      '',
      CUSTOM_LEVEL_WRAP_CLASS,
    );
    const columnTitleDiv = generateDomElement('div', 'Rows: ');
    this.customColumnVal = generateDomElement('input', '', CUSTOM_COLUMN_VAL);
    this.customColumnVal.type = 'number';
    this.customColumnVal.maxLength = 2;
    this.customColumnVal.max = 30;
    this.customColumnVal.min = 5;
    levelColWrapDiv.append(columnTitleDiv);
    levelColWrapDiv.append(this.customColumnVal);

    const levelRowWrapDiv = generateDomElement(
      'div',
      '',
      CUSTOM_LEVEL_WRAP_CLASS,
    );
    const rowTitleDiv = generateDomElement('div', 'Columns: ');
    this.customRowVal = generateDomElement('input', '', CUSTOM_ROW_VAL);
    this.customRowVal.type = 'number';
    this.customRowVal.maxLength = 2;
    this.customRowVal.max = 30;
    this.customRowVal.min = 5;
    levelRowWrapDiv.append(rowTitleDiv);
    levelRowWrapDiv.append(this.customRowVal);

    const levelMineWrapDiv = generateDomElement(
      'div',
      '',
      CUSTOM_LEVEL_WRAP_CLASS,
    );
    const mineTitleDiv = generateDomElement('div', 'Mines: ');
    this.customMineVal = generateDomElement('input', '', CUSTOM_MINES_VAL);
    this.customMineVal.type = 'number';
    this.customMineVal.maxLength = 3;
    this.customMineVal.max = 300;
    this.customMineVal.min = 3;
    levelMineWrapDiv.append(mineTitleDiv);
    levelMineWrapDiv.append(this.customMineVal);

    this.startBtn = generateDomElement('div', 'Done', 'btn', CUSTOM_DONE_BTN);

    this.customLevelForm.append(levelColWrapDiv);
    this.customLevelForm.append(levelRowWrapDiv);
    this.customLevelForm.append(levelMineWrapDiv);
    this.customLevelForm.append(this.startBtn);

    this.menuLevels.append(this.leveldivEasy);
    this.menuLevels.append(this.leveldivMed);
    this.menuLevels.append(this.leveldivHard);
    this.menuLevels.append(this.leveldivCustom);
    menuLevel.append(this.levelTitle);
    menuLevel.append(this.menuLevels);
    menuLevel.append(this.customLevelForm);

    menuWrap.append(menuScore);
    menuWrap.append(menuTheme);
    menuWrap.append(menuSound);
    menuWrap.append(menuLevel);

    this.menuNav.append(this.closeBtn);
    this.menuNav.append(menuWrap);

    document.body.append(this.menuNav);
  },

  activateMenu() {
    this.addListners();
    this.menuNav.classList.add(NAV_MENU_ACTIVE);
    this.addMenuOverlay();
  },

  disactivateMenu() {
    console.log('disactivateMenu --> toggle');
    this.toggleLevelMenu(false);
    this.menuNav.classList.remove(NAV_MENU_ACTIVE);
    this.menuOverlay.remove();
    this.removeListners();
  },

  addListners() {
    console.log('addListners');
    this.closeBtn.addEventListener('click', this.disactivateMenu);
    this.menuLevels.addEventListener('click', this.levelClickHandler);
    this.soundSlider.addEventListener('click', this.soundSliderClickHandler);
    // this.addListnersForCustomInput();
  },
  removeListners() {
    console.log('removeListners');

    this.closeBtn.removeEventListener('click', this.disactivateMenu);
    this.menuLevels.removeEventListener('click', this.levelClickHandler);
    this.soundSlider.removeEventListener('click', this.soundSliderClickHandler);
    // this.addListnersForCustomInput();
  },

  soundSliderClickHandler() {
    console.log(this.soundSlider.checked);
    mainLayout.play.isSound = !this.soundSlider.checked;
  },

  addListnersForCustomInput() {
    [this.customColumnVal,
      this.customRowVal,
      this.customMineVal].forEach((input) => {
      input.addEventListener('blur', (event) => this.inputBlurHandler(event));
      // input.addEventListener('focus', (event) => this.inputfocusHandler(event));
    });
  },

  toggleLevelMenu(isNavMenuActivated = true) {
    console.log('toggleLevelMenu');
    if (this.customLevelForm.classList.contains(NAV_MENU_ACTIVE) || !isNavMenuActivated) {
      this.customLevelForm.classList.remove(NAV_MENU_ACTIVE);
      this.removeListnersForCustomInput();
    } else {
      this.customLevelForm.classList.add(NAV_MENU_ACTIVE);
      this.addListnersForCustomInput();
    }
  },

  removeListnersForCustomInput() {
    [this.customColumnVal,
      this.customRowVal,
      this.customMineVal].forEach((input) => {
      input.removeEventListener('blur', (event) => this.inputBlurHandler(event));
      // input.addEventListener('focus', (event) => this.inputfocusHandler(event));
    });
  },

  inputBlurHandler(event) {
    const element = event.target;

    if (+element.value > +element.max) {
      element.value = element.max;
    } else if (+element.value < +element.min) {
      element.value = element.min;
    }
  },

  levelClickHandler(event) {
    // console.log(event.target);
    if (
      event.target === this.leveldivEasy
      || event.target === this.leveldivMed
      || event.target === this.leveldivHard
      || event.target === this.leveldivCustom
    ) {
      const element = event.target;

      if (event.target === this.leveldivCustom) {
        console.log('levelClickHandler --> toggle');
        this.toggleLevelMenu();
        this.startBtn.addEventListener('click', (event) => this.startCustomLevelHandler(event), { once: true });
        return;
      }

      mainLayout.restartBtnHandler('', gameLevel[element.dataset.level]);
      this.disactivateMenu();
    }
  },

  startCustomLevelHandler() {
    gameLevel.setParams(
      +this.customColumnVal.value,
      +this.customRowVal.value,
      Math.min(
        +this.customMineVal.value,
        +this.customColumnVal.value * +this.customRowVal.value - 16,
      ),
    );
    // console.log(gameLevel.custom);
    mainLayout.restartBtnHandler('', gameLevel.custom);
    this.disactivateMenu();
    [this.customColumnVal,
      this.customRowVal,
      this.customMineVal].forEach((input) => input.value = '');
  },

  addMenuOverlay() {
    this.menuOverlay = generateDomElement('div', '', MENU_OVERLAY);
    this.menuOverlay.addEventListener('click', (e) => this.disactivateMenu(e), { once: true });
    document.body.prepend(this.menuOverlay);
  },
};

const mainLayout = {
  start() {
    this.makeMainSection();
    this.makeInfoSection();
    navMenu.start();
    this.play = new Playground(
      gameLevel.easy,
      localStorage.getItem(LOCAL_DATA_KEY) || '',
    );
    this.addMainLayoutListners();
  },

  makeMainSection() {
    this.mainSection = generateDomElement(MAIN_TAG, '', MAIN_CLASS);
    document.body.append(this.mainSection);
  },

  makeInfoSection() {
    const infoSection = generateDomElement('section', '', INFO_SECTION_CLASS);

    const countWrapperDiv = generateDomElement(
      'div',
      '',
      COUNTER_WRAPPER_CLASS,
    );
    const countTitleDiv = generateDomElement(
      'div',
      'Mines: ',
      COUNTER_TITLE_CLASS,
    );
    this.counterDiv = generateDomElement('div', '0', COUNTER_CLASS);
    countWrapperDiv.append(countTitleDiv);
    countWrapperDiv.append(this.counterDiv);

    const clickWrapperDiv = generateDomElement('div', '', CLICK_WRAPPER_CLASS);
    const clickTitleDiv = generateDomElement(
      'div',
      'Clicks: ',
      CLICK_TITLE_CLASS,
    );
    this.clickDiv = generateDomElement('div', '0', CLICK_CLASS);
    clickWrapperDiv.append(clickTitleDiv);
    clickWrapperDiv.append(this.clickDiv);

    this.startBtn = generateDomElement(
      'div',
      'Restart',
      'btn',
      START_BTN_CLASS,
    );
    this.settingsBtn = generateDomElement(
      'div',
      SETTINGS_BTN,
      SETTINGS_BTN_CLASS,
    );

    const timerDiv = generateDomElement('div', '', TIMER_CLASS);

    this.ms = generateDomElement('div', '00', TIMER_MS_CLASS);
    this.second = generateDomElement('div', '00', TIMER_SEC_CLASS);
    this.minute = generateDomElement('div', '00', TIMER_MIN_CLASS);

    timerDiv.append(this.minute);
    timerDiv.append(this.second);
    timerDiv.append(this.ms);

    infoSection.append(countWrapperDiv);
    infoSection.append(clickWrapperDiv);
    infoSection.append(this.startBtn);
    infoSection.append(timerDiv);
    infoSection.append(this.settingsBtn);
    document.body.append(infoSection);
  },

  restartBtnHandler(event = '', oLevel = gameLevel.easy) {
    if (typeof this.play !== 'undefined') {
      localStorage.removeItem(LOCAL_DATA_KEY);
      gameTimer.stopTimer();
      this.ms.textContent = '00';
      this.second.textContent = '00';
      this.minute.textContent = '00';
      this.counterDiv.textContent = '0';
      this.clickDiv.textContent = '0';
      this.mainSection.innerHTML = '';
      this.play.finishGame();
      this.play = new Playground(
        oLevel,
        localStorage.getItem(LOCAL_DATA_KEY) || '',
        !navMenu.soundSlider.checked,
      );
    }
  },

  showMenu() {
    console.log('showMenu');
    navMenu.activateMenu();
  },

  addMainLayoutListners() {
    this.startBtn.addEventListener('click', (event) => this.restartBtnHandler(event));
    this.settingsBtn.addEventListener('click', (event) => this.showMenu(event));
  },
};

mainLayout.start();
