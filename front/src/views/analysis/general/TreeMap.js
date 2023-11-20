import React, { useEffect, useRef, useMemo } from "react";
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as d3 from 'd3'
import followers from './data/followers'

const data = {
  "name": "layout",
  "children": followers
 }

function Chart({ id }) {    
    const ref = useRef()
    useEffect(() => {
      // Specify the chart’s dimensions.
      const width = 1154;
      const height = 1154;
    
      // Specify the color scale.
      const color = d3.scaleOrdinal(data.children.map(d => d.name), d3.schemeTableau10);
    
      // Compute the layout.
      const root = d3.treemap()
        .tile(d3.treemapSquarify) // e.g., d3.treemapSquarify
        .size([width, height])
        .padding(1)
        .round(true)
      (d3.hierarchy(data)
          .sum(d => d.follower)
          .sort((a, b) => b.follower - a.follower));
    
      // Create the SVG container.
      const svg = d3.create("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
    
      // Add a cell for each leaf of the hierarchy.
      const leaf = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`);
    
      // Append a tooltip.
      const format = d3.format(",d");
      leaf.append("title")
          .text(d => `${d.ancestors().reverse().map(d => d.data.name).join(".")}\n${format(d.value)}`);
    
      // Append a color rectangle. 
      leaf.append("image")
        .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
    
        .attr("xlink:href", d => d.data.profile_image)
      var leaf_cnt = 0
      leaf.append("rect")
          .attr("id", d => (d.leafUid = leaf_cnt++))
          .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
          .attr("fill-opacity", 0.2)
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0);
    
      var clip_cnt = 0
      // Append a clipPath to ensure text does not overflow.
      leaf.append("clipPath")
          .attr("id", d => (d.clipUid = clip_cnt++))
        .append("use")
          .attr("xlink:href", d => d.leafUid.href);
    
      // Append multiline text. The last line shows the value and has a specific formatting.
      leaf.append("text")
          .attr("clip-path", d => d.clipUid)
        .selectAll("tspan")
        .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
        .join("tspan")
          .attr("x", 3)
          .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
          .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
          .text(d => d);
    
      const chart = Object.assign(svg.node(), {scales: {color}});

      ref.current.append(chart)
    }, []);


    return <MainCard>
        <Grid container direction='column' spacing={gridSpacing}>
            <Grid item>
              <Typography variant="h4">Treemap Visualization of the Top 50 X Accounts by Followers</Typography>
            </Grid>
            <Grid item xs={12}>
                <div id={id} ref={ref}></div>
            </Grid>
        </Grid>
    </MainCard>
}


export default Chart