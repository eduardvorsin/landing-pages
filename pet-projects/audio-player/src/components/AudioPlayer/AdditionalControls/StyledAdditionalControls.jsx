import styled from "styled-components";

export const StyledAdditionalControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&>*:not(:last-child){
		margin-right:20px;
	}
`;