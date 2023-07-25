import React, { useState, useEffect, useRef } from 'react';
import { select, selectAll, pointer } from 'd3-selection';
import { csvParse, autoType } from 'd3-dsv';
import { group } from 'd3-array';
import { easeLinear } from 'd3-ease';
import { transition } from 'd3-transition';

import csvData from '../../assets/data/nbaData.js';

function BarChartRace() {
	const [runSpeed, setRunSpeed] = useState(500);
	const stop = useRef(true);
	const [play, setPlay] = useState(false);
	const [initialRender, setInitalRender] = useState(true);

	const svgRef = useRef(null);
	const yearRef = useRef(null);
	const ballRef = useRef(null);

	const championships = csvParse(csvData, autoType)
		.filter((d) => d.Lg !== 'ABA')
		.reverse();
	// console.log(championships);

	const teamLogos = {
		'Boston Celtics': {
			img: 'celtics',
			color: '#007A33',
		},
		'Los Angeles Lakers': {
			img: 'lakers',
			color: '#552583',
		},
		'Chicago Bulls': {
			img: 'bulls',
			color: '#CE1141',
		},
		'Golden State Warriors': {
			img: 'warriors',
			color: '#1D428A',
		},
		'San Antonio Spurs': {
			img: 'spurs',
			color: '#3D3D3D',
		},
		'Minneapolis Lakers': {
			img: 'lakers',
			color: '#552583',
		},
		'Miami Heat': {
			img: 'heat',
			color: '#98002E',
		},
		'Detroit Pistons': {
			img: 'pistons',
			color: '#C8102E',
		},
		'Milwaukee Bucks': {
			img: 'bucks',
			color: '#00471B',
		},
		'Houston Rockets': {
			img: 'rockets',
			color: '#CE1141',
		},
		'Philadelphia 76ers': {
			img: '76ers',
			color: '#006BB6',
		},
		'New York Knicks': {
			img: 'knicks',
			color: '#F58426',
		},
		'Philadelphia Warriors': {
			img: 'warriors',
			color: '#1D428A',
		},
		'Denver Nuggets': {
			img: 'nuggets',
			color: '#0E2240',
		},
		'Toronto Raptors': {
			img: 'raptors',
			color: '#CE1141',
		},
		'Cleveland Cavaliers': {
			img: 'cavaliers',
			color: '#860038',
		},
		'Dallas Mavericks': {
			img: 'mavericks',
			color: '#00538C',
		},
		'Oklahoma City Thunder': {
			img: 'thunder',
			color: '#007AC1',
		},
		'Washington Wizards': {
			img: 'wizards',
			color: '#192976',
		},
		'Portland Trail Blazers': {
			img: 'blazers',
			color: '#E03A3E',
		},
		'Atlanta Hawks': {
			img: 'hawks',
			color: '#E03A3E',
		},
		'Syracuse Nationals': {
			img: '76ers',
			color: '#006BB6',
		},
		'Sacramento Kings': {
			img: 'kings',
			color: '#5A2D81',
		},
		'Rochester Royals': {
			img: 'kings',
			color: '#5A2D81',
		},
		'Baltimore Bullets': {
			img: 'bullets',
			color: '#E31837',
		},
	};

	const barColor = '#918c80';

	const names = new Map();
	names.set('Minneapolis Lakers', 'Los Angeles Lakers');
	names.set('Philadelphia Warriors', 'Golden State Warriors');
	names.set('Syracuse Nationals', 'Philadelphia 76ers');
	names.set('Rochester Royals', 'Sacramento Kings');
	names.set('Seattle SuperSonics', 'Oklahoma City Thunder');
	names.set('Washington Bullets', 'Washington Wizards');
	names.set('St. Louis Hawks', 'Atlanta Hawks');
	const getName = (team) => {
		if (names.has(team)) {
			return names.get(team);
		} else {
			return team;
		}
	};

	let keyframes = [];
	for (let i = 0; i < championships.length; i++) {
		let current = [];
		let currentYear = championships[i].Year;
		const currentChampionships = championships.slice(0, i + 1);
		const championsGrouped = group(currentChampionships, (d) => getName(d.Champion));
		const championsSorted = Array.from(championsGrouped).sort((a, b) => {
			const lengthComp = b[1].length - a[1].length;
			if (lengthComp !== 0) return lengthComp;
			return b[1][b[1].length - 1].Year - a[1][a[1].length - 1].Year;
		});
		current.push(currentYear, championsSorted);
		keyframes.push(current);
	}
	// console.log('keyframes: ', keyframes);

	useEffect(() => {
		const svg = select(svgRef.current);
		svg.attr('viewBox', [0, 0, 600, 900]);
		async function BarChart() {
			const bars = svg.append('g').attr('opacity', 0.9).attr('id', 'bars');

			function updateBars(keyframe, transition, currentTeam) {
				let update = select('#bars').selectAll('rect');
				const data = keyframe[1];

				update
					.data(data)
					.join(
						(enter) =>
							enter
								.append('rect')
								.join('rect')
								.attr('x', 40)
								.attr('y', (d, i) => i * 40 + 1)
								.attr('width', (d) => `${(d[1].length / 17) * 87}%`)
								.attr('height', 38)
								.attr('class', 'champ-rect')
								.attr('id', (d, i) => `champ-rect-${i}`)
								.attr('rx', 2)
								.attr('ry', 2)
								.attr('opacity', 0.8),
						(update) => update
					)
					.call((update) =>
						update
							.transition(transition)
							.attr('y', (d, i) => i * 40 + 1)
							.attr('width', (d) => `${(d[1].length / 17) * 87}%`)
							.attr('fill', (d) => (d[0] === currentTeam ? teamLogos[d[0]].color : barColor))
					);
			}

			function updateLogos(keyframe, transition) {
				let update = select('#bars').selectAll('image');

				const data = keyframe[1];

				update
					.data(data, (d) => d[0])
					.join(
						(enter) =>
							enter
								.append('image')
								.join('image')
								.attr(
									'href',
									(d) =>
										`https://s3.us-west-1.amazonaws.com/dalton.d3/nba_bar_chart_race/${
											teamLogos[d[0]].img
										}.png`
								)
								.attr('x', 0)
								.attr('y', (d, i) => i * 40 + 5)
								.attr('width', 30)
								.attr('height', 30),
						(update) => update
					)
					.call((update) =>
						update
							.transition(transition)
							.attr('y', (d, i) => i * 40 + 5)
							.attr('width', 30)
							.attr('height', 30)
							.attr('opacity', 1)
					);
			}

			function updateText(keyframe, transition) {
				let update = select('#bars').selectAll('text');
				const data = keyframe[1];

				update
					.data(data)
					.join(
						(enter) =>
							enter
								.append('text')
								.join('text')
								.text((d) => d[1].length)
								.attr('x', (d) => `${(d[1].length / 17) * 87}%`)
								.attr('y', (d, i) => i * 40 + 25)
								.attr('dx', '50')
								.attr('class', 'champ-text')
								.attr('opacity', 0),
						(update) => update
					)
					.call((update) =>
						update
							.transition(transition)
							.text((d) => d[1].length)
							.attr('x', (d) => `${(d[1].length / 17) * 87}%`)
							.attr('y', (d, i) => i * 40 + 25)
							.attr('opacity', 1)
					);
			}

			function updateYear(keyframe) {
				// let past = select('#year');
				const past = yearRef.current;
				const year = keyframe[0];
				past.innerHTML = year;
			}

			// -----------------------------TOOLTIPS--------------------------------

			// for each rectangle add images in porportion to the amount of championships
			const addTrophies = (keyframe, transition) => {
				const data = keyframe[1];

				const tooltip = select('body')
					.append('div')
					.attr('class', 'tooltip')
					.style('position', 'absolute')
					.style('visibility', 'hidden');

				data.forEach((entry, key) => {
					svg.append('g')
						.attr('class', 'trophies')
						.attr('id', `trophies-${key}`)
						.attr('opacity', 0)
						.selectAll('image')
						.data(data[key][1])
						.join('image')
						.attr('href', `https://s3.us-west-1.amazonaws.com/dalton.d3/nba_bar_chart_race/lobtrophy.png`)
						.attr('x', (d, i) => i * 30 + 45)
						.attr('y', key * 40 + 8)
						// .attr('dy', '20')
						.attr('width', 25)
						.attr('height', 25)
						.style('cursor', 'pointer')
						.on('mouseover', function (event, data) {
							select(this).attr('opacity', 0.7); // Reduce opacity on mouseover
							tooltip
								.style('visibility', 'visible') // Show tooltip on mouseover
								.style('left', `${event.pageX}px`) // Position tooltip relative to mouse cursor
								.style('top', `${event.pageY + 15}px`)
								.append('h4')
								.text(data.Year)
								.append('h4')
								.text(data.Champion)
								.style('font-weight', 'bold')
								.append('h4')
								.text(`Finals MVP: ${data['Finals MVP'] ? data['Finals MVP'] : 'N/A'}`)
								.append('h4')
								.text(`Runner-up: ${data['Runner-Up']}`);
						})
						.on('mouseout', function () {
							select(this).attr('opacity', 1); // Restore opacity on mouseout
							tooltip.style('visibility', 'hidden'); // Hide tooltip on mouseout
							tooltip.selectAll('h4').remove();
						});
				});
			};

			const addTooltips = (keyframe) => {
				const container = select('#bar-chart-container');
				const svg = select('#nba-chart');
				const data = keyframe[1];

				const infoDisplay = svg
					.append('text')
					.attr('id', 'info-display')
					.attr('x', 400)
					.attr('y', 400)
					.text('')
					.attr('text-anchor', 'middle');

				const infoDisplay2 = svg
					.append('text')
					.attr('id', 'info-display-2')
					.attr('x', 400)
					.attr('y', 425)
					.text('')
					.attr('text-anchor', 'middle');

				const allBars = selectAll(`.champ-rect`);
				const allTrophies = selectAll(`.trophies`);

				// Attach event listeners
				container.on('mousemove', onMouseMove).on('mouseleave', onMouseOut);

				// Event handler for mouse movement
				function onMouseMove(event) {
					const yPosition = pointer(event)[1];
					const index = Math.floor(yPosition / 40);
					if (index > data.length - 1 || index < 0) {
						allBars.attr('fill', barColor);
						allTrophies.attr('opacity', 0);
						infoDisplay.text('');
						infoDisplay2.text('');
						return;
					}
					allBars.attr('fill', barColor);
					select(`#champ-rect-${index}`).attr('fill', teamLogos[data[index][0]].color);
					allTrophies.attr('opacity', 0);
					selectAll(`#trophies-${index}`).attr('opacity', 1);
					infoDisplay.text(getName(data[index][0])).attr('fill', teamLogos[data[index][0]].color);
					infoDisplay2.text(`Championships: ${data[index][1].length}`);
				}

				function onMouseOut() {
					allBars.attr('fill', barColor);
					allTrophies.attr('opacity', 0);
					infoDisplay.text('');
					infoDisplay2.text('');
				}
			};

			// -----------------------------CALL GENERATOR FUNCTION ON KEYWORDS ARRAY--------------------------------

			// yield svg.node();

			const transition = svg.transition().duration(runSpeed).ease(easeLinear);

			if (play) {
				for (let i = 0; i <= keyframes.length; i++) {
					await new Promise((resolve) => setTimeout(resolve, runSpeed));
					const transition = svg.transition().duration(runSpeed).ease(easeLinear);

					if (i === keyframes.length) {
						setPlay(false);
						// this will cause the useEffect to run again and trigger the else if statement, rendering the final chart
						return;
					}

					if (stop.current) {
						setPlay(false);
						return;
					}

					const current = championships[i];
					const currentTeam = getName(current.Champion);

					updateBars(keyframes[i], transition, currentTeam);
					updateLogos(keyframes[i], transition);
					updateYear(keyframes[i]);
					updateText(keyframes[i], transition);
				}
			} else if (initialRender || !play) {
				updateBars(keyframes[keyframes.length - 1], transition, 'none');
				updateLogos(keyframes[keyframes.length - 1], transition);
				updateText(keyframes[keyframes.length - 1]);
				addTrophies(keyframes[keyframes.length - 1], transition);
				addTooltips(keyframes[keyframes.length - 1]);
				updateYear(keyframes[keyframes.length - 1]);
				ballRef.current.innerHTML = 'PLAY';
				setInitalRender(false);
			}
		}

		BarChart();

		return () => {
			svg.selectAll('*').remove();
			//  remove class of tooltip
			selectAll('.tooltip').remove();
		};
	}, [play]);

	const buttonClick = () => {
		if (!stop.current) {
			stop.current = true;
			ballRef.current.innerHTML = 'PLAY';
		} else {
			stop.current = false;
			ballRef.current.innerHTML = 'STOP';
			setPlay(true);
		}
	};

	return (
		<div className='main-container'>
			<div id='head'>
				<h1 id='year' ref={yearRef}>
					2023
				</h1>
				<div id='controls'>
					<div id='speed'>
						<p id='speed-label'>Set speed (ms):</p>
						<input
							type='number'
							id='speed-input'
							name='speed-input'
							min={50}
							max={1000}
							step={50}
							value={runSpeed}
							onChange={(e) => setRunSpeed(e.target.value)}
						/>
					</div>
					<button
						id='play-button'
						className={play ? 'null' : 'bounce'}
						onClick={() => buttonClick()}
						ref={ballRef}>
						PLAY
					</button>
				</div>
			</div>
			<h2 id='title'>History of NBA Champions</h2>
			{/* <h3 id='subtitle'>Hover over bars for details on specific championships</h3> */}
			<div id='bar-chart-container'>
				<svg ref={svgRef} id='nba-chart' />
			</div>
		</div>
	);
}

export default BarChartRace;
