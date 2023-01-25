import { React } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Style from './linksLine.module.scss';
import { RiHome4Fill } from 'react-icons/ri';
import { BsCodeSlash } from 'react-icons/bs';
import { IoMdFitness } from 'react-icons/io';
import { MdOutlineAlternateEmail, MdOutlineWavingHand } from 'react-icons/md';
import { ImCool } from 'react-icons/im';

export default function LinksGrid(props) {
	let location = useLocation();

	let color = props.color ? props.color : '#dddddd';
	let opacity = props.opacity ? props.opacity : 0.7;

	return (
		<div className={Style.LinksGrid}>
			<div className={location.pathname === '/about' ? Style.Hide : Style.About}>
				<Link to='/about'>
					<ImCool className={Style.Icon} style={{ color: color, opacity: opacity }} />
					<h2>ABOUT</h2>
				</Link>
			</div>
			<div className={location.pathname === '/portfolio' ? Style.Hide : Style.Coding}>
				<Link to='/portfolio'>
					<BsCodeSlash className={Style.Icon} style={{ color: color, opacity: opacity }} />
					<h2>CODING</h2>
				</Link>
			</div>
			<div className={location.pathname === '/fitness' ? Style.Hide : Style.Fitness}>
				<Link to='/fitness'>
					<IoMdFitness className={Style.Icon} style={{ color: color, opacity: opacity }} />
					<h2>FITNESS</h2>
				</Link>
			</div>
			<div className={location.pathname === '/contact' ? Style.Hide : Style.Contact}>
				<Link to='/contact'>
					<MdOutlineAlternateEmail className={Style.Icon} style={{ color: color, opacity: opacity }} />
					<h2>CONTACT</h2>
				</Link>
			</div>
			<div className={location.pathname === '/' ? Style.Hide : Style.Home}>
				<Link to='/'>
					<RiHome4Fill className={Style.Icon} style={{ color: color, opacity: opacity }} />
					<h2>HOME</h2>
				</Link>
			</div>
		</div>
	);
}
