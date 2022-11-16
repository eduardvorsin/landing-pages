import React from "react";
import PropTypes from 'prop-types';
import { StyledButton } from "./StyledButton";

export const Button = ({
	children,
	className,
	onClick,
	onKeyDown,
	startIcon,
	endIcon,
	...props
}) => {
	const Tag = props.href ? 'a' : 'button';

	const clickHandler = (e) => {
		onClick(e);
	};

	const keyDownHandler = (e) => {
		onKeyDown(e);
	}

	return (
		<StyledButton as={Tag}
			className={className}
			onClick={clickHandler}
			onKeyDown={keyDownHandler}
			{...props}
		>
			{startIcon}
			{children}
			{endIcon}
		</StyledButton>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
	startIcon: PropTypes.element,
	endIcon: PropTypes.element,
}

Button.defaultProps = {
	children: null,
	className: '',
	onClick: () => { },
	onKeyDown: () => { },
	startIcon: <></>,
	endIcon: <></>,
}