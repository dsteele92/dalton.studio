import React, { useEffect, useRef } from 'react';
import { select, selectAll, pointer } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';

import dinoData from '../../assets/data/dinosaurData.js';

function DinosaurTree() {
	const svgRef = useRef(null);

	const width = 1200;
	const beginTimeline = 120;
	const margin = { top: 20, right: 20, bottom: 140, left: 20 };
	const startX = -252;
	const endX = -100;

	const getEra = (year) => {
		if (year >= -252 && year <= -247) {
			return ['early-triassic', 'triassic'];
		}
		if (year > -247 && year <= -237) {
			return ['middle-triassic', 'triassic'];
		}
		if (year > -237 && year <= -201) {
			return ['late-triassic', 'triassic'];
		}
		if (year > -201 && year <= -174) {
			return ['early-jurassic', 'jurassic'];
		}
		if (year > -174 && year <= -164) {
			return ['middle-jurassic', 'jurassic'];
		}
		if (year > -164 && year <= -145) {
			return ['late-jurassic', 'jurassic'];
		}
		if (year > -145 && year <= -100) {
			return ['early-cretaceous', 'cretaceous'];
		}
	};

	const root = hierarchy(dinoData);
	// console.log(root);
	const dx = 10;
	const dy = 20;

	// Create a tree layout.
	const treeNodes = tree().nodeSize([dx, dy]);
	treeNodes(root);
	// console.log(createTree);

	// create the shape of the tree
	// first sets the x and y coordinates of each node
	// then uses postorder traversal to set the x and y coordinates of each node
	let index = 0;
	let totalNodeIndex = 0;
	root.eachAfter((d) => {
		d.data.nodeIndex = totalNodeIndex;
		totalNodeIndex++;
		if (d.data.name !== '') {
			d.x = index * dx;
			d.data.index = index;
			index++;
			[d.data.subEra, d.data.era] = getEra(d.data.year);
			// console.log(d.data);
		} else {
			// console.log(d.children);
			let total = 0;
			for (const node of d.children) {
				// console.log(node.x);
				total += node.x;
			}
			d.x = total / d.children.length;
		}
		if (d.data.year) {
			d.y = ((startX - d.data.year) / (startX - endX)) * (width - beginTimeline) + beginTimeline;
		}
		// console.log(d.data.name, d.x, d.y);
	});

	// Compute the extent of the tree. Note that x and y are swapped here
	// because in the tree layout, x is the breadth, but when displayed, the
	// tree extends right rather than down.
	let x0 = Infinity;
	let x1 = -x0;
	root.each((d) => {
		if (d.x > x1) x1 = d.x;
		if (d.x < x0) x0 = d.x;
	});

	// Compute the adjusted height of the tree.
	const height = x1 - x0 + dx * 2;

	useEffect(() => {
		const svg = select(svgRef.current)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom);

		const dinoTree = svg
			.append('g')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [-dy / 3, x0 - dx, width, height])
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const link = dinoTree
			.append('g')
			.attr('fill', 'none')
			.attr('stroke-opacity', 0.8)
			.attr('stroke-width', 1)
			.selectAll()
			.data(root.links())
			.join('path')
			.attr('stroke', (d) => {
				if (d.source.data.clade === 'Saurischia') {
					return '#569e6c';
				} else if (d.source.data.clade === 'Ornithischia') {
					return '#457aba';
				} else if (d.source.data.clade === 'Therapoda') {
					return '#bd5757';
				} else {
					return '#6b6b6b';
				}
			})
			.attr('d', (d) => {
				return `
                            M ${d.source.y},${d.source.x}
                            H ${d.source.y + 10}
                            V ${d.target.x}
                            H ${d.target.y}
                            `;
			})
			.attr('class', 'link')
			.attr('id', (d) => `path-${d.source.data.nodeIndex}-${d.target.data.nodeIndex}`);

		const node = dinoTree
			.append('g')
			.selectAll()
			.data(root.descendants())
			.join('g')
			.attr('transform', (d) => `translate(${d.y},${d.x})`)
			.attr('id', (d) => (d.data.index ? `node-${d.data.index}` : 'branch'));

		node.append('text')
			.attr('dy', '0.31em')
			.attr('x', (d) => (d.children ? -6 : 6))
			.attr('text-anchor', 'start')
			.attr('class', (d) => `node-label nodes-${d.data.era} nodes-${d.data.subEra}`)
			.attr('id', (d) => {
				if (d.data.index !== undefined) {
					return `node-label-${d.data.index}`;
				} else {
					return 'branch';
				}
			})
			.text((d) => d.data.name)
			.attr('font-weight', '100');

		const x = scaleLinear()
			.domain([-startX, -endX])
			.range([margin.left, width - beginTimeline - margin.right]);

		const xAxisG = svg
			.append('g')
			.attr('transform', `translate(${beginTimeline},${height + margin.top + margin.bottom - 45})`)
			.call(
				axisBottom(x)
					.ticks(width / 100)
					.tickSizeOuter(5)
			)
			.append('text')
			.attr('class', 'axis-label')
			.attr('x', (width - beginTimeline - margin.right) / 2)
			.attr('y', 35)
			.attr('text-anchor', 'middle')
			.text('Time (millions of years ago)')
			.attr('class', 'axis-label');

		const eras = [
			{
				name: 'triassic',
				start: -252,
				end: -201,
				subEras: [
					{ name: 'early', start: -252, end: -247 },
					{ name: 'middle', start: -247, end: -237 },
					{ name: 'late', start: -237, end: -201 },
				],
			},
			{
				name: 'jurassic',
				start: -201,
				end: -145,
				subEras: [
					{ name: 'early', start: -201, end: -174 },
					{ name: 'middle', start: -174, end: -164 },
					{ name: 'late', start: -164, end: -145 },
				],
			},
			{
				name: 'cretaceous',
				start: -145,
				end: -100,
				subEras: [{ name: 'early', start: -145, end: -100 }],
			},
		];

		const subEras = [
			{ name: 'early', era: 'triassic', start: -252, end: -247 },
			{ name: 'middle', era: 'triassic', start: -247, end: -237 },
			{ name: 'late', era: 'triassic', start: -237, end: -201 },
			{ name: 'early', era: 'jurassic', start: -201, end: -174 },
			{ name: 'middle', era: 'jurassic', start: -174, end: -164 },
			{ name: 'late', era: 'jurassic', start: -164, end: -145 },
			{ name: 'early', era: 'cretaceous', start: -145, end: -100 },
		];

		const eraLabels = svg
			.append('g')
			.attr('transform', `translate(${beginTimeline + margin.left},${height + margin.top})`)
			.attr('height', 35)
			.attr('width', width - beginTimeline);

		const eraBoxes = eraLabels
			.selectAll('rect')
			.data(eras)
			.enter()
			.append('rect')
			.attr('class', 'era-label')
			.attr('id', (d) => `label-${d.name}`)
			.attr(
				'x',
				(d) => ((-startX + d.start) / (endX - startX)) * (width - beginTimeline - margin.left - margin.right)
			)
			.attr('y', 35)
			.attr(
				'width',
				(d) => ((d.end - d.start) / (endX - startX)) * (width - beginTimeline - margin.left - margin.right)
			)
			.attr('height', 35)
			.attr('fill', 'white')
			.on('mouseover', function (e, d) {
				select(this).attr('fill', '#eee');
				selectAll(`.nodes-${d.name}`).attr('font-weight', '600');
				const currentNodes = root.descendants().filter((node) => node.data.era === d.name);
				for (const node of currentNodes) {
					const ancestors = node.ancestors();
					for (let i = 1; i < ancestors.length; i++) {
						const parent = ancestors[i].data.nodeIndex;
						const child = ancestors[i - 1].data.nodeIndex;
						select(`#path-${parent}-${child}`).attr('stroke-width', 3);
					}
				}
			})
			.on('mouseout', function (e, d) {
				select(this).attr('fill', 'white');
				selectAll(`.node-label`).attr('font-weight', '100');
				selectAll('.link').attr('stroke-width', 1);
			});

		const eraText = eraLabels
			.selectAll('text')
			.data(eras)
			.enter()
			.append('text')
			.attr(
				'x',
				(d) =>
					((-startX + (d.start + d.end) / 2) / (endX - startX)) *
					(width - beginTimeline - margin.left - margin.right)
			)
			.attr('y', 58)
			.text((d) => d.name)
			.attr('class', 'era-text')
			.attr('text-anchor', 'middle')
			.style('pointer-events', 'none');

		const subEraLabels = svg
			.append('g')
			.attr('transform', `translate(${beginTimeline + margin.left},${height + margin.top})`)
			.attr('height', 35)
			.attr('width', width - beginTimeline);

		const subEraBoxes = subEraLabels
			.selectAll('rect')
			.data(subEras)
			.enter()
			.append('rect')
			.attr('class', 'sub-era-label')
			.attr('id', (d) => `label-${d.name}-${d.era}`)
			.attr(
				'x',
				(d) => ((-startX + d.start) / (endX - startX)) * (width - beginTimeline - margin.left - margin.right)
			)
			.attr('y', 0)
			.attr(
				'width',
				(d) => ((d.end - d.start) / (endX - startX)) * (width - beginTimeline - margin.left - margin.right)
			)
			.attr('height', 35)
			.attr('fill', 'white')
			.attr('stroke', 'grey')
			.attr('stroke-width', 0.5)
			.on('mouseover', function (e, d) {
				// console.log(d);
				select(this).attr('fill', '#eee');
				const eraId = d.era;
				select(`#label-${eraId}`).attr('fill', '#eee');
				selectAll(`.nodes-${d.name}-${eraId}`).attr('font-weight', '600');
				const currentNodes = root.descendants().filter((node) => node.data.subEra === `${d.name}-${eraId}`);
				for (const node of currentNodes) {
					const ancestors = node.ancestors();
					for (let i = 1; i < ancestors.length; i++) {
						const parent = ancestors[i].data.nodeIndex;
						const child = ancestors[i - 1].data.nodeIndex;
						select(`#path-${parent}-${child}`).attr('stroke-width', 3);
					}
				}
			})
			.on('mouseout', function (e, d) {
				select(this).attr('fill', 'white');
				const eraId = d.era;
				select(`#label-${eraId}`).attr('fill', 'white');
				selectAll(`.node-label`).attr('font-weight', '100');
				selectAll('.link').attr('stroke-width', 1);
			});

		const subEraText = subEraLabels
			.selectAll('text')
			.data(subEras)
			.enter()
			.append('text')
			.attr(
				'x',
				(d) =>
					((-startX + (d.start + d.end) / 2) / (endX - startX)) *
					(width - beginTimeline - margin.left - margin.right)
			)
			.attr('y', 22)
			.text((d) => d.name)
			.attr('text-anchor', 'middle')
			.attr('class', 'sub-era-text')
			.style('pointer-events', 'none');

		const eraLabelsContainer = svg
			.append('g')
			.attr('transform', `translate(${beginTimeline + margin.left},${height + margin.top})`)
			.attr('height', 70)
			.attr('width', width - beginTimeline)
			.attr('pointer-events', 'none');

		const eraBoxesContainer = eraLabelsContainer
			.selectAll('rect')
			.data(eras)
			.enter()
			.append('rect')
			.attr(
				'x',
				(d) => ((-startX + d.start) / (endX - startX)) * (width - beginTimeline - margin.left - margin.right)
			)
			.attr('y', 0)
			.attr(
				'width',
				(d) => ((d.end - d.start) / (endX - startX)) * (width - beginTimeline - margin.left - margin.right)
			)
			.attr('height', 70)
			.attr('fill', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', 1)
			.attr('pointer-events', 'none');

		const clades = ['Dinosauriformes', 'Saurischia', 'Ornithischia', 'Therapoda'];

		const keyContainer = svg
			.append('g')
			.attr('class', 'key-container')
			.attr('transform', `translate(${width * 0.75},${height * 0.25})`)
			.attr('height', 70)
			.attr('width', width * 0.25)
			.attr('pointer-events', 'none');

		const key = keyContainer
			.selectAll('text')
			.data(clades)
			.enter()
			.append('text')
			.attr('class', 'key')
			.text((d) => d)
			.attr('x', 30)
			.attr('y', (d, i) => i * 20);

		const keyColors = keyContainer
			.selectAll('rect')
			.data(clades)
			.enter()
			.append('rect')
			.attr('height', 10)
			.attr('width', 10)
			.attr('rx', 2)
			.attr('ry', 2)
			.attr('x', 10)
			.attr('y', (d, i) => i * 20 - 10)
			.attr('fill', (d) => {
				if (d === 'Saurischia') {
					return '#569e6c';
				} else if (d === 'Ornithischia') {
					return '#457aba';
				} else if (d === 'Therapoda') {
					return '#bd5757';
				} else {
					return '#6b6b6b';
				}
			});

		const keyBorder = keyContainer
			.append('rect')
			.attr('height', 100)
			.attr('width', 175)
			.attr('x', -5)
			.attr('y', -25)
			.attr('fill', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', 1)
			// make border radius 10
			.attr('rx', 10)
			.attr('ry', 10)
			.attr('pointer-events', 'none');

		// -----------------------------TOOLTIPS--------------------------------

		const tooltipContainer = svg
			.append('foreignObject')
			.attr('id', 'toooltip-container')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top);

		const allLabels = selectAll('.node-label');

		function onMouseMove(e) {
			const mousePos = pointer(e);
			const x = mousePos[0] - margin.left;
			const y = mousePos[1] - margin.top;

			selectAll('.node-label').attr('font-weight', '100');
			selectAll('.link').attr('stroke-width', 1);
			selectAll('.era-label').attr('fill', 'white');
			selectAll('.sub-era-label').attr('fill', 'white');

			const yIndex = Math.floor(y / dx);
			if (yIndex >= 0 && yIndex < index) {
				// console.log(yIndex);
				select(`#node-label-${yIndex}`).attr('font-weight', '600');
				const currentNode = root.descendants().filter((d) => d.data.index === yIndex);
				// console.log(currentNode);
				const ancestors = currentNode[0].ancestors();
				// console.log(ancestors);
				selectAll('.link').attr('stroke-width', 1);
				for (let i = 1; i < ancestors.length; i++) {
					const parent = ancestors[i].data.nodeIndex;
					const child = ancestors[i - 1].data.nodeIndex;
					select(`#path-${parent}-${child}`).attr('stroke-width', 3);
				}
				select(`#label-${currentNode[0].data.era}`).attr('fill', '#eee');
				select(`#label-${currentNode[0].data.subEra}`).attr('fill', '#eee');
			}
		}

		function onMouseLeave() {
			selectAll('.node-label').attr('font-weight', '100');
			selectAll('.link').attr('stroke-width', 1);
			selectAll('.era-label').attr('fill', 'white');
			selectAll('.sub-era-label').attr('fill', 'white');
		}

		tooltipContainer.on('mousemove', onMouseMove).on('mouseleave', onMouseLeave);

		return () => {
			svg.selectAll('*').remove();
		};
	}, []);

	return (
		<div className='main-container'>
			<svg ref={svgRef} id='dino-tree-container' />
		</div>
	);
}

export default DinosaurTree;
