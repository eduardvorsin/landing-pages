import { CHANGE_CURRENT_TIME, CHANGE_DURATION, CHANGE_PLAYBACKRATE, CHANGE_VOLUME, MUTE, UNMUTE, PAUSE, PLAY, LOOP, UNLOOP } from "../actions/actions_types"

export function reducer(state, action) {
	switch (action.type) {
		case CHANGE_DURATION: {
			return {
				...state,
				duration: action.duration,
			}
		}
		case CHANGE_CURRENT_TIME: {
			return {
				...state,
				currentTime: action.currentTime,
			}
		}
		case CHANGE_VOLUME: {
			return {
				...state,
				volume: action.volume,
			}
		}
		case CHANGE_PLAYBACKRATE: {
			return {
				...state,
				playbackRate: action.playbackRate,
			}
		}
		case PLAY: {
			return {
				...state,
				isPlayed: true,
			}
		}
		case PAUSE: {
			return {
				...state,
				isPlayed: false,
			}
		}
		case MUTE: {
			return {
				...state,
				isMuted: true,
			}
		}
		case UNMUTE: {
			return {
				...state,
				isMuted: false,
			}
		}
		case LOOP: {
			return {
				...state,
				isLooped: true,
			}
		}
		case UNLOOP: {
			return {
				...state,
				isLooped: false,
			}
		}
		default: {
			return state;
		}
	}
}
