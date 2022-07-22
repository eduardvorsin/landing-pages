'use strict';

let modal0 = new Modal('0', {
  closeClickingOnOverlay: false,
  onOpen: (modalWindow, modal) => {
    modalWindow.classList.remove('slide-out-top');
    modalWindow.classList.add('slide-in-top');
  },
  onClose: (modalWindow, modal) => {
    modalWindow.classList.remove('slide-in-top');
    modalWindow.classList.add('slide-out-top');
  },
});
