import React from "react";
import PropTypes from "prop-types";
import { useScreenWidth } from "../../../hooks/useScreenWidth";
import { StyledAudioControls } from "./StyledAudioControls";
import { MainControls } from "../MainControls/MainControls";
import { AdditionalControls } from "../AdditionalControls/AdditionalControls";
import { VolumeControls } from "../VolumeControls/VolumeControls";

export const AudioControls = React.memo(({
	isPlayed,
	togglePlaying,
	isMuted,
	toggleMuting,
	volume,
	onVolumeChange,
	showDownloadControl,
	downloadLink,
	playbackRate,
	showPlaybackRateControl,
	changePlaybackRate,
	showLoopControl,
	isLooped,
	changeLooping,
	showNextAndPreviousControls,
	onClickPrevious,
	onClickNext,
}) => {

	const screenWidth = useScreenWidth();
	const isMobileWidth = screenWidth < 769;
	const showAdditionalControls =
		showDownloadControl || showPlaybackRateControl || showLoopControl;

	return (
		<StyledAudioControls>
			<MainControls
				isPlayed={isPlayed}
				togglePlaying={togglePlaying}
				showNextAndPreviousControls={showNextAndPreviousControls}
				onClickPrevious={onClickPrevious}
				onClickNext={onClickNext}
			/>
			{!isMobileWidth &&
				<VolumeControls
					volume={volume}
					onVolumeChange={onVolumeChange}
					isMuted={isMuted}
					toggleMuting={toggleMuting}
				/>
			}
			{showAdditionalControls &&
				<AdditionalControls
					showDownloadControl={showDownloadControl}
					downloadLink={downloadLink}
					showPlaybackRateControl={showPlaybackRateControl}
					changePlaybackRate={changePlaybackRate}
					playbackRate={playbackRate}
					showLoopControl={showLoopControl}
					changeLooping={changeLooping}
					isLooped={isLooped}
				/>
			}
		</StyledAudioControls>
	);
});

AudioControls.propTypes = {
	isPlayed: PropTypes.bool,
	togglePlaying: PropTypes.func,
	isMuted: PropTypes.bool,
	toggleMuting: PropTypes.func,
	volume: PropTypes.number,
	onVolumeChange: PropTypes.func,
	showDownloadControl: PropTypes.bool,
	downloadLink: PropTypes.string,
	playbackRate: PropTypes.number,
	showPlaybackRateControl: PropTypes.bool,
	changePlaybackRate: PropTypes.func,
	showLoopControl: PropTypes.bool,
	isLooped: PropTypes.bool,
	changeLooping: PropTypes.func,
	showNextAndPreviousControls: PropTypes.bool,
	onClickPrevious: PropTypes.func,
	onClickNext: PropTypes.func,
};

AudioControls.defaultProps = {
	isPlayed: false,
	togglePlaying: () => { },
	isMuted: false,
	toggleMuting: () => { },
	volume: 50,
	onVolumeChange: () => { },
	showDownloadControl: false,
	downloadLink: '',
	playbackRate: 1,
	showPlaybackRateControl: false,
	changePlaybackRate: () => { },
	showLoopControl: false,
	isLooped: false,
	changeLooping: () => { },
	showNextAndPreviousControls: false,
	onClickPrevious: () => { },
	onClickNext: () => { },
};
