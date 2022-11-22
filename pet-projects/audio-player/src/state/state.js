export const createInitialState = (parameters = {
  muted: false,
  loop: false,
}) => ({
  isPlayed: false,
  isMuted: parameters.muted,
  volume: 50,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  isLooped: parameters.loop,
});
