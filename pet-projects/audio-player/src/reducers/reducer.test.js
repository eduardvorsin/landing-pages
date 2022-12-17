import { CHANGE_CURRENT_TIME, CHANGE_DURATION, CHANGE_PLAYBACKRATE, CHANGE_VOLUME, LOOP, MUTE, PAUSE, PLAY, UNLOOP, UNMUTE } from "../actions/actions_types";

import { createInitialState } from "../state/state";
import { reducer } from "./reducer";

describe('reducer tests', () => {
  test('the reducer is launched with a CHANGE_DURATION action', () => {
    const action = {
      type: CHANGE_DURATION,
      duration: 137,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, duration: 137 };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a CHANGE_CURRENT_TIME action', () => {
    const action = {
      type: CHANGE_CURRENT_TIME,
      currentTime: 42,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, currentTime: 42 };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a CHANGE_VOLUME action', () => {
    const action = {
      type: CHANGE_VOLUME,
      volume: 1,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, volume: 1 };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a CHANGE_PLAYBACKRATE action', () => {
    const action = {
      type: CHANGE_PLAYBACKRATE,
      playbackRate: 1.5,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, playbackRate: 1.5 };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a PLAY action', () => {
    const action = {
      type: PLAY,
      isPlayed: false,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, isPlayed: true };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a PAUSE action', () => {
    const action = {
      type: PAUSE,
      isPlayed: true,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, isPlayed: false };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a MUTE action', () => {
    const action = {
      type: MUTE,
      isMuted: false,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, isMuted: true };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a UNMUTE action', () => {
    const action = {
      type: UNMUTE,
      isMuted: true,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, isMuted: false };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a LOOP action', () => {
    const action = {
      type: LOOP,
      isLooped: false,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, isLooped: true };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with a UNLOOP action', () => {
    const action = {
      type: UNLOOP,
      isLooped: true,
    };
    const intialState = createInitialState();
    const expectedState = { ...intialState, isLooped: false };

    expect(reducer(intialState, action)).toEqual(expectedState);
  });

  test('the reducer is launched with unknown action', () => {
    const action = {
      type: UNLOOP,
      isLooped: true,
    };
    const intialState = createInitialState();

    expect(reducer(intialState, action)).toEqual(intialState);
  });
});
