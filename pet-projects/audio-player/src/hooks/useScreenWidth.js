import { useEffect, useState } from "react";

export const useScreenWidth = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		const resizeHandler = (e) => {
			setScreenWidth(e.currentTarget.innerWidth);
		}

		window.addEventListener('resize', resizeHandler);
		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, []);

	return screenWidth;
}