import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Style from './personalTraining.module.scss';
import { LinksLine, ScrollArrowTopOnly, ScrollArrowBottom, LoadingBounce, JumpButton } from 'components';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

import RunningPic from '../../../images/run_compressed.jpeg';
import Andrew from '../../../images/andrew.png';
import Cayley from '../../../images/cayley.png';
import AndrewH from '../../../images/andrew+h.png';
import Chet from '../../../images/chet.png';
import Joanna from '../../../images/joanna.png';
import Vijay from '../../../images/Vijay.png';
import Ayaka from '../../../images/ayaka.png';
import Sara from '../../../images/sara.png';

export default function PersonalTraining() {
	const [top, setTop] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [client, setClient] = useState('');
	const [seeLinks, setSeeLinks] = useState(false);

	const pic1 = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);

		const disableScroll = (event) => {
			window.scrollTo(0, 0);
		};
		const handleScroll = (event) => {
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

		const handleLoad = (event) => {
			setTimeout(() => {
				window.removeEventListener('scroll', disableScroll);
				window.addEventListener('scroll', handleScroll);
				setLoaded(true);
			}, '500');
		};

		let picture1 = pic1.current;
		picture1.addEventListener('load', handleLoad);
		window.addEventListener('scroll', disableScroll);

		return () => {
			picture1.removeEventListener('load', handleLoad);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={!loaded ? Style.FitnessPageLoading : Style.FitnessPage}>
			<div className={Style.Top}></div>
			<div className={!loaded ? Style.Bottom : top ? Style.BottomTop : Style.BottomScroll}></div>
			<div className={!loaded ? Style.LoadingPage : Style.LoadingPageHide}>
				<LoadingBounce />
			</div>
			<main className={loaded ? Style.Main : Style.MainLoading}>
				<section className={Style.Fitness}>
					<div className={top ? Style.Title : Style.TitleScroll}>
						<svg height='20' width='120'>
							<polyline
								className={Style.WDIcon}
								points='10,10 30,30 50,10 70,30 90,10 110,30 130,10 150,30 170,10 190,30 210,10'
							/>
						</svg>
						<div className={Style.Header}>HEALTH & FITNESS.</div>
					</div>
					<div className={top ? Style.Intro : Style.IntroScroll}>
						<h2>
							My focus is to give people the tools and knowledge needed to live their healthiest lives.
						</h2>
						<p>
							Areas of expertise include weight loss, balance & stability, strength & endurance, mobility,
							injury rehab/prevention, and athletic performance.
						</p>
					</div>
				</section>

				<div className={top ? Style.Running : Style.RunningScroll}>
					<img src={RunningPic} alt='running' ref={pic1} />
				</div>

				<section className={top ? Style.TestimonialsHide : Style.Testimonials}>
					<div className={Style.Clients}>
						<article>
							<ImQuotesLeft className={Style.Left} />
							<ImQuotesRight className={Style.Right} />
							<h1
								className={
									client === '' ? Style.TestimonialsHeaderHover : Style.TestimonialsHeaderHoverHide
								}>
								Hover to see what people are saying...
							</h1>
							<h1
								className={
									client === '' ? Style.TestimonialsHeaderTap : Style.TestimonialsHeaderTapHide
								}>
								Tap to see what people are saying...
							</h1>
							<p className={client === 'Andrew' ? Style.TextCurrent : Style.Text}>
								Last January I committed to making personal fitness a lifestyle. Since all-around
								physical wellness was a priority, I wanted to practice routines that incorporated more
								than just weight training and cardio. I wanted to adapt yoga, bodyweight training and
								meditation as well. My goal was to improve everything from strength, power, flexibility,
								balance, core stability, and endurance, all the way to breathing and mindfulness. Since
								previous injuries and motivation are key issues with me, I decided I needed to work with
								a personal trainer. Someone who would keep me accountable, motivated, as well as teach
								me how to achieve my goals safely and correctly.
								<br />
								Fast forward… It’s been a year and I can honestly say I’m in the best shape of my entire
								life. Dalton and I continue to train 3 times a week and rarely skip or miss a session.
								What’s the secret you ask? Results. Plain and simple (and he’s a hell of a lot of fun).
								This talented young man knows exactly how to keep me moving. We rarely do the same
								routine twice. He develops customized programs that incorporate a little bit of
								everything. This guy is constantly introducing new equipment and exercises. One thing I
								can say for sure… Dalton Steele keeps it fresh.
								<br />
								His genuine interest, expertise and commitment to my well-being are ever present. So,
								although I never know what we’re going to do next, I trust it’s going to push me to that
								next level. I trust it’s going to deliver that stronger, happier and healthier man I
								committed to becoming a year ago.
								<br />
								With Dalton’s help, I’m living my dream. It’s a beautiful thing.
							</p>
							<p className={client === 'Sara' ? Style.TextCurrent : Style.Text}>
								For my whole life I struggled with fitness accountability – wasted gym memberships,
								unwatched yoga videos, the works. I decided to reach out to Dalton when my husband and I
								started thinking about having kids and I decided my health was too important to neglect.
								Dalton listened to my goals focused on wellness and creating sustainable habits; he
								taught me the fundamentals of healthy workout techniques and began reshaping my
								relationship with the gym in general.
								<br />
								Pretty quickly we were modifying our workout routines to accommodate a rapidly changing
								body due to pregnancy. I can soundly say that I was stronger and more fit during
								pregnancy than I had ever been in my life. I also benefitted greatly from the daily
								meditation group which helped keep me grounded during a time of constant change and
								anticipation!
								<br />
								Dalton is patient and kind, validating and encouraging. He cares about his clients’
								growth regarding working out and helps me celebrate my small wins (like not getting
								winded walking up the hill to my house) and the major ones (like doing my first pull
								up!). More importantly, Dalton also has helped me celebrate my life wins - like the
								birth of my son! Working with Dalton has been one of the best things I have done for my
								physical and mental health. I recommend him with the highest endorsement.
							</p>
							<p className={client === 'Ayaka' ? Style.TextCurrent : Style.Text}>
								“I’ve known Dalton for over a year, and we have work out sessions twice or three times a
								week. I am Japanese and had the opportunity to work in the US 3 years ago, but just 6
								months later the COVID pandemic began. This made my life in the US difficult, and I felt
								very alone. In the COVID situation, I was much more cautious about making friends and
								going out. So, when I was first invited to a workout class with Dalton, I was quite
								nervous because I was worried about whether I would be able to work out with him, both
								verbally and physically. But after the first few times, those worries disappeared.
								Dalton cheered me up a lot and told everything very politely and patiently until I could
								understand. Also, Dalton has tried to learn Japanese and he cheers and counts reps in
								Japanese. Sometimes the numbers go back and forth, and Dalton gives me additional reps,
								though! Lol.
								<br />
								Anyway, thanks to Dalton, now I can get tight and gorgeous belly, beautiful butt and
								back, strong arms enough to carry most of things in life, and too strong legs for lady.
								I love them!! In addition, working out with him gives me the strength to live in a
								foreign country by myself, and the confidence that it is never too late to be strong and
								beautiful!! I would say I couldn’t enjoy the life in the US that much without him. I
								will continue to work hard to achieve higher goal with Dalton!!”
							</p>
							<p className={client === 'Chet' ? Style.TextCurrent : Style.Text}>
								I met Dalton a few months ago and he’s honestly changed my life. We workout together
								three days per week virtually, and then he puts together a workout for me to do solo one
								day per week. In addition, he hosts a mobility workshop once per week for all his
								clients, meditation sessions Monday through Friday, and stretch routines and nutritional
								guidance throughout each week.
								<br />
								In a little over three months, I’ve gained:
								<br />
								- Results. For the first time ever. I’ve put on about 10 pounds in muscle, and have more
								clearly defined shoulders, pecks and abs. I’ve still got a long way to go to escape the
								skinny fat body I lived in for my whole life, but for the first time am seeing a path.
								<br />
								- A friend. Dalton brings such care to his job. He asks about my kids, about my mental
								health, about my job, etc. in a few short months, he’s become a real friend and someone
								I look forward to hanging out with in workout days.
								<br />
								- Discipline: I’d never maintained a workout before, for any real period of time, and
								now I’m over three months in to consistently working out 3-4 days per week. This comes
								from both having appointments on the calendar, and from Dalton holding me accountable to
								get it done.
								<br />
								Personal training is an investment, but in my opinion you’d be hard pressed to find a
								more productive way to spend your money. And if you’re going to take the plunge, you
								should give Dalton a chance. He’s an exceptionally good trainer that will help you
								improve your physical health, and a genuinely good human that will do everything he can
								for you to meet your goals.
							</p>
							<p className={client === 'Vijay' ? Style.TextCurrent : Style.Text}>
								I had a skiing accident in January 2020 where I broke my femur. Due to my accident, I
								lost strength, stamina, and mobility and I spent much of 2020 recovering. Since I
								started my training with Dalton in the Winter of 2020, I recovered so much faster.
								Dalton’s knowledge of the body and holistic approach to training has gotten me to the
								best shape of my life, even before my injury. Dalton offers a complete program that
								focuses on exercise, nutrition, mindfulness and mobility.
								<br />
								Exercise: The exercises Dalton prepares are structured and well planned. Each week
								Dalton and I spend one day focusing on a different part of the body. One day each for
								metabolic training (jumping squats, stability push ups, etc), upper body (dips, pull
								ups, rows) and lower body (deadlifts, squats, lunges). Dalton also makes sure each
								subsequent workout pushes you so that you are on track to hit your goals. I started
								seeing strengths gains within two weeks of starting with him.
								<br />
								Nutrition: Nutrition is also another important component to Dalton’s program; he assists
								with meal tracking and with his deep knowledge of nutrition he is able to provide ideas
								for meals as well as goals to hit to keep a balanced diet.
								<br />
								Mindfulness: Every weekday Dalton starts each day holding at least 15 minutes to
								meditate. The meditation sessions have been a great way for me to enhance my self
								awareness and reduce daily stress.
								<br />
								Mobility: Aside from getting stronger, Dalton holds a class once a week on mobility. The
								class goes through a bunch of stretches that help with range of movement and agility.
								<br />I really appreciate the work Dalton has done to get me to where I am both
								physically and mentally. I would highly recommend Dalton to anyone looking for a
								trainer.
							</p>
							<p className={client === 'Cayley' ? Style.TextCurrent : Style.Text}>
								I started working with Dalton because I was out of shape and didn’t know how to lift
								weights. I’ve now been training with him for 6 months and my strength, balance, and
								self-confidence have improved tremendously! Dalton is incredibly knowledgeable, and I
								always look forward to going to the gym with him. Oh, and I finally have a butt!
							</p>
							<p className={client === 'Joanna' ? Style.TextCurrent : Style.Text}>
								You don't know what you're missing until you try it. I am not one to expect quick and
								dirty results. I want consistent motivation and that’s what Dalton has done for me this
								past year and a half. I started working out because I was always in pain in my right
								shoulder and upper back from sitting and hunching over. My posture was terrible. At one
								point, I could barely turn my neck to look back while changing lanes. I had trouble
								sleeping because of constant neck pain. Ever since starting my training with Dalton, I
								have not had any pain other than muscle soreness, the good kind. But the real kicker is
								that I got pregnant with my son a few months in. I kept training until the week I
								delivered. Throughout the entire 9 months, I had no back pain at all, no foot swelling,
								and I gained the recommended 35 pounds total. At 8 weeks post partum and I had lost 30
								of those pounds. People tell me that they can't even tell I was ever pregnant. I tell
								everyone who is considering getting pregnant that working out is the best thing I have
								done for myself. I tell everyone in general that training is the best investment I have
								made for my health and my sanity.
							</p>
							<p className={client === 'AndrewH' ? Style.TextCurrent : Style.Text}>
								I have been working with Steele Fitness for over 3 months now. Dalton has helped me
								achieve my fitness goals through a varied set of strength, metabolic, and mobility
								exercises. Dalton gives strong attention to form to prevent injury during exercise and
								assists in mobility training to increase overall flexibility. He's been able to keep
								workouts interesting and effective both in-person and virtually as COVID has entered
								different phases. My arms, back, chest, and legs have never been stronger, while I have
								lost weight and increased range of motion. Additionally, Dalton has helped me track my
								nutritional and water intake and offers meditation classes every morning. Dalton is a
								true wellness pro and I would highly recommend him to anyone interested in taking their
								physical fitness and overall well-being to the next level.
							</p>
						</article>

						<div className={Style.ClientAvatars}>
							<div className={Style.ClientAndrew}>
								<img
									src={Andrew}
									alt='Andrew'
									className={Style.Andrew}
									onMouseEnter={() => setClient('Andrew')}
								/>
							</div>
							<div className={Style.ClientSara}>
								<img
									src={Sara}
									alt='Sara'
									className={Style.Sara}
									onMouseEnter={() => setClient('Sara')}
								/>
							</div>
							<div className={Style.ClientAyaka}>
								<img
									src={Ayaka}
									alt='Ayaka'
									className={Style.Ayaka}
									onMouseEnter={() => setClient('Ayaka')}
								/>
							</div>
							<div className={Style.ClientChet}>
								<img
									src={Chet}
									alt='Chet'
									className={Style.Chet}
									onMouseEnter={() => setClient('Chet')}
								/>
							</div>
							<div className={Style.ClientVijay}>
								<img
									src={Vijay}
									alt='Vijay'
									className={Style.Vijay}
									onMouseEnter={() => setClient('Vijay')}
								/>
							</div>
							<div className={Style.ClientCayley}>
								<img
									src={Cayley}
									alt='Cayley'
									className={Style.Cayley}
									onMouseEnter={() => setClient('Cayley')}
								/>
							</div>
							<div className={Style.ClientJoanna}>
								<img
									src={Joanna}
									alt='Joanna'
									className={Style.Joanna}
									onMouseEnter={() => setClient('Joanna')}
								/>
							</div>
							<div className={Style.ClientAndrewH}>
								<img
									src={AndrewH}
									alt='AndrewH'
									className={Style.AndrewH}
									onMouseEnter={() => setClient('AndrewH')}
								/>
							</div>
						</div>
					</div>
				</section>
				<section className={top ? Style.ConsultationHide : Style.Consultation}>
					<div className={Style.ConsultationText}>
						I occasionally accept new clients. If you are interested in training or would like to talk,
						please leave your contact information and I will reach out to you.
					</div>
					<Link to='/contact'>
						<JumpButton />
					</Link>
				</section>
				<section className={seeLinks ? Style.Links : Style.LinksHide}>
					<LinksLine color='white' opacity='1' />
				</section>
				{/* <section className={Style.Links}>
					<LinksGrid color='#707070' />
				</section> */}
			</main>
			{loaded ? (
				<div className={Style.ScrollArrow}>
					<ScrollArrowTopOnly color='black' />
				</div>
			) : (
				''
			)}
			{loaded ? (
				<div className={Style.ScrollArrow}>
					<ScrollArrowBottom />
				</div>
			) : (
				''
			)}
		</div>
	);
}
