'use strict'

class HybridSelect {
  _selectWrapper
  _customSelect;
  _customSelectList;
  _customSelectOptions;
  _nativeSelect;
  _nativeSelectOptions;

  constructor(selector) {

    this._selectWrapper = document.querySelector(selector);
    if (this._selectWrapper === null) {
      throw new Error(`The element with this selector(${selector}) was not found`);
    }

    this._customSelect = this._selectWrapper.querySelector('[data-select-custom]');
    if (this._customSelect === null) {
      throw new Error('The element with data-select-custom was not found');
    }

    this._customSelectList = this._customSelect.querySelector('[data-select-list]');
    if (this._customSelectList === null) {
      throw new Error('the element with data-select-list was not found');
    }

    this._customSelectOptions = [...this._customSelectList.children];
    if (this._customSelectOptions.length === 0) {
      throw new Error('Elements in data-select-list element were not found');
    }

    this._nativeSelect = this._selectWrapper.querySelector('[data-select-native]');
    if (this._nativeSelect === null) {
      throw new Error('The element with data-select-native was not found');
    }

    this._nativeSelectOptions = [...this._nativeSelect.children];
    if (this._nativeSelectOptions.length === 0) {
      throw new Error('Elements in data-select-native element were not found');
    }

    this._customSelect.setAttribute('aria-hidden', true);
    this._nativeSelect.tabIndex = -1;

    this._addEvents();
  }

  _addEvents() {
    this._customSelect.addEventListener('click', (e) => {
      this._clickHandler(e);
    });

    this._customSelect.addEventListener('keydown', (e) => {
      this._keyboardNavigation(e);
    });
  }

  set value(value) {
    let findedIndex = this._nativeSelectOptions.findIndex(option => {
      return option.value === value;
    });

    if (findedIndex < 0) return;
    this.selectOption(this._customSelectOptions[findedIndex]);
  }

  get selectedIndex() {
    return this._customSelectOptions.findIndex((option) => {
      return 'select' in option.dataset;
    });
  }

  set selectedIndex(value) {
    if ((typeof value !== 'number') && !Number.isInteger(value)) {
      throw new Error('selectedIndex must be a integer number');
    };

    if (value < 0 || value > this._customSelectOptions.length) {
      throw new Error('the index value cannot be less than 0 or greater than the last selection point');
    }

    this.selectOption(this._customSelectOptions[value]);
  }

  get selectedOptions() {
    return this._customSelectOptions.filter(option => {
      return 'select' in option.dataset;
    });
  }

  get options() {
    return {
      ...this._customSelectOptions,
      selectedIndex: this.selectedIndex,
      length: this._customSelectOptions.length,
    };
  }

  get value() {
    return this._nativeSelectOptions[this.selectedIndex].value;
  }

  _isValidKey(value) {
    let validKeys = [
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      'Tab',
      'Escape',
      ' ',
      'Enter'];

    return validKeys.includes(value);
  }
}

class SingleSelect extends HybridSelect {
  isOpen;

  constructor(selector, settings = {
    onOpen: function (customSelectList) { },
    onClose: function (customSelectList) { },
    onSelect: function (customSelectOption) { },
  }) {
    super(selector);

    this.multiple = false;
    this._customSelectTrigger = this._customSelect.querySelector('[data-select-trigger]');

    if (this._customSelectTrigger === null) {
      throw new Error('The element with data-select-trigger was not found');
    }

    this._customSelectOptions.forEach(option => {
      if ('selected' in option.dataset) {
        this._selectOption(option);
      };
    });

    this._settings = settings;
    this.close();
  }

  open() {
    this.isOpen = true;
    this._customSelectTrigger.setAttribute('data-select-open', '');
    this._settings.onOpen?.call(undefined, this._customSelectList);
  }

