import styled, { css } from "styled-components";

export const StyledButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 5px 5px;
	font-size:${({ withoutVisibleText }) => withoutVisibleText ? '0px' : '16px'};
	position: relative;
	z-index: 10;
	color:var(--secondary-color);
	transition: color 0.3s ease;

	&>svg{
		width: 30px;
		height: 30px;
		fill: currentColor;
	}

	&:hover{
		color: var(--secondary-hover-color);
		transition: color 0.3s ease;
	}

	${({ primary }) => primary && css`
		background-color: var(--secondary-color);
		color:var(--dark-color);
		transition: color 0.3s ease, background-color 0.3s ease;
		border-radius: 50%;

		&:hover{
			background-color: var(--secondary-hover-color);
			color:var(--dark-color);
			transition: color 0.3s ease, background-color 0.3s ease;
		}
	`}
`;
