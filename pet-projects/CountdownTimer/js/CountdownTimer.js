class CountdownTimer {
  constructor(selector, options = {}) {

    this._timerContainer = document.querySelector(selector);

    if (this._timerContainer === null) {
      throw new Error(`The element with the ${selector} selector was not found`);
    }

    this._timerCounter = this._timerContainer.querySelector('[data-timer-counter]');

    if (this._timerCounter === null) {
      throw new Error(`The element with the [data-timer-counter] attribute was not found`);
    }

    this._options = options;
    this._timer = null;

    if (!this._options.futureDate) {
      this._futureDate = new Date(Date.now() + 60 * 1000);

    } else {
      this._futureDate = new Date(Date.parse(this._options.futureDate));
    }

    if (Number.isNaN(this._futureDate)) {
      throw new Error('Incorrect date format in the futureDate field');
    }

    this.setTime(this.#getRemainingTime());
    this.start();
  }

  #stringifyTime(value) {
    let days = Math.floor(value / 24 / 3600 / 1000);
    let hours = Math.floor((value / 3600 / 1000) % 24);
    let mins = Math.floor((value / 60 / 1000) % 60);
    let secs = Math.floor((value / 1000) % 60);

    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    return `${days}:${hours}:${mins}:${secs}`;
  }

  setTime(value) {
    if (this.isTimeOver()) {
      this._timerCounter.textContent = this.#stringifyTime(0);
      return;
    }

    this._timerCounter.textContent = this.#stringifyTime(value);
  }

  isTimeOver() {
    return this.#getRemainingTime() <= 0;
  }

  #getRemainingTime() {
    return this._futureDate.getTime() - Date.now();
  }

  start() {
    let prevTime = Math.trunc(this.#getRemainingTime() / 1000);

    this._options.onStart?.call(undefined, this._timerContainer, this._timerCounter);

    this._timer = requestAnimationFrame(function timeout() {
      let currentTime = Math.trunc(this.#getRemainingTime() / 1000);

      this.setTime(this.#getRemainingTime());

      if (prevTime > currentTime) {
        prevTime = currentTime;

        this._options.onUpdate?.call(undefined, this._timerContainer, this._timerCounter);
      }

      if (!this.isTimeOver()) {
        this._timer = requestAnimationFrame(timeout.bind(this));
      }

    }.bind(this));
  }

  reset() {
    this._options.onReset?.call(undefined, this._timerContainer, this._timerCounter);

    this.setTime(0);
    cancelAnimationFrame(this._timer);
  }
}
