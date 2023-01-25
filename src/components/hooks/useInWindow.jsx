import { React, useState, useEffect } from 'react';

export default function useInWindow(offsetTop) {
	const [inWindow, setInWindow] = useState(null);

	useEffect(() => {
		const handleScroll = (event) => {
			if (window.pageYOffset > offsetTop) {
				setInWindow(true);
			} else if (window.pageYOffset < offsetTop - 200) {
				setInWindow(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [offsetTop]);

	return inWindow;
}
