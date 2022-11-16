import styled, { css } from "styled-components";

const Thumb = css`
  appearance: none;
	width: var(--thumb-size);
	height:var(--thumb-size);
	border-radius: 50%;
	background-color: var(--brand-color);
	border:2px solid var(--brand-color);
	margin-top: calc((var(--track-height) / 2 - var(--thumb-size) / 2));
	transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
`;

const ThumbActive = css`
	transform: scale(1.2);
	transition: transform 0.3s ease;
`;

const ThumbHover = css`
	background-color: var(--brand-hover-color);
	transition: background-color 0.3s ease;
`;

const ThumbDisabled = css`
	border-color: var(--brand-disabled-color);
	background-color: var(--brand-disabled-color);
	transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const Track = css`
	background: var(--tertiary-color);
  height: var(--track-height);
	border-radius: var(--track-height);
	transition: background-color 0.3s ease;
`;

const TrackDisabled = css`
	background-color: var(--tertiary-disabled-color);
	transition: background-color 0.3s ease;
`;

export const StyledRangeSlider = styled.div`
	--track-height:8px;
	--track-width:150px;
	--thumb-size:20px;

	display: inline-flex;
	align-items:center;
  padding: 0;
	max-width: ${({ isVertical }) => isVertical ? 'initial' : '100%'};
	width: ${({ isVertical }) => isVertical ? 'var(--track-height)' : '100%'};
	height: ${({ isVertical }) => isVertical ? 'var(--track-width)' : 'var(--track-height)'};
	position: relative;

	&>input{
		background: transparent;
		margin: 0;
		border-radius: var(--track-height);
		max-width: ${({ isVertical }) => isVertical ? 'initial' : '100%'} ;
		width: ${({ isVertical }) => isVertical ? 'var(--track-width)' : '100%'};
		height:var(--track-height);
		cursor:pointer;
		transition: color 0.3s ease, outline 0.3s ease;

		${({ isVertical }) => isVertical && css`
			writing-mode: bt-lr;
			transform: rotate(-90deg) translateY(calc(var(--track-height) / 2));
    	transform-origin: left center;
			position:absolute;
			left:0;
			bottom: -0.25em;
		`}

		&::-webkit-slider-runnable-track,
		&::-webkit-slider-thumb,
		& {
				appearance: none;
			}

		&::-webkit-slider-runnable-track {
			${Track}
			background: linear-gradient(
				to right, 
				var(--secondary-color) 0%, 
				var(--secondary-color) var(--progress-percent), 
				var(--tertiary-color) var(--progress-percent), 
				var(--tertiary-color) 100%
			);
		}
		
		&::-moz-range-track {
			${Track}
		}

		&::-moz-range-progress {
			width: var(--track-width);
			height: var(--track-height);
			background-color: var(--secondary-color);
			border-radius: var(--track-height);
		}

		&::-webkit-slider-thumb {
			${Thumb}
		}

		&::-moz-range-thumb {
			${Thumb}
		} 

		&:active{
			&::-webkit-slider-thumb {
				${ThumbActive}
			}

			&::-moz-range-thumb{
				${ThumbActive}
			}
		}

		&:hover{
			&::-webkit-slider-thumb {
				${ThumbHover}
			}

			&::-moz-range-thumb{
				${ThumbHover}
			}
		}

		&:disabled{
			&::-webkit-slider-thumb {
				${ThumbDisabled}
			}

			&::-moz-range-thumb{
				${ThumbDisabled}
			}

			&::-webkit-slider-runnable-track {
				${TrackDisabled}
				background: linear-gradient(
					to right, 
					var(--secondary-color) 0%, 
					var(--secondary-color) var(--progress-percent), 
					var(--tertiary-disabled-color) var(--progress-percent), 
					var(--tertiary-disabled-color) 100%
				);
			}
		
			&::-moz-range-track {
				${TrackDisabled}
			}
		}
	}
`;