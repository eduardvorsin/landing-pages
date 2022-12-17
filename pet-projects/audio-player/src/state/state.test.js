import { createInitialState } from "./state";

describe('createInitialState tests', () => {

  test('createInitialState passed valid parameters', () => {
    const intialState = createInitialState({
      loop: false,
      muted: true,
    });
    const expectedValue = {
      isPlayed: false,
      isMuted: true,
      volume: 50,
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      isLooped: false,
    };

    expect(intialState).toEqual(expectedValue);
  });

  test('createInitialState no passed parameters', () => {
    const intialState = createInitialState({});
    const expectedValue = {
      isPlayed: false,
      isMuted: undefined,
      volume: 50,
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      isLooped: undefined,
    };

    expect(intialState).toEqual(expectedValue);
  });
});
