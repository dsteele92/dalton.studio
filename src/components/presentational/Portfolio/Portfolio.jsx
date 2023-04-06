import { React, useState, useEffect, useRef } from 'react';
import Style from './portfolio.module.scss';
import { LinksLine, LoadingBounce, ScrollArrowSide } from 'components';

import { SiMaterialui, SiExpress, SiFirebase } from 'react-icons/si';
import { GrCloudComputer } from 'react-icons/gr';
import { AiOutlineCloudServer } from 'react-icons/ai';
import {
	DiReact,
	DiJsBadge,
	DiMongodb,
	DiFirebase,
	DiHtml5,
	DiCss3Full,
	DiGithubBadge,
	DiNpm,
	DiNodejsSmall,
	DiSass,
} from 'react-icons/di';

const goalsAppImg = require('../../../images/goals_app.png');
const bookingImg = require('../../../images/direct_booking_screenshot.png');
const findFirmImg = require('../../../images/find_firm.png');
const weeklyGoalsGif = require('../../../gifs/GoalsAppGif.gif');
const findFirmGif = require('../../../gifs/FindFirmGif.gif');
const bookingGif = require('../../../gifs/bookingGif.gif');
const triviaImg = require('../../../images/trivia_game.png');
const triviaGif = require('../../../gifs/trivia_game.gif');

