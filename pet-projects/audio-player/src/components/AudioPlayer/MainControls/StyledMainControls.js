import styled from "styled-components";

export const StyledMainControls = styled.div`
	align-self:center;
	display: flex;
	justify-content: ${({ nextAndPrevious }) => nextAndPrevious ? 'center' : 'flex-start'};
	
	& > *:not(:last-child){
		margin-right: 10px;
	}
`;
