import React, { useCallback, useEffect, useReducer, useRef } from "react";
import PropTypes from 'prop-types';
import { createInitialState } from "../../state/state";
import { CHANGE_CURRENT_TIME, CHANGE_DURATION, CHANGE_PLAYBACKRATE, CHANGE_VOLUME, LOOP, MUTE, PAUSE, PLAY, UNLOOP, UNMUTE } from "../../actions/actions_types";
import { reducer } from "../../reducers/reducer";
import { AudioControls } from './AudioControls/AudioControls';
import { StyledAudioPlayer } from "./StyledAudioPlayer";
import { ProgressRangeSlider } from "./ProgressRangeSlider/ProgressRangeSlider";
import { TimeBar } from "./TimeBar/TimeBar";
import { formatTime } from "../../helpers/helpers";
import { TrackInfo } from "./TrackInfo/TrackInfo";

export const AudioPlayer = ({
	src,
	trackName,
	trackArtist,
	sources,
	showDownloadControl,
	className,
	showPlaybackRateControl,
	showLoopControl,
	showNextAndPreviousControls,
	onClickPrevious,
	onClickNext,
	...props
}) => {

	const audioRef = useRef(null);
	const progressBar = useRef(null);
	useReducer()
	const [state, dispatch] = useReducer(reducer, {
		muted: props.muted,
		loop: props.loop
	}, createInitialState);

	useEffect(() => {
		const audio = audioRef.current;

		const onLoadedmetadata = () => {
			const duration = Math.floor(audio.duration);
			progressBar.current.max = duration;
			dispatch({
				type: CHANGE_DURATION,
				duration,
			});
		};

		const canPlayThrough = () => {
			const playPromise = audioRef.current.play();
			playPromise.then(_ => {
				dispatch({ type: PLAY });
			}).catch(() => {
				dispatch({ type: PAUSE });
			});
		}

		audio.addEventListener('loadedmetadata', onLoadedmetadata);
		audio.addEventListener('canplaythrough', canPlayThrough);
		return (() => {
			audio.removeEventListener('loadedmetadata', onLoadedmetadata);
			audio.removeEventListener('canplaythrough', canPlayThrough);
		})
	}, []);

	useEffect(() => {
		const isZeroVolume = state.volume < 1;
		const nextAction = isZeroVolume ? { type: MUTE } : { type: UNMUTE }
		dispatch(nextAction);

		audioRef.current.volume = state.volume / 100;
	}, [state.volume]);


	const togglePlaying = useCallback(() => {
		if (state.isPlayed) {
			audioRef.current.pause();
			dispatch({ type: PAUSE });
		} else {
			const playPromise = audioRef.current.play();
			playPromise.then(_ => {
				dispatch({ type: PLAY });
			}).catch(() => {
				dispatch({ type: PAUSE });
			});
		}
	}, [state.isPlayed]);


	const toggleMuting = useCallback(() => {
		const nextAction = state.isMuted ? { type: UNMUTE } : { type: MUTE };
		dispatch(nextAction);

		audioRef.current.muted = state.isMuted;
	}, [state.isMuted]);

	const onVolumeChange = useCallback((e) => {
		dispatch({
			type: CHANGE_VOLUME,
			volume: +e.target.value,
		})
	}, []);

	const changeLooping = useCallback(() => {
		const nextAction = state.isLooped ? { type: UNLOOP } : { type: LOOP };
		dispatch(nextAction);

		audioRef.current.loop = state.isLooped;
	}, [state.isLooped]);

	const changePlaybackRate = useCallback(() => {
		const { playbackRate } = audioRef.current;
		const nextPlaybackRateValue = playbackRate === 2 ? 0.25 : playbackRate + 0.25;
		audioRef.current.playbackRate = nextPlaybackRateValue;

		dispatch({
			type: CHANGE_PLAYBACKRATE,
			playbackRate: audioRef.current.playbackRate,
		});
	}, []);


	const onPlaying = () => {
		const currentTime = Math.floor(audioRef.current.currentTime);
		progressBar.current.value = currentTime;

		dispatch({
			type: CHANGE_CURRENT_TIME,
			currentTime: +progressBar.current.value,
		});

		const calculatedPercent =
			progressBar.current.value * 100 / progressBar.current.max;

		progressBar.current.style = `--progress-percent:${calculatedPercent || 0}%;`;
	}

	const onEnded = () => {
		if (!state.isLooped) {
			onClickNext();
			dispatch({ type: PAUSE });
			dispatch({ type: CHANGE_PLAYBACKRATE, playbackRate: 1 });
		}
	}

	const onProgressChange = () => {
		audioRef.current.currentTime = +progressBar.current.value;
		dispatch({
			type: CHANGE_CURRENT_TIME,
			currentTime: +progressBar.current.value,
		});
	}

	const setProgress = (value) => {
		dispatch({
			type: CHANGE_CURRENT_TIME,
			currentTime: value,
		});
		progressBar.current.value = value;
		audioRef.current.currentTime = value;
	};

	const incrementVolume = () => {
		dispatch({ type: CHANGE_VOLUME, volume: state.volume + 1 });
	};

	const decrementVolume = () => {
		dispatch({ type: CHANGE_VOLUME, volume: state.volume - 1 });
	};


	const onKeyDown = (e) => {
		if (document.activeElement.tagName !== 'DIV') return false;

		switch (e.key) {
			case ' ':
			case 'Enter':
				togglePlaying();
				break;
			case 'ArrowUp':
				if (state.volume < 100) incrementVolume();
				break;
			case 'ArrowDown':
				if (state.volume > 0) decrementVolume();
				break;
			case 'ArrowLeft':
				if (state.currentTime > 0) setProgress(state.currentTime - 1);
				break;
			case 'ArrowRight':
				if (state.currentTime < state.duration) setProgress(state.currentTime + 1);
				break;
			case 'm':
				toggleMuting();
				break;
			case 'l':
				changeLooping();
				break;
			default:
		}
	}

	return (
		<StyledAudioPlayer
			tabIndex={0}
			onKeyDown={onKeyDown}
		>
			<audio
				ref={audioRef}
				src={src}
				muted={state.isMuted}
				loop={state.isLooped}
				onEnded={onEnded}
				onTimeUpdate={onPlaying}
				{...props}
			>
				{sources.map(source => {
					const format = source.match(/\.\w+$/)[0].slice(1);
					return <source
						key={source}
						src={source}
						type={`audio/${format}`}
					/>
				})}
			</audio>

			<TrackInfo
				trackName={trackName}
				trackArtist={trackArtist}
			/>

			<TimeBar
				currentTime={formatTime(state.currentTime)}
				duration={formatTime(state.duration)}
			/>

			<ProgressRangeSlider
				ref={progressBar}
				onChange={onProgressChange}
			/>

			<AudioControls
				playbackRate={state.playbackRate}
				volume={state.volume}
				downloadLink={src}
				isPlayed={state.isPlayed}
				isMuted={state.isMuted}
				isLooped={state.isLooped}
				showDownloadControl={showDownloadControl}
				showLoopControl={showLoopControl}
				showPlaybackRateControl={showPlaybackRateControl}
				togglePlaying={togglePlaying}
				toggleMuting={toggleMuting}
				onVolumeChange={onVolumeChange}
				changePlaybackRate={changePlaybackRate}
				changeLooping={changeLooping}
				showNextAndPreviousControls={showNextAndPreviousControls}
				onClickPrevious={onClickPrevious}
				onClickNext={onClickNext}
			/>
		</StyledAudioPlayer>
	);
}

