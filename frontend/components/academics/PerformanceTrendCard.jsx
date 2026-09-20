"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PERFORMANCE_TREND } from "./academicsData";

export default function PerformanceTrendCard() {
  const [metric, setMetric] = useState("CGPA");
  const [metricOpen, setMetricOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const metrics = ["CGPA", "SGPA", "Percentage"];

  // Chart coordinates calculation
  // ViewBox: 0 0 520 180 (compact and filling height naturally)
  const chartWidth = 520;
  const chartHeight = 180;
  const marginLeft = 35;
  const marginRight = 25;
  const marginTop = 26;
  const marginBottom = 28;

  const yMin = 6;
  const yMax = 10;
  const yRange = yMax - yMin;

  const pointsCount = PERFORMANCE_TREND.length;
  const xStep = (chartWidth - marginLeft - marginRight) / (pointsCount - 1);

  const points = PERFORMANCE_TREND.map((d, index) => {
    const x = marginLeft + index * xStep;
    const y = chartHeight - marginBottom - ((d.gpa - yMin) / yRange) * (chartHeight - marginTop - marginBottom);
    return { ...d, x, y };
  });

  // Build SVG smooth path
  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area under line
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const areaPath = `${linePath} L ${lastPoint.x} ${chartHeight - marginBottom} L ${firstPoint.x} ${chartHeight - marginBottom} Z`;

  const yGridLevels = [6, 7, 8, 9, 10];

  return (
    <div className="w-full h-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Performance Trend
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            Your {metric} over the semesters
          </p>
        </div>

        {/* Metric Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMetricOpen((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50 dark:bg-[#041D18] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <span>{metric}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#789991]" />
          </button>

          {metricOpen && (
            <div className="absolute right-0 mt-1.5 w-28 rounded-lg bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-md py-1 z-30">
              {metrics.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMetric(m);
                    setMetricOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    metric === m
                      ? "text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40"
                      : "text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#082A24]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsive SVG Chart: Centered in remaining vertical space */}
      <div className="relative w-full flex-1 flex flex-col justify-center overflow-hidden my-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto select-none overflow-visible"
        >
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines & Y labels */}
          {yGridLevels.map((lvl) => {
            const yPos =
              chartHeight - marginBottom - ((lvl - yMin) / yRange) * (chartHeight - marginTop - marginBottom);
            return (
              <g key={lvl}>
                <line
                  x1={marginLeft}
                  y1={yPos}
                  x2={chartWidth - marginRight}
                  y2={yPos}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-[#10372F]"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={marginLeft - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="text-[11px] font-medium fill-gray-400 dark:fill-[#789991]"
                >
                  {lvl}
                </text>
              </g>
            );
          })}

          {/* Shaded Area under Curve */}
          <path d={areaPath} fill="url(#trendGradient)" />

          {/* Line Path */}
          <path
            d={linePath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points & Value Badges */}
          {points.map((pt, idx) => {
            const isHovered = hoveredPoint === idx;
            return (
              <g
                key={pt.semester}
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              >
                {/* Value Label above point */}
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-[#0B3024] dark:fill-[#F1FAF6]"
                >
                  {pt.gpa}
                </text>

                {/* Outer Glow on hover */}
                {isHovered && (
                  <circle cx={pt.x} cy={pt.y} r="7" fill="#10B981" fillOpacity="0.25" />
                )}

                {/* Main point dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  className="fill-[#10B981] stroke-white dark:stroke-[#021512]"
                  strokeWidth="2"
                />

                {/* X-axis label */}
                <text
                  x={pt.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-[#5C786E] dark:fill-[#789991]"
                >
                  {pt.semester}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