  close() {
    this.isOpen = false;
    this._customSelectTrigger.removeAttribute('data-select-open');
    this._settings.onClose?.call(undefined, this._customSelectList);
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  _selectOption(element) {
    this._customSelectOptions.forEach(option => {
      option.removeAttribute('data-select');
    });

    this._customSelectTrigger.textContent = element.textContent;
    element.setAttribute('data-select', '');
    this._syncronizeWithNative(element);
    this._settings.onSelect?.call(undefined, this._customSelectOptions[this.selectedIndex]);
  }

  _clickHandler(e) {
    if (e.target === this._customSelectTrigger) {
      this.toggle();
    }

    if (e.target.parentElement === this._customSelectList) {
      this._selectOption(e.target);
      this.close();
    }
  }

  _keyboardNavigation(e) {
    if (!super._isValidKey(e.key)) return;

    let index;
    let option;
    let firstIndex = 0;
    let lastIndex = this._customSelectOptions.length - 1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (e.altKey) {
          this.toggle();
          return;
        };

        index = this.selectedIndex + 1;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        if (e.altKey) {
          this.toggle();
          return;
        };

        index = this.selectedIndex - 1;
        break;

      case 'PageDown':
      case 'End':
        index = lastIndex;
        break;

      case 'PageUp':
      case 'Home':
        index = firstIndex;
        break;

      case 'Tab':
      case 'Escape':
        this.close();
        return;

      case ' ':
      case 'Enter':
        index = this.selectedIndex;
        break;
    }

    option = this._customSelectOptions[index];

    if (index < firstIndex || index > lastIndex) {
      return;
    }

    this._selectOption(option);
  }

  get value() {
    return super.value;
  }

  get selectedIndex() {
    return super.selectedIndex;
  }

  get selectedOptions() {
    return super.selectedOptions;
  }

  get options() {
    return super.options;
  }

  _syncronizeWithNative() {
    this._nativeSelect.selectedIndex = this.selectedIndex;
  }
}

class MultipleSelect extends HybridSelect {
  constructor(selector, settings = {
    onSelect: function (customSelectOption) { },
  }) {
    super(selector);
    this.multiple = true;

    this._customSelectOptions.forEach(option => {
      if ('selected' in option.dataset) {
        this._selectOption(option);

      };

      option.tabIndex = 0;
    });

    this._settings = settings;
    this._customSelect.dataset.multiple = '';
  }

  _selectOption(element) {
    const isSelected = 'select' in element.dataset;

    if (isSelected) {
      element.removeAttribute('data-select');
    } else {
      element.setAttribute('data-select', '');
    }

    this._syncronizeWithNative(element);
    this._settings.onSelect?.call(undefined, this._customSelectOptions[this.selectedIndex]);
  }

  _clickHandler(e) {
    if (e.target.parentElement === this._customSelectList) {
      this._selectOption(e.target);
    }
  }

  _keyboardNavigation(e) {
    if (!super._isValidKey(e.key)) return;

    let index;
    let option;
    let firstIndex = 0;
    let lastIndex = this._customSelectOptions.length - 1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        index = this.focusedIndex + 1;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        index = this.focusedIndex - 1;
        break;

      case 'Tab':
        index = this.focusedIndex;
        break;

      case 'PageDown':
      case 'End':
        index = lastIndex;
        break;

      case 'PageUp':
      case 'Home':
        index = firstIndex;
        break;

      case ' ':
      case 'Enter':
        e.preventDefault();
        option = this._customSelectOptions[this.focusedIndex];
        this._selectOption(option);
        return;
    }

    if (index >= firstIndex && index <= lastIndex) {
      option = this._customSelectOptions[index];
      option.focus();
    }
  }

  get value() {
    return super.value;
  }

  get selectedIndex() {
    return super.selectedIndex;
  }

  get focusedIndex() {
    return this._customSelectOptions.findIndex((option) => {
      return document.activeElement === option;
    });
  }

  get selectedOptions() {
    return super.selectedOptions;
  }

  get options() {
    return super.options;
  }

  _syncronizeWithNative(option) {
    const findedIndex = this._customSelectOptions.indexOf(option);
    const isSelected = this._nativeSelectOptions[findedIndex].selected;
    this._nativeSelectOptions[findedIndex].selected = !isSelected;
  }
}
