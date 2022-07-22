'use strict';

const timer1 = new CountdownTimer('.timer1', {
  futureDate: `${new Date(Date.now() + 1000 * 60)}`,

  onStart: function (timerContainer, timerCounter) {
    console.log('start');
  },

  onStop: function (timerContainer, timerCounter) {
    console.log('stop');
  },

  onUpdate: function (timerContainer, timerCounter) {
    console.log('update')
  },
});
