import { React, useEffect, useRef } from 'react';
import Style from './rightNav.module.scss';

import { goToIntro, goToWebDev, goToFitness } from '../../../scrollBreakpoints.js';
import { RiHome4Fill } from 'react-icons/ri';
import { BsCodeSlash } from 'react-icons/bs';
import { IoMdFitness } from 'react-icons/io';

export default function RightNav() {
	const currentHome = useRef();
	const currentWebDev = useRef();
	const currentFitness = useRef();

	useEffect(() => {
		const handleScroll = (event) => {
			// -----> manage gradient change of nav links
			const offset = window.pageYOffset;
			const height = window.outerHeight;

			let pageOnePercentOpen = 1;
			let pageTwoPercentOpen = 0;
			let pageThreePercentOpen = 0;

			if (offset > 1.0 * height) {
				pageOnePercentOpen = 1 - (offset - 1.0 * height) / height;
				pageTwoPercentOpen = (offset - 1.0 * height) / height;
			}
			if (offset > 2.0 * height) {
				pageTwoPercentOpen = 1 - (offset - 2.0 * height) / height;
				pageThreePercentOpen = (offset - 2.0 * height) / height;
			}

			currentHome.current.style.opacity = `${pageOnePercentOpen}`;
			currentWebDev.current.style.opacity = `${pageTwoPercentOpen}`;
			currentFitness.current.style.opacity = `${pageThreePercentOpen}`;
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav className={Style.Nav}>
			<ul>
				<li className={Style.List} onClick={goToIntro}>
					<div className={Style.Icon}>
						<RiHome4Fill />
					</div>
					<div className={Style.IconCurrentHome} ref={currentHome}>
						<RiHome4Fill style={{ fill: 'url(#gradient)' }} />
					</div>
				</li>
				<li className={Style.List} onClick={goToWebDev}>
					<div className={Style.Icon}>
						<BsCodeSlash />
					</div>
					<div className={Style.IconCurrent} ref={currentWebDev}>
						<BsCodeSlash style={{ fill: 'url(#gradient)' }} />
					</div>
				</li>
				<li className={Style.List} onClick={goToFitness}>
					<div className={Style.Icon}>
						<IoMdFitness />
					</div>
					<div className={Style.IconCurrent} ref={currentFitness}>
						<IoMdFitness style={{ fill: 'url(#gradient)' }} />
					</div>
				</li>
				<svg width='0' height='0'>
					<linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
						<stop stopColor='#da4141' offset='0%' />
						<stop stopColor='#9198e5' offset='100%' />
					</linearGradient>
				</svg>
			</ul>
		</nav>
	);
}
