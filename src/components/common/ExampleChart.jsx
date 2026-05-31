import React from 'react';

const exampleSvg = process.env.PUBLIC_URL + '/img/example.svg';

const positions = [
  { key: 'top', x: 803, y: 352 },
  { key: 'P4', x: 813, y: 574 },
  { key: 'P1', x: 649, y: 898 },
  { key: 'P2', x: 992, y: 899 },
  { key: 'P3', x: 814, y: 781 },
  { key: 'P5', x: 1296, y: 546 },
  { key: 'N4', x: 623, y: 1368 },
  { key: 'N1', x: 1001, y: 1370 },
  { key: 'N2', x: 816, y: 1478 },
  { key: 'N3', x: 809, y: 1698 },
  { key: 'bottom', x: 810, y: 1913 },
  { key: 'A', x: 353, y: 1153 },
  { key: 'B', x: 781, y: 1151 },
  { key: 'C', x: 1179, y: 1154 },
  { key: 'D', x: 1528, y: 1156 },
];

const ExampleChart = ({ pinaculo }) => {
  return (
    <div style={{ position: 'relative', width: 490, margin: '0 auto' }}>
      <img src={exampleSvg} alt="numerology chart" style={{ width: '100%', display: 'block' }} />
      <svg
        viewBox="0 0 1802 2048"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="nodeBg" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDF6E3" />
            <stop offset="100%" stopColor="#D4A830" />
          </radialGradient>
          <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6B3A00" floodOpacity="0.35" />
          </filter>
        </defs>
        {positions.map((p) => {
          const val = pinaculo?.[p.key];
          const isBox = ['A', 'B', 'C', 'D'].includes(p.key);
          const r = isBox ? 32 : 24;
          return (
            <g key={p.key}>
              {val && (
                <>
                  <circle
                    cx={p.x} cy={p.y} r={r}
                    fill="url(#nodeBg)"
                    stroke="#B8922A"
                    strokeWidth="3"
                    filter="url(#nodeShadow)"
                  />
                  <text
                    x={p.x} y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={isBox ? 36 : 28}
                    fontWeight="700"
                    fill="#2C1800"
                    fontFamily="'Roboto Mono'"
                  >
                    {val}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ExampleChart;
