import styled from "styled-components";
import { Button } from "../../UI/Button/Button";

export const PlaybackRateButton = styled(Button)`
	padding: 2.5px;
	font-size: 16px;
	border: 2px solid var(--secondary-color);
	transition: color 0.3s ease, background-color 0.3s ease;
	border-radius: 10px;
	min-width: 55px;
	color:var(--dark-color);
	background-color: var(--secondary-color);

	&:hover{
		background-color: var(--secondary-hover-color);
		color:var(--dark-color);
		transition: color 0.3s ease, background-color 0.3s ease;
	}
`;