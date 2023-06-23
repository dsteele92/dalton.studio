import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Style from './about.module.scss';

import { LinksGrid, ScrollArrowTopOnly, ScrollArrowBottom, LoadingBounce, useHasIntersected } from 'components';
import AboutMePic from '../../assets/images/aboutMe_compressed.jpeg';

import { FaLinkedin } from 'react-icons/fa';

export default function About() {
	const [top, setTop] = useState(true);
	const [loaded, setLoaded] = useState(false);

	const [CV, CVIntersected] = useHasIntersected({ threshold: 0.25 });

	useEffect(() => {
		window.scrollTo(0, 0);

		const disableScroll = (event) => {
			window.scrollTo(0, 0);
		};
		const handleScroll = (event) => {
			console.log(window.pageYOffset);
			// -----> state for transitioning out of top
			if (window.pageYOffset >= 30) {
				setTop(false);
			} else if (window.pageYOffset < 30) {
				setTop(true);
			}
		};

		window.addEventListener('scroll', disableScroll);

		setTimeout(() => {
			window.removeEventListener('scroll', disableScroll);
			window.addEventListener('scroll', handleScroll);
			setLoaded(true);
		}, '1000');

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={Style.AboutPage}>
			<div className={Style.Right}></div>
			<div className={!loaded ? Style.LeftLoading : top ? Style.LeftTop : Style.LeftScroll}></div>
			<div className={!loaded ? Style.LoadingPage : Style.LoadingPageHide}>
				<LoadingBounce />
			</div>
			<main className={loaded ? Style.Main : Style.MainLoading}>
				<section className={top ? Style.AboutMe : Style.AboutMeScroll}>
					<div className={Style.Title}>
						<svg height='20' width='120'>
							<polyline
								className={Style.WDIcon}
								points='10,10 30,30 50,10 70,30 90,10 110,30 130,10 150,30 170,10 190,30 210,10'
							/>
						</svg>
						<div className={Style.Header}>ABOUT.</div>
					</div>
					<h2 className={Style.Intro}>Hi, I'm Dalton. I'm the guy coding next to you in the coffee shop.</h2>
					<p className={Style.Intro}>
						I'm a self-taught web developer who enjoys creating sites and apps that are functional and easy
						on the eyes.
					</p>
					<p className={Style.Intro}>
						Over the years, I've worked in chemistry, medicine, and the health & fitness space. Now as a
						developer, I get to solve technical problems while tapping into my creative side.
					</p>
				</section>

				<div className={top ? Style.PhotoDiv : Style.PhotoDivScroll}>
					<img src={AboutMePic} alt='Dalton' />
				</div>

				<section className={top ? Style.CV : Style.CVScroll} ref={CV}>
					<h2>Experience & Education</h2>
					<ul>
						<li>
							<svg height='10' width='110'>
								<polyline
									className={CVIntersected ? Style.CVIconIntersected : Style.CVIcon}
									points='5,5 15,15 25,5 35,15 45,5 55,15 65,5 75,15 85,5 95,15 105,5'
								/>
							</svg>
						</li>
						<li>
							<h3>Software Engineer</h3>
							<h4>
								The Find Firm & Freelance <span>2022-Present</span>
							</h4>
						</li>
						<li>
							<h3>Owner, Personal Trainer</h3>
							<h4>
								Steele Fitness, LLC <span>2017-Present</span>
							</h4>
						</li>
						<li>
							<h3>Personal Trainer</h3>
							<h4>
								Equinox <span>2016-2017</span>
							</h4>
						</li>
					</ul>
					<ul>
						<li>
							<svg height='10' width='110'>
								<polyline
									className={CVIntersected ? Style.CVIconIntersected : Style.CVIcon}
									points='5,5 15,15 25,5 35,15 45,5 55,15 65,5 75,15 85,5 95,15 105,5'
								/>
							</svg>
						</li>
						<li>
							<h3>Master of Science, Medical Sciences</h3>
							<h4>
								University of Colorado, Denver <span>2021</span>
							</h4>
						</li>
						<li>
							<h3>Master of Science, Organic Chemistry</h3>
							<h4>
								University of California, Los Angeles <span>2016</span>
							</h4>
						</li>
						<li>
							<h3>Bachelor of Science, Chemistry</h3>
							<h4>
								Florida International University <span>2014</span>
							</h4>
						</li>
					</ul>

					<div className={Style.LinkedIn}>
						<a href='https://www.linkedin.com/in/daltondsteele/' target='_blank' rel='noopener noreferrer'>
							<h3>Connect with me on LinkedIn</h3>
							<FaLinkedin />
						</a>
					</div>
				</section>

				<section className={top ? Style.LinksHide : Style.Links}>
					<LinksGrid />
				</section>

				<div className={Style.ScrollArrow}>
					<ScrollArrowTopOnly />
				</div>
				<div className={Style.ScrollArrow}>
					<ScrollArrowBottom />
				</div>
			</main>
		</div>
	);
}
