import { React } from 'react';

import Style from './buttonAlt.module.scss';

export default function ButtonAlt(props) {
	return (
		<div className={Style.Container}>
			<div className={Style.Inner}>{props.text}</div>
		</div>
	);
}