AudioPlayer.propTypes = {
	trackName: PropTypes.string,
	trackArtist: PropTypes.string,
	showDownloadControl: PropTypes.bool,
	className: PropTypes.string,
	showPlaybackRateControl: PropTypes.bool,
	showLoopControl: PropTypes.bool,
	showNextAndPreviousControls: PropTypes.bool,
	onClickPrevious: PropTypes.func,
	onClickNext: PropTypes.func,
	src: function (props, propName, componentName) {

		if (typeof props[propName] !== 'string') {
			throw new Error(`Invalid type of prop ${propName}, expected to get string in ${componentName} component`);
		}

		if (!props[propName].match(/\.\w+$/)) {
			throw new Error(`Invalid value for prop ${propName}, expected in the trackname.extension format in the ${componentName} component`);
		}
	},
	sources: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
		propValue.forEach(prop => {
			if (typeof prop !== 'string') {
				throw new Error(`Invalid type of prop ${propFullName}, expected to get string in ${componentName} component`);
			}

			if (!prop.match(/\.\w+$/)) {
				throw new Error(`Invalid value for prop ${propFullName}, expected in the trackname.extension format in the ${componentName} component`);
			}
		});
	}),
}

AudioPlayer.defaultProps = {
	src: '',
	trackName: '',
	trackArtist: '',
	sources: [''],
	showDownloadControl: false,
	className: '',
	showPlaybackRateControl: false,
	showLoopControl: false,
	showNextAndPreviousControls: false,
	onClickPrevious: () => { },
	onClickNext: () => { },
}