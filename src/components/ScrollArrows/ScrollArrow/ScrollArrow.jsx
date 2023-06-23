import { React, useState, useEffect } from 'react';
import Style from './scrollArrow.module.scss';
import { BsArrowDown } from 'react-icons/bs';

export default function ScrollArrow() {
	const [top, setTop] = useState(true);
	const [bottom, setBottom] = useState(false);

	useEffect(() => {
		const handleScroll = (event) => {
			// -----> state for transitioning out of top
			if (window.pageYOffset >= 30) {
				setTop(false);
			} else if (window.pageYOffset < 30) {
				setTop(true);
			}
			if (window.pageYOffset > document.documentElement.scrollHeight - window.innerHeight - 50) {
				setBottom(true);
			} else {
				setBottom(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={top ? Style.ScrollTop : bottom ? Style.ScrollBottom : Style.ScrollActive}>
			<p>Scroll</p>
			<BsArrowDown className={Style.Arrow} />
		</div>
	);
}
