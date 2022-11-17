import React from "react";
import PropTypes from "prop-types";
import { StyledAdditionalControls } from "./StyledAdditionalControls";
import { Button } from "../../UI/Button/Button";
import { PlaybackRateButton } from "../PlaybackRateButton/PlaybackRateButton";
import { ReactComponent as RepeatIcon } from '../../../assets/images/icons/repeat.svg';
import { ReactComponent as NoRepeatIcon } from '../../../assets/images/icons/no-repeat.svg';
import { ReactComponent as DownloadIcon } from '../../../assets/images/icons/download.svg';

export const AdditionalControls = React.memo(({
	showDownloadControl,
	downloadLink,
	showPlaybackRateControl,
	changePlaybackRate,
	playbackRate,
	showLoopControl,
	changeLooping,
	isLooped,
}) => {

	const repeatButtonIcon = isLooped ? <RepeatIcon /> : <NoRepeatIcon />;

	return (
		<StyledAdditionalControls>
			{showDownloadControl &&
				<Button
					withoutVisibleText
					href={downloadLink}
					startIcon={<DownloadIcon />}
					download
				>
					download track
				</Button>
			}
			{showPlaybackRateControl &&
				<PlaybackRateButton
					aria-label='current playback rate'
					onClick={changePlaybackRate}
				>
					{`${playbackRate}x`}
				</PlaybackRateButton>
			}
			{showLoopControl &&
				<Button
					withoutVisibleText
					startIcon={repeatButtonIcon}
					onClick={changeLooping}
				>
					{isLooped ? 'don\'t repeat the song ' : 'repeat song infinite'}
				</Button>
			}
		</StyledAdditionalControls>
	);
});

AdditionalControls.propTypes = {
	showDownloadControl: PropTypes.bool,
	downloadLink: PropTypes.string,
	showPlaybackRateControl: PropTypes.bool,
	changePlaybackRate: PropTypes.func,
	playbackRate: PropTypes.number,
	showLoopControl: PropTypes.bool,
	changeLooping: PropTypes.func,
	isLooped: PropTypes.bool,
};

AdditionalControls.defaultProps = {
	showDownloadControl: false,
	downloadLink: '',
	showPlaybackRateControl: false,
	changePlaybackRate: () => { },
	playbackRate: 1,
	showLoopControl: false,
	changeLooping: () => { },
	isLooped: false,
};
