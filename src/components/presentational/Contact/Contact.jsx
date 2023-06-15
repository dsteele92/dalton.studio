import { React, useState, useEffect } from 'react';
import Style from './contact.module.scss';
import { LoadingBounce, Form } from 'components';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLinkedinLine } from 'react-icons/ri';

export default function Contact() {
	const [top, setTop] = useState(true);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);

		setTimeout(() => {
			setLoaded(true);
		}, '1000');

		const handleScroll = (event) => {
			// -----> state for transitioning out of top
			if (window.pageYOffset >= 1) {
				setTop(false);
			} else if (window.pageYOffset < 1) {
				setTop(true);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={!loaded ? Style.ContactLoading : Style.Contact}>
			<div className={!loaded ? Style.OpenScreen : Style.OpenScreenLoaded}></div>
			<div className={!loaded ? Style.LoadingPage : Style.LoadingPageHide}>
				<LoadingBounce />
			</div>
			<main className={loaded ? Style.Main : Style.MainLoading}>
				<section className={Style.Work}>
					<div className={Style.Title}>
						<svg height='20' width='120'>
							<polyline
								className={Style.Icon}
								points='10,10 30,30 50,10 70,30 90,10 110,30 130,10 150,30 170,10 190,30 210,10'
							/>
						</svg>
						<div className={Style.Header}>CONTACT</div>
					</div>
				</section>
				<section className={Style.ContactForm}>
					<div className={Style.FormDiv}>
						<Form />
					</div>
				</section>
				<section className={Style.ContactInfo}>
					<div className={Style.InfoDiv}>
						<p>Dalton Steele</p>
						<p>Los Angeles, CA</p>
						<div className={Style.ContactIcons}>
							<a href='mailto:ds@dalton.studio'>
								<AiOutlineMail />
							</a>
							<a
								href='https://www.linkedin.com/in/daltondsteele/'
								target='_blank'
								rel='noopener noreferrer'>
								<RiLinkedinLine />
							</a>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
