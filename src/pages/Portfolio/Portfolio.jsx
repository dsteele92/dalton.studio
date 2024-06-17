import { React, useState, useEffect } from 'react';
import Style from './portfolio.module.scss';
import { LinksLine, LoadingBounce, useHasIntersected, D3Container } from 'components';

import { SiMaterialui, SiExpress, SiFirebase, SiD3Dotjs } from 'react-icons/si';
import { DiReact, DiMongodb, DiHtml5, DiGithubBadge, DiSass } from 'react-icons/di';
import { FaAws } from 'react-icons/fa';

const goalsAppImg = require('../../assets/images/goals_app.png');
const bookingImg = require('../../assets/images/direct_booking_screenshot.png');
const jdImg = require('../../assets/images/jd.png');
const triviaImg = require('../../assets/images/trivia_game.png');
const dataVisTree = require('../../assets/images/dino_tree.png');
const dataVisSunburst = require('../../assets/images/sunburst.png');
const dataVisBarChartRace = require('../../assets/images/bar_chart_race.png');

export default function Portfolio() {
	const [top, setTop] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [seeLinks, setSeeLinks] = useState(false);

	const [openDataVis, setOpenDataVis] = useState(0);

	const [webDevTitle, webDevTitleIntersected] = useHasIntersected({ threshold: 0.5 });

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
		<div className={!loaded ? Style.PortfolioLoading : Style.Portfolio}>
			<div className={!loaded ? Style.OpenScreen : Style.OpenScreenLoaded}></div>
			<div className={!loaded ? Style.LoadingPage : Style.LoadingPageHide}>
				<LoadingBounce />
			</div>
			{/* {loaded && <ScrollArrowSide />} */}
			<main className={loaded ? Style.Main : Style.MainLoading}>
				{/* style={openDataVis ? { overflowY: 'hidden' } : { overflowY: 'auto' }}> */}
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
					<div className={Style.Title}>
						<div className={Style.TitleLeft}>
							<svg height='18' width='300'>
								<polyline
									className={Style.IntroIconAppear}
									points='10,10 30,30 50,10 70,30 90,10 110,30 130,10 150,30 170,10 190,30 210,10'
								/>
							</svg>
							<h2>Data Visualizations</h2>
							<h3>Built with D3.js</h3>
						</div>
						<div className={Style.TitleRight}>
							<SiD3Dotjs />
							<p>D3.js</p>
						</div>
					</div>
					<section className={Style.DataVis}>
						<div className={Style.DataVisProj} onClick={() => setOpenDataVis(1)}>
							<img className={Style.DataVisImg} src={dataVisBarChartRace} alt='nba bar chart race' />
							<div>
								<h3>Bar Chart Race</h3>
								<h4>Click to expand</h4>
							</div>
						</div>
						<div className={Style.DataVisProj} onClick={() => setOpenDataVis(2)}>
							<img className={Style.DataVisImg} src={dataVisTree} alt='dinosaur phylogenetic tree' />
							<div>
								<h3>Phylogenetic Tree</h3>
								<h4>Click to expand</h4>
							</div>
						</div>
						<div className={Style.DataVisProj} onClick={() => setOpenDataVis(3)}>
							<img className={Style.DataVisImg} src={dataVisSunburst} alt='zoomable sunburst' />
							<div>
								<h3>Zoomable Sunburst</h3>
								<h4>Click to expand</h4>
							</div>
						</div>
					</section>
					<div ref={webDevTitle} className={Style.Title}>
						<div className={Style.TitleLeft}>
							<svg height='18' width='300'>
								<polyline
									className={!webDevTitleIntersected ? Style.IntroIcon : Style.IntroIconAppear2}
									points='10,10 30,30 50,10 70,30 90,10 110,30 130,10 150,30 170,10 190,30 210,10'
								/>
							</svg>
							<h2>Web Sites & Web Apps</h2>
							<h3>Built with React.js</h3>
						</div>
					</div>
					<section className={Style.WebDev}>
						<div className={Style.WebDevProject1}>
							<a
								className={Style.Anchor}
								href='https://portlandbnb.org/'
								target='_blank'
								rel='noopener noreferrer'>
								<div className={Style.Description}>
									<h4>Web Page</h4>
									<h3>B&B Direct Booking Site</h3>
								</div>
								<img className={Style.Image} src={bookingImg} alt='direct booking site' />
							</a>
							<div className={Style.Info}>
								<div className={Style.Icon}>
									<SiFirebase />
									<p>Firebase</p>
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
						<div className={Style.WebDevProject4}>
							<a
								className={Style.Anchor}
								href='https://extraordinary-raindrop-d2a470.netlify.app/'
								target='_blank'
								rel='noopener noreferrer'>
								<div className={Style.Description}>
									<h4>Web Page</h4>
									<h3>JD Health & Wellness</h3>
								</div>
								<img className={Style.Image} src={jdImg} alt='medical practice site' />
							</a>
							<div className={Style.Info}>
								<div className={Style.Icon}>
									<FaAws />
									<p>AWS</p>
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
						<div className={Style.WebDevProject2}>
							<a
								className={Style.Anchor}
								href='https://weekly-goals-app.web.app/'
								target='_blank'
								rel='noopener noreferrer'>
								<div className={Style.Description}>
									<h4>Web App</h4>
									<h3>Weekly Goal Scheduler</h3>
								</div>
								<img className={Style.Image} src={goalsAppImg} alt='weekly goals app' />
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
						<div className={Style.WebDevProject3}>
							<a
								className={Style.Anchor}
								href='https://trivia-game-ffc01.web.app/'
								target='_blank'
								rel='noopener noreferrer'>
								<div className={Style.Description}>
									<h4>Web App</h4>
									<h3>Trivia Game</h3>
								</div>
								<img className={Style.Image} src={triviaImg} alt='trivia game' />
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
					</section>
				</section>
				<section className={seeLinks ? Style.Links : Style.LinksHide}>
					<LinksLine color='#3333335a' opacity='1' />
				</section>
				<div className={Style.BottomBackground}></div>
			</main>
			{openDataVis ? <D3Container close={() => setOpenDataVis(false)} project={openDataVis} /> : <></>}
		</div>
	);
}
