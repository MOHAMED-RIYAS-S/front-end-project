import React from 'react';

function BarChart({ data = [], height = 120 }) {
  const max = Math.max(1, ...data.map(d => d.value));
  const barWidth = Math.floor(100 / Math.max(1, data.length));

  return (
    <svg viewBox={`0 0 ${data.length * 40} ${height}`} width="100%" height={height} preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const x = i * 40 + 8;
        const barH = Math.round((d.value / max) * (height - 30));
        const y = height - barH - 20;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={24} height={barH} rx={6} fill="#4f46e5" />
            <text x={x + 12} y={height - 6} fontSize="10" fill="#475569" textAnchor="middle">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default BarChart;
