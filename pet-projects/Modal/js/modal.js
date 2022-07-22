'use strict';

class Modal {
  #scrollWidth = window.innerWidth - document.body.offsetWidth;
  #fixBlocks = document.querySelectorAll('._modal-fix');

  constructor(id, options = {
    closeClickingOnOverlay: true,
    onOpen: function (modalWindow, modal) { },
    onClose: function (modalWindow, modal) { },
  }) {

    this._options = options;
    this._modal = document.querySelector(`div[data-modalId="${id}"]`);
    if (this._modal === null) {
      throw new Error(`The element with the [data-modalId="${id}"] was not found`);
    }

    this._modalWindow = this._modal.querySelector('[data-modal-window]');
    if (this._modalWindow === null) {
      throw new Error(`The element with the [data-modal] was not found`);
    }

    this._close = this._modal.querySelector('[data-modal-close]');
    if (this._close === null) {
      throw new Error(`The element with the [data-modal-close] was not found`);
    }

    this._trigger = document.querySelector(
      `a[data-modalId="${id}"],
      button[data-modalId="${id}"]`,
    );
    if (this._trigger === null) {
      throw new Error(`The link or button with the [data-modalId] was not found`);
    }

    this._focusabeElements = [...this._modal.querySelectorAll(
      `a[href],
      button,
      input,
      textarea,
      select,
      [tabindex]`
    )];

    this._isOpen = false;

    this.closeClickingOnOverlay =
      this._options.closeClickingOnOverlay ?? true;

    this.#addEvents();
  }

  #addEvents() {
    document.addEventListener('click', (e) => {

      if (e.target === this._trigger) {
        e.preventDefault();
        this.open();
      }

      if (e.target === this._close || e.target === this._modal && this.closeClickingOnOverlay) {
        this.close();
      }
    });

    this._modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') this.#changeFocus(e);

      if (this.isOpen && e.key === 'Escape') this.close();
    });
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value) {
    this._isOpen = value;
  }

  open() {
    this.isOpen = true;
    this._modal.classList.add('_open');
    this._modal.setAttribute('aria-hidden', false);
    this._trigger.setAttribute('aria-expanded', true);
    this.#toggleScroll();
    this.#removeShift();
    setTimeout(() => this._close.focus(), 50);

    this._options.onOpen?.call(undefined, this._modalWindow, this._modal);

  }

  close() {
    this.isOpen = false;
    this._modal.classList.remove('_open');
    this._modal.setAttribute('aria-hidden', true);
    this._trigger.setAttribute('aria-expanded', false);
    this.#toggleScroll();
    this.#removeShift();

    this._options.onClose?.call(undefined, this._modalWindow, this._modal);

    this._trigger.focus();
  }

  #toggleScroll() {
    if (this.isOpen) {
      document.body.classList.add('_scroll-lock');
      return;
    }

    document.body.classList.remove('_scroll-lock');
  }

  #removeShift() {
    if (this.isOpen) {
      this._modal.style.paddingRight = `${this.#scrollWidth}px`;
      document.body.style.paddingRight = `${this.#scrollWidth}px`;
      this.#fixBlocks.forEach((elem) => {
        return elem.style.paddingRight = `${this.#scrollWidth}px`
      });
      return;
    }

    this._modal.style.paddingRight = `0px`;
    document.body.style.paddingRight = `0px`;
    this.#fixBlocks.forEach((elem) => elem.style.paddingRight = `0px`);
  }

  #changeFocus(e) {
    let focusedIndex = this._focusabeElements.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      this._focusabeElements[this._focusabeElements.length - 1].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedIndex === this._focusabeElements.length - 1) {
      this._focusabeElements[0].focus();
      e.preventDefault();
    }
  }
}

