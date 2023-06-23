import { React } from 'react';

import Style from './button.module.scss';

export default function Button(props) {
	return (
		<div className={Style.Container}>
			<div className={Style.Inner}>{props.text}</div>
		</div>
	);
}
