import { React } from 'react';
import Style from './d3Container.module.scss';
import { DinoTree, BarChartRace, Sunburst } from 'components';
import { DiGithubBadge } from 'react-icons/di';
import { IoReturnUpBack } from 'react-icons/io5';

export default function D3Container(props) {
	return (
		<div className={Style.D3Container}>
			<div className={Style.Back} onClick={props.close}>
				<IoReturnUpBack />
				<h4>back</h4>
			</div>
			{props.project === 1 ? (
				<h2>Bar Chart Race</h2>
			) : props.project === 2 ? (
				<h2>Phylogenetic Tree</h2>
			) : (
				<h2>Zoomable Sunburst</h2>
			)}
			<div className={Style.Info}>
				{props.project === 1 ? (
					<h4>
						Hover over graph for team details <i>||</i> Hover over trophies to see year, MVP, & runner-up{' '}
						<i>||</i> Click play to see the race
					</h4>
				) : props.project === 2 ? (
					<h4>
						Proposed new family tree of early dinosaurs by Baron et al. <i>||</i> Hover over tree or
						timeline to view relationships
					</h4>
				) : (
					<h4>
						Continents & countries sorted by population or area <i>||</i> Click to zoom in <i>||</i> Click
						inner circle to zoom back out
					</h4>
				)}
			</div>
			<div className={Style.SvgContainer}>
				{props.project === 1 ? <BarChartRace /> : props.project === 2 ? <DinoTree /> : <Sunburst />}
			</div>
			<div className={Style.References}>
				<h3>References</h3>
				{props.project === 1 ? (
					<p>
						Basketball Reference. Retrieved June 23, 2023, from
						https://www.basketball-reference.com/playoffs/
					</p>
				) : props.project === 2 ? (
					<p>
						Baron, M., Norman, D. & Barrett, P. A new hypothesis of dinosaur relationships and early
						dinosaur evolution. <i>Nature</i> <b>543</b>,{' '}
						{`501–506 (2017).
						https://doi.org/10.1038/nature21700`}
					</p>
				) : (
					<p>Geonames. Retrieved June 29, 2023, from https://www.geonames.org/</p>
				)}
			</div>
			<div className={Style.GitHub}>
				<a
					href={
						props.project === 1
							? 'https://github.com/dsteele92/dalton.studio/blob/main/src/components/d3/BarChartRace.jsx'
							: props.project === 2
							? 'https://github.com/dsteele92/dalton.studio/blob/main/src/components/d3/DinoTree.jsx'
							: 'https://github.com/dsteele92/dalton.studio/blob/main/src/components/d3/Sunburst.jsx'
					}
					target='_blank'
					rel='noopener noreferrer'>
					<h3>View code on GitHub </h3>
					<span>
						<DiGithubBadge />
					</span>
				</a>
			</div>
		</div>
	);
}
