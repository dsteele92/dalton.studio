import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RightNav } from 'components';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLinkedinLine } from 'react-icons/ri';

import Style from './navbar.module.scss';

export default function Navbar() {
	const [top, setTop] = useState(true);

	const [menuHover, setMenuHover] = useState(false);
	const [menuClick, setMenuClick] = useState(false);
	const [mobileMenuClick, setMobileMenuClick] = useState(false);

	let location = useLocation();

	useEffect(() => {
		const handleScroll = (event) => {
			// console.log(window.pageYOffset);
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
		<div>
			<div className={Style.Container}>
				<div className={menuClick ? Style.TopMenuActive : Style.Top}></div>
				<div className={menuClick ? Style.BottomMenuActive : Style.Bottom}></div>
				<div className={menuClick ? Style.LeftMenuActive : Style.Left}></div>
				<div className={menuClick ? Style.RightMenuActive : Style.Right}></div>
			</div>
			<Link to='/'>
				<header className={menuClick ? Style.HeaderMenuActive : Style.Header}>DALTON STEELE</header>
			</Link>

			<header className={top ? Style.HeaderMobile : Style.HeaderMobileScroll}>DALTON STEELE</header>

			{location.pathname === '/' ? (
				<div className={menuClick ? Style.RightNavMenuActive : Style.RightNav}>
					<RightNav />
				</div>
			) : (
				''
			)}
			<nav className={Style.MenuBar}>
				<div
					className={menuClick ? Style.IconMenuActive : Style.Icon}
					onMouseEnter={() => setMenuHover(true)}
					onMouseLeave={() => setMenuHover(false)}
					onClick={() => setMenuClick(!menuClick)}>
					<div className={Style.Bars}>
						<svg
							height='10px'
							width='50px'
							className={menuClick ? Style.Bar1X : menuHover ? Style.Bar1Hover : Style.Bar}>
							<line x1='28' y1='0' x2='50px' y2='0' className={Style.Line} />
						</svg>
						<svg
							height='10px'
							width='50px'
							className={menuClick ? Style.Bar2X : menuHover ? Style.Bar2Hover : Style.Bar}>
							<line x1='17' y1='0' x2='50px' y2='0' className={Style.Line} />
						</svg>
						<svg
							height='10px'
							width='50px'
							className={menuClick ? Style.Bar3X : menuHover ? Style.Bar3Hover : Style.Bar}>
							<line x1='28' y1='0' x2='50px' y2='0' className={Style.Line} />
						</svg>
					</div>
					<div className={menuClick ? Style.LettersMenuActive : Style.Letters}>
						<p className={menuHover ? Style.U : ''}>U</p>
						<p className={menuHover ? Style.N : ''}>N</p>
						<p className={menuHover ? Style.E : ''}>E</p>
						<p className={menuHover ? Style.M : ''}>M</p>
					</div>
				</div>
			</nav>
			<menu className={menuClick ? Style.MenuActive : Style.Menu}>
				<ul>
					<li className={menuClick ? Style.ListFall : Style.List} onClick={() => setMenuClick(!menuClick)}>
						<Link to='/' className={location.pathname === '/' ? Style.Current : ''}>
							<h3>HOME</h3>
							<div
								className={
									location.pathname === '/' ? Style.HighlightHomeCurrent : Style.HighlightHome
								}></div>
						</Link>
					</li>
					<li className={menuClick ? Style.ListFall : Style.List} onClick={() => setMenuClick(!menuClick)}>
						<Link to='/about' className={location.pathname === '/about' ? Style.Current : ''}>
							<h3>ABOUT ME</h3>
							<div
								className={
									location.pathname === '/about' ? Style.HighlightAboutCurrent : Style.HighlightAbout
								}></div>
						</Link>
					</li>
					<li className={menuClick ? Style.ListFall : Style.List} onClick={() => setMenuClick(!menuClick)}>
						<Link to='/portfolio' className={location.pathname === '/portfolio' ? Style.Current : ''}>
							<h3>WEB DEVELOPMENT</h3>
							<div
								className={
									location.pathname === '/portfolio'
										? Style.HighlightCodingCurrent
										: Style.HighlightCoding
								}></div>
						</Link>
					</li>
					<li className={menuClick ? Style.ListFall : Style.List} onClick={() => setMenuClick(!menuClick)}>
						<Link to='/fitness' className={location.pathname === '/fitness' ? Style.Current : ''}>
							<h3>PERSONAL TRAINING</h3>
							<div
								className={
									location.pathname === '/fitness'
										? Style.HighlightFitnessCurrent
										: Style.HighlightFitness
								}></div>
						</Link>
					</li>
					<li className={menuClick ? Style.ListFall : Style.List} onClick={() => setMenuClick(!menuClick)}>
						<Link to='/contact' className={location.pathname === '/contact' ? Style.Current : ''}>
							<h3>CONTACT</h3>
							<div
								className={
									location.pathname === '/contact'
										? Style.HighlightContactCurrent
										: Style.HighlightContact
								}></div>
						</Link>
					</li>
				</ul>
				<div className={Style.Contact}>
					<a href='mailto:ds@dalton.studio'>
						<AiOutlineMail />
					</a>
					<a href='https://www.linkedin.com/in/daltondsteele/' target='_blank' rel='noopener noreferrer'>
						<RiLinkedinLine />
					</a>
				</div>
			</menu>
			<div
				className={
					menuClick
						? `${Style.MenuBackgroundActive} ${Style[`${location.pathname.slice(1)}`]}`
						: mobileMenuClick
						? `${Style.MenuBackgroundMobileActive} ${Style[`${location.pathname.slice(1)}`]}`
						: Style.MenuBackground
				}></div>

			<nav className={Style.MobileNav} onClick={() => setMobileMenuClick(!mobileMenuClick)}>
				<div className={Style.IconMobile}>
					<div className={Style.Bars}>
						<svg height='8px' width='40px' className={mobileMenuClick ? Style.Bar1X : Style.Bar}>
							<line x1='15' y1='0' x2='30px' y2='0' className={Style.Line} />
						</svg>
						<svg height='8px' width='40px' className={mobileMenuClick ? Style.Bar2X : Style.Bar}>
							<line x1='7' y1='0' x2='33px' y2='0' className={Style.Line} />
						</svg>
						<svg height='8px' width='40px' className={mobileMenuClick ? Style.Bar3X : Style.Bar}>
							<line x1='10' y1='0' x2='25px' y2='0' className={Style.Line} />
						</svg>
					</div>
				</div>
			</nav>
			<div className={Style.MobileContainer}>
				<div className={mobileMenuClick ? Style.TopMobileActive : Style.TopMobile}></div>
				<div className={mobileMenuClick ? Style.BottomMobileActive : Style.BottomMobile}></div>
				<div className={mobileMenuClick ? Style.LeftMobileActive : Style.LeftMobile}></div>
				<div className={mobileMenuClick ? Style.RightMobileActive : Style.RightMobile}></div>
			</div>
			<menu className={mobileMenuClick ? Style.MobileMenuActive : Style.MobileMenu}>
				<ul>
					<li
						className={mobileMenuClick ? Style.ListFall : Style.List}
						onClick={() => setMobileMenuClick(!mobileMenuClick)}>
						<Link to='/' className={location.pathname === '/' ? Style.Current : ''}>
							<h3>HOME</h3>
							<div className={location.pathname === '/' ? Style.HighlightCurrentHome : ''}></div>
						</Link>
					</li>
					<li
						className={mobileMenuClick ? Style.ListFall : Style.List}
						onClick={() => setMobileMenuClick(!mobileMenuClick)}>
						<Link to='/about' className={location.pathname === '/about' ? Style.Current : ''}>
							<h3>ABOUT ME</h3>
							<div className={location.pathname === '/about' ? Style.HighlightCurrentAbout : ''}></div>
						</Link>
					</li>
					<li
						className={mobileMenuClick ? Style.ListFall : Style.List}
						onClick={() => setMobileMenuClick(!mobileMenuClick)}>
						<Link to='/portfolio' className={location.pathname === '/portfolio' ? Style.Current : ''}>
							<h3>WEB DEVELOPMENT</h3>
							<div
								className={
									location.pathname === '/portfolio' ? Style.HighlightCurrentCoding : ''
								}></div>
						</Link>
					</li>
					<li
						className={mobileMenuClick ? Style.ListFall : Style.List}
						onClick={() => setMobileMenuClick(!mobileMenuClick)}>
						<Link to='/fitness' className={location.pathname === '/fitness' ? Style.Current : ''}>
							<h3>PERSONAL TRAINING</h3>
							<div
								className={location.pathname === '/fitness' ? Style.HighlightCurrentFitness : ''}></div>
						</Link>
					</li>
					<li
						className={mobileMenuClick ? Style.ListFall : Style.List}
						onClick={() => setMobileMenuClick(!mobileMenuClick)}>
						<Link to='/contact' className={location.pathname === '/contact' ? Style.Current : ''}>
							<h3>CONTACT</h3>
							<div
								className={location.pathname === '/contact' ? Style.HighlightCurrentContact : ''}></div>
						</Link>
					</li>
				</ul>
				<div className={mobileMenuClick ? Style.ContactMobileFall : Style.ContactMobile}>
					<a href='https://www.linkedin.com/in/daltondsteele/' target='_blank' rel='noopener noreferrer'>
						<RiLinkedinLine />
					</a>
					<a href='mailto:ds@dalton.studio'>
						<AiOutlineMail />
					</a>
				</div>
			</menu>
		</div>
	);
}
