'use strict';

const select = new SingleSelect('#select-1', {
  onOpen: function (customSelectList) {
    console.log('onOpen: ', customSelectList);
    customSelectList.classList.add('slide-in-top');
    customSelectList.classList.remove('slide-out-top');
  },
  onClose: function (customSelectList) {
    console.log('onClose: ', customSelectList);
    customSelectList.classList.add('slide-out-top');
    customSelectList.classList.remove('slide-in-top');
  },
  onSelect: function (customSelectOption) {
    console.log('onSelect: ', customSelectOption);
  }
});

const select2 = new MultipleSelect('#select-2', {
  onSelect: function (customSelectOption) {
    console.log('onSelect: ', customSelectOption);
  }
});
