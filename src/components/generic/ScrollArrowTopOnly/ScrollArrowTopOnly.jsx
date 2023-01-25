import { React, useState, useEffect } from 'react';
import Style from './scrollArrowTopOnly.module.scss';
import { BsArrowDown } from 'react-icons/bs';

export default function ScrollArrowTopOnly(props) {
	const [top, setTop] = useState(true);
	useEffect(() => {
		const handleScroll = (event) => {
			// -----> state for transitioning out of top
			if (window.pageYOffset >= 30) {
				setTop(false);
			} else if (window.pageYOffset < 30) {
				setTop(true);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			className={top ? Style.ScrollTop : Style.ScrollTopHide}
			style={{ color: props.color ? props.color : 'white' }}>
			<p>Scroll</p>
			<BsArrowDown className={Style.Arrow} />
		</div>
	);
}
