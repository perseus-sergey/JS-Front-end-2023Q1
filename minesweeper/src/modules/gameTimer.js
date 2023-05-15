import { constants } from './constants';

const {
  TIMER_MS_CLASS,
  TIMER_SEC_CLASS,
  TIMER_MIN_CLASS,
} = constants;

export const gameTimer = {
  timer: 0,
  timerInterval: 0,

  startTimer(time = 0) {
    this.stopTimer();
    this.timer = time;
    this.timerInterval = setInterval(() => {
      this.timer += 1 / 60;
      const msec = Math.floor((this.timer - Math.floor(this.timer)) * 100);
      const sec = Math.floor(this.timer) - Math.floor(this.timer / 60) * 60;
      const min = Math.floor(this.timer / 60);
      document.querySelector(`.${TIMER_MS_CLASS}`).innerHTML = msec < 10 ? `0${msec.toString()}` : msec;
      document.querySelector(`.${TIMER_SEC_CLASS}`).innerHTML = sec < 10 ? `0${sec.toString()}` : sec;
      document.querySelector(`.${TIMER_MIN_CLASS}`).innerHTML = min < 10 ? `0${min.toString()}` : min;
    }, 1000 / 60);
  },

  stopTimer() {
    this.timer = 0;
    this.timerInterval = clearInterval(this.timerInterval);
  },
};
