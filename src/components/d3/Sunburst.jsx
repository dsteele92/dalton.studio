import React, { useEffect, useRef } from 'react';
import { select, selectAll, pointer } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { tsvParse, autoType } from 'd3-dsv';

import tsvData from '../../assets/data/countriesData.js';

function Sunburst() {
	const svgRef = useRef(null);

	const parsed = tsvParse(tsvData, autoType);
	console.log(parsed);

	return <svg ref={svgRef} id='bar-chart-race' />;
}

export default Sunburst;
