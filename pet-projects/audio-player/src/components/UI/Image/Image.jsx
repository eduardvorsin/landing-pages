import PropTypes from 'prop-types';
import { StyledImage } from './StyledImage';

export const Image = ({
	src,
	width,
	height,
	className,
	alt,
	...props
}) => {
	return (
		<StyledImage
			src={src}
			width={width}
			height={height}
			alt={alt}
			className={className}
			{...props}
		/>
	);
};

Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	className: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
}

Image.defaultProps = {
	src: '',
	alt: '',
	className: '',
	width: 50,
	height: 50,
}