export default function Portfolio() {
	const [top, setTop] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [seeLinks, setSeeLinks] = useState(false);

	const [playGif1, setPlayGif1] = useState(false);
	const [playGif2, setPlayGif2] = useState(false);
	const [playGif3, setPlayGif3] = useState(false);
	const [playGif4, setPlayGif4] = useState(false);

	const goalsAppPic = useRef();
	const bookingPic = useRef();
	const findFirmPic = useRef();
	const triviaGamePic = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);

		const disableScroll = (event) => {
			window.scrollTo(0, 0);
		};
		const handleScroll = (event) => {
			// console.log(window.pageYOffset);
			// -----> state for transitioning out of top
			if (window.pageYOffset >= 1) {
				setTop(false);
			} else if (window.pageYOffset < 1) {
				setTop(true);
			}
			if (window.pageYOffset >= document.documentElement.scrollHeight - window.innerHeight - 300) {
				setSeeLinks(true);
			}
			if (window.pageYOffset < document.documentElement.scrollHeight - window.innerHeight - 600) {
				setSeeLinks(false);
			}
		};

		setTimeout(() => {
			window.removeEventListener('scroll', disableScroll);
			window.addEventListener('scroll', handleScroll);
			setLoaded(true);
		}, '1000');

		window.addEventListener('scroll', disableScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={!loaded ? Style.PortfolioLoading : Style.Portfolio}>
			<div className={!loaded ? Style.OpenScreen : Style.OpenScreenLoaded}></div>
			<div className={!loaded ? Style.LoadingPage : Style.LoadingPageHide}>
				<LoadingBounce />
			</div>
			{/* {loaded && <ScrollArrowSide />} */}
			<main className={loaded ? Style.Main : Style.MainLoading}>
				<section className={Style.Work}>
					<div className={Style.Title}>
						<svg height='20' width='120'>
							<polyline
								className={Style.Icon}
								points='10,10 30,30 50,10 70,30 90,10 110,30 130,10 150,30 170,10 190,30 210,10'
							/>
						</svg>
						<div className={Style.Header}>
							WO
							<br />
							RK.
						</div>
						<div className={Style.HeaderMobile}>WORK.</div>
					</div>
					<div className={top ? Style.Intro : Style.IntroScroll}>
						<h2>Take a peek below at some of my latest projects...</h2>
						<div className={Style.GitHub}>
							<a href='https://github.com/dsteele92' target='_blank' rel='noopener noreferrer'>
								<span>
									<DiGithubBadge />
								</span>
								<p>dsteele92</p>
							</a>
						</div>
					</div>
				</section>
				<section className={Style.Projects}>
					<div
						className={Style.Booking}
						onMouseEnter={() => setPlayGif4(true)}
						onMouseLeave={() => setPlayGif4(false)}>
						<a
							className={Style.Anchor}
							href='https://tabor-bnb.web.app/'
							target='_blank'
							rel='noopener noreferrer'>
							<div className={Style.Description}>
								<h4>Web Page</h4>
								<h3>B&B Direct Booking Site</h3>
							</div>
							<img className={Style.Image} src={bookingImg} alt='direct booking site' ref={bookingPic} />
							<img
								className={playGif4 ? Style.GifPlay : Style.Gif}
								src={bookingGif}
								alt='booking site gif'
							/>
						</a>
						<div className={Style.Info}>
							<div className={Style.Icon}>
								<SiFirebase />
								<p>Firebase</p>
							</div>
							<div className={Style.Icon}>
								<AiOutlineCloudServer />
								<p>API</p>
							</div>
							<div className={Style.Icon}>
								<SiExpress />
								<p>Express</p>
							</div>
							<div className={Style.Icon}>
								<DiReact />
								<p>React.js</p>
							</div>
							<div className={Style.Icon}>
								<DiSass />
								<p>Sass</p>
							</div>
							<div className={Style.Icon}>
								<DiHtml5 />
								<p>HTML</p>
							</div>
						</div>
					</div>
					<div
						className={Style.GoalsApp}
						onMouseEnter={() => setPlayGif1(true)}
						onMouseLeave={() => setPlayGif1(false)}>
						<a
							className={Style.Anchor}
							href='https://weekly-goals-app.web.app/'
							target='_blank'
							rel='noopener noreferrer'>
							<div className={Style.Description}>
								<h4>Web App</h4>
								<h3>Weekly Goal Scheduler</h3>
							</div>
							<img className={Style.Image} src={goalsAppImg} alt='weekly goals app' ref={goalsAppPic} />
							<img
								className={playGif1 ? Style.GifPlay : Style.Gif}
								src={weeklyGoalsGif}
								alt='weekly goals app gif'
							/>
						</a>
						<div className={Style.Info}>
							<div className={Style.Icon}>
								<DiMongodb />
								<p>Mongo DB</p>
							</div>
							<div className={Style.Icon}>
								<SiExpress />
								<p>Express</p>
							</div>
							<div className={Style.Icon}>
								<DiFirebase />
								<p>REST API</p>
							</div>
							<div className={Style.Icon}>
								<DiReact />
								<p>React.js</p>
							</div>
							<div className={Style.Icon}>
								<DiSass />
								<p>Sass</p>
							</div>
							<div className={Style.Icon}>
								<DiHtml5 />
								<p>HTML</p>
							</div>
							<div className={Style.Icon}>
								<SiMaterialui />
								<p>Material UI</p>
							</div>
						</div>
					</div>
					<div
						className={Style.TriviaGame}
						onMouseEnter={() => setPlayGif3(true)}
						onMouseLeave={() => setPlayGif3(false)}>
						<a
							className={Style.Anchor}
							href='https://trivia-game-ffc01.web.app/'
							target='_blank'
							rel='noopener noreferrer'>
							<div className={Style.Description}>
								<h4>Web App</h4>
								<h3>Trivia Game</h3>
							</div>
							<img className={Style.Image} src={triviaImg} alt='trivia game' ref={triviaGamePic} />
							<img
								className={playGif3 ? Style.GifPlay : Style.Gif}
								src={triviaGif}
								alt='trivia game gif'
							/>
						</a>
						<div className={Style.Info}>
							<div className={Style.Icon}>
								<AiOutlineCloudServer />
								<p>API</p>
							</div>
							<div className={Style.Icon}>
								<DiReact />
								<p>React.js</p>
							</div>
							<div className={Style.Icon}>
								<DiSass />
								<p>Sass</p>
							</div>
							<div className={Style.Icon}>
								<DiHtml5 />
								<p>HTML</p>
							</div>
						</div>
					</div>
					<div
						className={Style.FindFirm}
						onMouseEnter={() => setPlayGif2(true)}
						onMouseLeave={() => setPlayGif2(false)}>
						<a
							className={Style.Anchor}
							href='http://thefindfirm.com/'
							target='_blank'
							rel='noopener noreferrer'>
							<div className={Style.Description}>
								<h4>Web Page</h4>
								<h3>The Find Firm, LLC</h3>
							</div>
							<img className={Style.Image} src={findFirmImg} alt='the find firm' ref={findFirmPic} />
							<img
								className={playGif2 ? Style.GifPlay : Style.Gif}
								src={findFirmGif}
								alt='the find firm gif'
							/>
						</a>
						<div className={Style.Info}>
							<div className={Style.Icon}>
								<DiReact />
								<p>React.js</p>
							</div>
							<div className={Style.Icon}>
								<DiSass />
								<p>Sass</p>
							</div>
							<div className={Style.Icon}>
								<DiHtml5 />
								<p>HTML</p>
							</div>
						</div>
					</div>
					{/* <div className={Style.lifeImprovements}>
						<div className={Style.Anchor}>
							<a
							className={Style.Anchor}
							href=''
							target='_blank'
							rel='noopener noreferrer'>
							<div className={Style.Description}>
								<h4>Web Page</h4>
								<h3>Life Improvements</h3>
							</div>
							<img
								className={Style.Image}
								src={lifeImprovementsImg}
								alt='life improvements'
								ref={lifeImprovementPic}
							/>
							</a>
						</div>
						<div className={Style.Info}>
							<div className={Style.Icon}>
								<DiReact />
								<p>React.js</p>
							</div>
							<div className={Style.Icon}>
								<DiSass />
								<p>Sass</p>
							</div>
							<div className={Style.Icon}>
								<DiHtml5 />
								<p>HTML</p>
							</div>
						</div>
					</div> */}
				</section>
				<div className={Style.BottomBackground}></div>
				<section className={seeLinks ? Style.Links : Style.LinksHide}>
					<LinksLine color='#3333335a' opacity='1' />
				</section>
			</main>
		</div>
	);
}
