export const createInitialState = ({
	muted = false,
	loop = false,
}) => ({
	isPlayed: false,
	isMuted: muted,
	volume: 50,
	currentTime: 0,
	duration: 0,
	playbackRate: 1,
	isLooped: loop,
});