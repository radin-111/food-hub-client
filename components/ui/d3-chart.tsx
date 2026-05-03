"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { toast } from "sonner";

export interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface D3ChartProps {
  data: DataPoint[];
  type?: "bar" | "pie" | "line" | "area";
  width?: number;
  height?: number;
  className?: string;
}

export default function D3Chart({ 
  data, 
  type = "bar", 
  width = 400, 
  height = 300,
  className = ""
}: D3ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data || !data.length) return;

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Validate data
    const validData = data.filter(d => d && typeof d.value === 'number' && !isNaN(d.value));
    if (!validData.length) return;

    // Responsive dimensions
    const containerWidth = Math.min(width, svgRef.current.clientWidth || width);
    const containerHeight = Math.min(height, svgRef.current.clientHeight || height);
    
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = containerWidth - margin.left - margin.right;
    const innerHeight = containerHeight - margin.top - margin.bottom;

    // Main group
    const g = svg
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Error handling for each chart type
    try {

    if (type === "bar") {
      const x = d3
        .scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerWidth])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .range([innerHeight, 0]);

      // Add gradient
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "bar-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff6b35")
        .attr("stop-opacity", 1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#dc2626")
        .attr("stop-opacity", 1);

      // Bars
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name) || 0)
        .attr("y", innerHeight)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", "url(#bar-gradient)")
        .attr("rx", 4)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.value))
        .attr("height", d => innerHeight - y(d.value));

      // X axis
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "12px");

      // Y axis
      g.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");

      // Value labels
      g.selectAll(".value-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "value-label")
        .attr("x", d => (x(d.name) || 0) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#666")
        .text(d => d.value)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 400)
        .style("opacity", 1);
    }

    if (type === "pie") {
      const radius = Math.min(innerWidth, innerHeight) / 2;
      const g = svg
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal([
        "#ff6b35",
        "#dc2626",
        "#f97316",
        "#ea580c",
        "#c2410c",
        "#9a3412"
      ]);

      const pie = d3.pie<any>().value(d => d.value);
      const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
      const arcHover = d3.arc<any>().innerRadius(0).outerRadius(radius + 10);

      const arcs = g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i.toString()))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .style("opacity", 1);

      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "white")
        .text(d => d.data.name)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 400)
        .style("opacity", 1);
    }

    if (type === "area") {
      const x = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, innerWidth]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .range([innerHeight, 0]);

      // Add gradient for area
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff6b35")
        .attr("stop-opacity", 0.6);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff6b35")
        .attr("stop-opacity", 0.1);

      // Area
      const area = d3
        .area<DataPoint>()
        .x((d, i) => x(i))
        .y0(innerHeight)
        .y1(d => y(d.value))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("fill", "url(#area-gradient)")
        .attr("d", area)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Line
      const line = d3
        .line<DataPoint>()
        .x((d, i) => x(i))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#ff6b35")
        .attr("stroke-width", 3)
        .attr("d", line)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Points
      g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => x(i))
        .attr("cy", d => y(d.value))
        .attr("r", 0)
        .attr("fill", "#ff6b35")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("r", 5);

      // X axis
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(data.length - 1))
        .selectAll("text")
        .style("font-size", "12px");

      // Y axis
      g.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");
    }

    if (type === "line") {
      const x = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, innerWidth]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .range([innerHeight, 0]);

      const line = d3
        .line<DataPoint>()
        .x((d, i) => x(i))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

      // Add gradient for area
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff6b35")
        .attr("stop-opacity", 0.6);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff6b35")
        .attr("stop-opacity", 0.1);

      // Area
      const area = d3
        .area<DataPoint>()
        .x((d, i) => x(i))
        .y0(innerHeight)
        .y1(d => y(d.value))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("fill", "url(#line-gradient)")
        .attr("d", area)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Line
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#ff6b35")
        .attr("stroke-width", 3)
        .attr("d", line)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Points
      g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => x(i))
        .attr("cy", d => y(d.value))
        .attr("r", 0)
        .attr("fill", "#ff6b35")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("r", 5);

      // X axis
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(data.length - 1))
        .selectAll("text")
        .style("font-size", "12px");

      // Y axis
      g.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");
    }
    
    } catch (error) {
      toast.error('D3 chart rendering error');
      // Optionally render an error message
      g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#666')
        .style('font-size', '14px')
        .text('Chart unavailable');
    }

  }, [data, type, width, height]);

  return (
    <div className={`w-full h-full ${className}`}>
      <svg 
        ref={svgRef} 
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
