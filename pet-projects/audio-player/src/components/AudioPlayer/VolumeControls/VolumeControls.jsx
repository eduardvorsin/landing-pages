import React from "react";
import PropTypes from 'prop-types';
import { Button } from "../../UI/Button/Button";
import { StyledVolumeControls } from "./StyledVolumeControls";
import { ReactComponent as MuteIcon } from '../../../assets/images/icons/mute.svg';
import { ReactComponent as VolumeIcon } from '../../../assets/images/icons/volume.svg';
import { RangeSlider } from "../../UI/RangeSlider/RangeSlider";


export const VolumeControls = React.memo(({
	volume,
	onVolumeChange,
	isMuted,
	toggleMuting,
}) => {
	const currentIcon = isMuted ? <MuteIcon /> : <VolumeIcon />;

	return (
		<StyledVolumeControls>
			<Button
				withoutVisibleText
				startIcon={currentIcon}
				onClick={toggleMuting}
			>
				{isMuted ? 'unmute' : 'mute'}
			</Button>
			<RangeSlider
				onChange={onVolumeChange}
				value={volume}
			/>
		</StyledVolumeControls>
	);
});


VolumeControls.propTypes = {
	volume: PropTypes.number,
	onVolumeChange: PropTypes.func,
	isMuted: PropTypes.bool,
	toggleMuting: PropTypes.func,
};

VolumeControls.defaultProps = {
	volume: 50,
	onVolumeChange: () => { },
	isMuted: false,
	toggleMuting: () => { },
};

