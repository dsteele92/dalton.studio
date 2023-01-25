import { React } from 'react';
import Style from './loadingBounce.module.scss';

export default function LoadingBounce() {
	return (
		<div className={Style.Spinner}>
			<div className={Style.DoubleBounce1}></div>
			<div className={Style.DoubleBounce2}></div>
		</div>
	);
}
