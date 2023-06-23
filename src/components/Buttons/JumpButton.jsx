import { React } from 'react';

import Style from './jumpButton.module.scss';

export default function Button() {
	let text = 'GET IN TOUCH';
	let textArray = text.split('');
	return (
		<button>
			<div className={Style.Text}>
				{textArray.map((letter, index) => (
					<span key={index} className={Style[`letter${index}`]}>
						{letter}
					</span>
				))}
			</div>
		</button>
	);
}
