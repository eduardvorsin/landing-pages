import React from "react";
import PropTypes from 'prop-types';
import { StyledMainControls } from "./StyledMainControls";
import { ReactComponent as PlayIcon } from '../../../assets/images/icons/play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/images/icons/pause.svg';
import { ReactComponent as PrevIcon } from '../../../assets/images/icons/prev.svg';
import { ReactComponent as NextIcon } from '../../../assets/images/icons/next.svg';
import { Button } from "../../UI/Button/Button";

export const MainControls = React.memo(({
	isPlayed,
	togglePlaying,
	showNextAndPreviousControls,
	onClickPrevious,
	onClickNext,
}) => {
	const playButtonIcon = isPlayed ? <PauseIcon /> : <PlayIcon />;

	const previousClickHandler = async () => {
		onClickPrevious();
	}
	const nextClickHandler = () => {
		onClickNext();
	}

	return (
		<StyledMainControls nextAndPrevious={showNextAndPreviousControls}>
			{showNextAndPreviousControls &&
				<Button
					primary
					withoutVisibleText
					startIcon={<PrevIcon />}
					onClick={previousClickHandler}
				>
					prev track
				</Button>
			}
			<Button
				primary
				withoutVisibleText
				startIcon={playButtonIcon}
				onClick={togglePlaying}
			>
				{isPlayed ? 'pause' : 'play'}
			</Button>
			{showNextAndPreviousControls &&
				<Button
					primary
					withoutVisibleText
					startIcon={<NextIcon />}
					onClick={nextClickHandler}
				>
					next track
				</Button>
			}
		</StyledMainControls>
	)
});

MainControls.propTypes = {
	togglePlaying: PropTypes.func,
	isPlayed: PropTypes.bool,
	showNextAndPreviousControls: PropTypes.bool,
	onClickPrevious: PropTypes.func,
	onClickNext: PropTypes.func,
};

MainControls.defaultProps = {
	isPlayed: false,
	togglePlaying: () => { },
	showNextAndPreviousControls: false,
	onClickPrevious: () => { },
	onClickNext: () => { },
};


