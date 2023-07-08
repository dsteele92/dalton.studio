import React, { useEffect, useRef } from 'react';
import { select, selectAll, pointer } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { csvParse, autoType } from 'd3-dsv';

import csvData from '../../assets/data/nbaData.js';

function BarChartRace() {
	const svgRef = useRef(null);

	const championships = csvParse(csvData, autoType)
		.filter((d) => d.Lg !== 'ABA')
		.reverse();
	console.log(championships);

	return <svg ref={svgRef} id='bar-chart-race' />;
}

export default BarChartRace;
