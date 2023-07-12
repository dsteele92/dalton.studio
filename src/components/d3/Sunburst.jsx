import React, { useState, useEffect, useRef } from 'react';
import { select, selectAll, pointer } from 'd3-selection';
import { hierarchy, tree, partition, eachAfter, eachBefore } from 'd3-hierarchy';
import { scaleOrdinal } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { tsvParse, autoType } from 'd3-dsv';
import { group } from 'd3-array';
import { arc } from 'd3-shape';
import { interpolate, quantize } from 'd3-interpolate';
import { format } from 'd3-format';
import { transition } from 'd3-transition';
import { interpolateSpectral } from 'd3-scale-chromatic';
import { sum, sort } from 'd3-array';

import tsvData from '../../assets/data/countriesData.js';

function Sunburst() {
	const [sortBy, setSortBy] = useState('Population');

	const svgRef = useRef(null);

	let dataPop = { name: 'world', children: [] };
	let dataArea = { name: 'world', children: [] };
	const continents = new Map();
	continents.set('AF', 'Africa');
	continents.set('AS', 'Asia');
	continents.set('EU', 'Europe');
	continents.set('NA', 'North America');
	continents.set('SA', 'South America');
	continents.set('OC', 'Oceania');
	continents.set('AN', 'Antarctica');

	const parsed = tsvParse(tsvData, autoType);
	const grouped = group(parsed, (d) => d.continent);
	for (const [continent, countries] of grouped.entries()) {
		// console.log(continent, countries);
		let currentPop = { name: continents.get(continent), children: [] };
		let total = 0;
		for (const country of countries) {
			total += country.population;
		}
		let contCreated = false;
		let cont2Created = false;
		let cont3Created = false;
		for (const country of countries) {
			if (country.population > total * 0.015) {
				currentPop.children.push({ name: country.name, value: country.population });
			} else {
				if (!contCreated) {
					currentPop.children.unshift({ name: 'cont...', children: [] });
					contCreated = true;
				}
				if (country.population > total * 0.001) {
					currentPop.children[0].children.push({ name: country.name, value: country.population });
				} else {
					if (!cont2Created) {
						currentPop.children[0].children.unshift({ name: 'cont...', children: [] });
						cont2Created = true;
					}
					if (country.population > total * 0.00005) {
						currentPop.children[0].children[0].children.push({
							name: country.name,
							value: country.population,
						});
					} else {
						if (!cont3Created) {
							currentPop.children[0].children[0].children.unshift({ name: 'cont...', children: [] });
							cont3Created = true;
						}
						currentPop.children[0].children[0].children[0].children.push({
							name: country.name,
							value: country.population,
						});
					}
				}
			}
		}
		dataPop.children.push(currentPop);

		let currentArea = { name: continents.get(continent), children: [] };
		contCreated = false;
		cont2Created = false;
		cont3Created = false;
		total = 0;
		for (const country of countries) {
			total += country.areaInSqKm;
		}
		for (const country of countries) {
			if (country.areaInSqKm > total * 0.015) {
				currentArea.children.push({ name: country.name, value: country.areaInSqKm });
			} else {
				if (!contCreated) {
					currentArea.children.unshift({ name: 'cont...', children: [] });
					contCreated = true;
				}
				if (country.areaInSqKm > total * 0.001) {
					currentArea.children[0].children.push({ name: country.name, value: country.areaInSqKm });
				} else {
					if (!cont2Created) {
						currentArea.children[0].children.unshift({ name: 'cont...', children: [] });
						cont2Created = true;
					}
					if (country.areaInSqKm > total * 0.00005) {
						currentArea.children[0].children[0].children.push({
							name: country.name,
							value: country.areaInSqKm,
						});
					} else {
						if (!cont3Created) {
							currentArea.children[0].children[0].children.unshift({ name: 'cont...', children: [] });
							cont3Created = true;
						}
						currentArea.children[0].children[0].children[0].children.push({
							name: country.name,
							value: country.areaInSqKm,
						});
					}
				}
			}
		}
		dataArea.children.push(currentArea);
	}
	// console.log('dataPop:', dataPop);
	// console.log('dataArea:', dataArea);

	useEffect(() => {
		const createPartition = (data) => {
			const pRoot = hierarchy(data)
				.sum((d) => d.value)
				.sort((a, b) => b.value - a.value)
				// if the name is 'cont...' then place last in hierarchy
				.eachBefore((d) => (d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name))
				.eachAfter((d) => {
					if (d.data.name === 'cont...') {
						d.parent.children.push(d);
						d.parent.children.splice(d.parent.children.indexOf(d), 1);
					}
				});

			return partition().size([2 * Math.PI, pRoot.height + 1])(pRoot);
		};

		const color = scaleOrdinal(quantize(interpolateSpectral, dataPop.children.length + 1));
		const d3format = format(',d');
		const width = 1000;
		const radius = 155.33333333333334;
		const d3arc = arc()
			.startAngle((d) => d.x0)
			.endAngle((d) => d.x1)
			.padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
			.padRadius(radius * 1.5)
			.innerRadius((d) => d.y0 * radius)
			.outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

		let root;
		if (sortBy === 'Population') {
			root = createPartition(dataPop);
		} else {
			root = createPartition(dataArea);
		}

		root.each((d) => (d.current = d));

		const svg = select(svgRef.current);

		svg.attr('viewBox', [0, 0, width, width]).style('font', '10px sans-serif');

		const g = svg.append('g').attr('transform', `translate(${width / 2},${width / 2})`);

		const tooltip = select('body')
			.append('div')
			.attr('id', 'tooltip-sunburst')
			.style('position', 'absolute')
			.style('visibility', 'hidden');

		const path = g
			.append('g')
			.selectAll('path')
			.data(root.descendants().slice(1))
			.join('path')
			.attr('fill', (d) => {
				while (d.depth > 1) d = d.parent;
				// return 'red';
				return color(d.data.name);
			})
			.attr('fill-opacity', (d) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
			.attr('pointer-events', (d) => (arcVisible(d.current) ? 'auto' : 'none'))
			.attr('d', (d) => d3arc(d.current));

		path.filter((d) => d.children)
			.style('cursor', 'pointer')
			.on('click', clicked);

		// path.append('title').text(
		// 	(d) => `${d.data.name}\n${sortBy}: ${format(d.value)}${sortBy === 'Area' ? ' sq km' : ''}`
		// );

		path.on('mouseover', function (event, d) {
			if (d.data.name === 'cont...') return;
			select(this).attr('opacity', 0.9); // Reduce opacity on mouseover
			// console.log(d);
			// console.log(d.data);
			tooltip
				.style('visibility', 'visible') // Show tooltip on mouseover
				.style('left', `${event.pageX}px`) // Position tooltip relative to mouse cursor
				.style('top', `${event.pageY + 18}px`)
				.append('h4')
				.text(`${d.data.name}`)
				// .style('font-weight', 'bold')
				.append('h4')
				.text(`${sortBy}: ${d3format(d.value)}${sortBy === 'Area' ? ' sq km' : ''}`);
		})
			.on('mousemove', function (event, d) {
				if (d.data.name === 'cont...') return;
				// select(this).attr('opacity', 1); // Restore opacity on mouseout
				tooltip
					.style('left', `${event.pageX}px`) // Position tooltip relative to mouse cursor
					.style('top', `${event.pageY + 18}px`);
			})
			.on('mouseout', function (e, d) {
				if (d.data.name === 'cont...') return;
				select(this).attr('opacity', 1); // Restore opacity on mouseout
				tooltip.style('visibility', 'hidden'); // Hide tooltip on mouseout
				tooltip.selectAll('h4').remove();
			});

		const label = g
			.append('g')
			.attr('pointer-events', 'none')
			.attr('text-anchor', 'middle')
			.style('user-select', 'none')
			.selectAll('text')
			.data(root.descendants().slice(1))
			.join('text')
			.attr('dy', '0.35em')
			.attr('fill-opacity', (d) => +labelVisible(d.current))
			.attr('transform', (d) => labelTransform(d.current))
			.text((d) => d.data.name);

		const parent = g
			.append('circle')
			.datum(root)
			.attr('r', radius)
			.attr('fill', 'none')
			.attr('pointer-events', 'all')
			.attr('id', 'center-circle')
			.on('click', clicked);

		function clicked(event, p) {
			parent.datum(p.parent || root);

			root.each(
				(d) =>
					(d.target = {
						x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
						x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
						y0: Math.max(0, d.y0 - p.depth),
						y1: Math.max(0, d.y1 - p.depth),
					})
			);

			const t = g.transition().duration(750);

			// Transition the data on all arcs, even the ones that aren’t visible,
			// so that if this transition is interrupted, entering arcs will start
			// the next transition from the desired position.
			path.transition(t)
				.tween('data', (d) => {
					const i = interpolate(d.current, d.target);
					return (t) => (d.current = i(t));
				})
				.filter(function (d) {
					return +this.getAttribute('fill-opacity') || arcVisible(d.target);
				})
				.attr('fill-opacity', (d) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
				.attr('pointer-events', (d) => (arcVisible(d.target) ? 'auto' : 'none'))

				.attrTween('d', (d) => () => d3arc(d.current));

			label
				.filter(function (d) {
					return +this.getAttribute('fill-opacity') || labelVisible(d.target);
				})
				.transition(t)
				.attr('fill-opacity', (d) => +labelVisible(d.target))
				.attrTween('transform', (d) => () => labelTransform(d.current));

			const center = document.getElementById('center-circle');
			if (p.data.name !== 'world') {
				center.classList.add('back-cursor');
			} else {
				center.classList.remove('back-cursor');
			}
		}

		function arcVisible(d) {
			return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
		}

		function labelVisible(d) {
			return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
		}

		function labelTransform(d) {
			const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
			const y = ((d.y0 + d.y1) / 2) * radius;
			return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
		}
		return () => {
			svg.selectAll('*').remove();
		};
	}, [sortBy]);

	return (
		<div className='main-container'>
			<div id='sort-label'>Sort by:</div>
			<select name='sortBy' id='sort-select' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
				<option value='Population'>Population</option>
				<option value='Area'>Area</option>
			</select>
			<svg ref={svgRef} id='sunburst-container' />
		</div>
	);
}

export default Sunburst;
