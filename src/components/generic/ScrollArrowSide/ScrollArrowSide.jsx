import { React, useState, useEffect } from 'react';
import Style from './scrollArrowSide.module.scss';
import { BsArrowDown } from 'react-icons/bs';

export default function ScrollArrowSide() {
	const [bottom, setBottom] = useState(false);

	useEffect(() => {
		const handleScroll = (event) => {
			if (window.pageYOffset > document.documentElement.scrollHeight - window.innerHeight - 10) {
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
		<div className={bottom ? Style.ScrollBottom : Style.Scroll}>
			<p>Scroll</p>
			<BsArrowDown className={Style.Arrow} />
		</div>
	);
}
