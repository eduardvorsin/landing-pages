import styled from "styled-components";

export const StyledTrackInfo = styled.div`
	font-size: 16px;
	letter-spacing: 0.3px;
	color:var(--secondary-color);
	text-align: center;
	margin-bottom: 10px;

	&>*:not(:last-child){
		margin-bottom:10px;
	}
`;

export const StyledTrackName = styled.p`
	font-weight: 700;
`;

export const StyledTrackArtist = styled.p``;