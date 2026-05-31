import React from 'react';

const NumerologyDiamond = ({ pinaculo }) => {
  return (
    <svg width="460" height="580" viewBox="0 0 460 580" xmlns="http://www.w3.org/2000/svg" role="img" id="numerology-diamond">
      <title>Numerology diamond chart</title>
      <desc>Diamond-shaped numerology chart with gold-styled nodes on a warm cream background, matching the reference image aesthetic.</desc>

      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#FDF6E3"/>
          <stop offset="100%" stopColor="#F0E2C0"/>
        </radialGradient>
        <linearGradient id="nodeGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDF6E3"/>
          <stop offset="50%" stopColor="#F5E9C8"/>
          <stop offset="100%" stopColor="#EDD89A"/>
        </linearGradient>
        <linearGradient id="boxGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDF6E3"/>
          <stop offset="40%" stopColor="#F7EDD5"/>
          <stop offset="100%" stopColor="#E8D08A"/>
        </linearGradient>
        <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#9A7020" floodOpacity="0.35"/>
        </filter>
        <filter id="boxShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#7A5A10" floodOpacity="0.3"/>
        </filter>
      </defs>

      <rect x="0" y="0" width="460" height="580" fill="url(#bgGrad)" rx="16"/>

      {/* CONNECTOR LINES */}
      <g stroke="#C8A030" strokeWidth="2.2" fill="none" opacity="0.85">
        <line x1="230" y1="50"  x2="72"  y2="292"/>
        <line x1="230" y1="50"  x2="388" y2="292"/>
        <line x1="72"  y1="292" x2="230" y2="534"/>
        <line x1="388" y1="292" x2="230" y2="534"/>
        <line x1="230" y1="50"  x2="148" y2="152"/>
        <line x1="148" y1="152" x2="72"  y2="292"/>
        <line x1="148" y1="152" x2="178" y2="222"/>
        <line x1="178" y1="222" x2="72"  y2="292"/>
        <line x1="230" y1="50"  x2="178" y2="222"/>
        <line x1="230" y1="50"  x2="312" y2="152"/>
        <line x1="312" y1="152" x2="388" y2="292"/>
        <line x1="312" y1="152" x2="282" y2="222"/>
        <line x1="282" y1="222" x2="388" y2="292"/>
        <line x1="230" y1="50"  x2="282" y2="222"/>
        <line x1="72"  y1="292" x2="148" y2="432"/>
        <line x1="148" y1="432" x2="230" y2="534"/>
        <line x1="148" y1="432" x2="178" y2="362"/>
        <line x1="178" y1="362" x2="230" y2="534"/>
        <line x1="178" y1="362" x2="72"  y2="292"/>
        <line x1="388" y1="292" x2="312" y2="432"/>
        <line x1="312" y1="432" x2="230" y2="534"/>
        <line x1="312" y1="432" x2="282" y2="362"/>
        <line x1="282" y1="362" x2="230" y2="534"/>
        <line x1="282" y1="362" x2="388" y2="292"/>
        <line x1="148" y1="152" x2="312" y2="152"/>
        <line x1="178" y1="222" x2="282" y2="222"/>
        <line x1="148" y1="432" x2="312" y2="432"/>
        <line x1="178" y1="362" x2="282" y2="362"/>
        <line x1="388" y1="292" x2="420" y2="268"/>
        <line x1="388" y1="292" x2="420" y2="316"/>
      </g>

      {/* CIRCLE NODES */}

      {/* top apex */}
      <g filter="url(#nodeShadow)">
        <text x="230" y="50" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="22" fontWeight="700" fill="#2C1800" data-key="top">{pinaculo?.top}</text>
      </g>

      {/* top-left */}
      <g filter="url(#nodeShadow)">
        <circle cx="148" cy="152" r="29" fill="none"           stroke="#B8922A" strokeWidth="1.8"/>
        <circle cx="148" cy="152" r="23" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2.2"/>
        <text x="148" y="152" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#2C1800" data-key="tl">{pinaculo?.P3}</text>
      </g>

      {/* top-right */}
      <g filter="url(#nodeShadow)">
        <circle cx="312" cy="152" r="29" fill="none"           stroke="#B8922A" strokeWidth="1.8"/>
        <circle cx="312" cy="152" r="23" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2.2"/>
        <text x="312" y="152" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#2C1800" data-key="tr">{pinaculo?.P5}</text>
      </g>

      {/* mid-left-upper */}
      <g filter="url(#nodeShadow)">
        <circle cx="178" cy="222" r="24" fill="none"           stroke="#B8922A" strokeWidth="1.6"/>
        <circle cx="178" cy="222" r="18" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2"/>
        <text x="178" y="222" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#2C1800" data-key="mlu">{pinaculo?.P1}</text>
      </g>

      {/* mid-right-upper */}
      <g filter="url(#nodeShadow)">
        <circle cx="282" cy="222" r="24" fill="none"           stroke="#B8922A" strokeWidth="1.6"/>
        <circle cx="282" cy="222" r="18" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2"/>
        <text x="282" y="222" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#2C1800" data-key="mru">{pinaculo?.P2}</text>
      </g>

      {/* mid-left-lower */}
      <g filter="url(#nodeShadow)">
        <circle cx="178" cy="362" r="24" fill="none"           stroke="#B8922A" strokeWidth="1.6"/>
        <circle cx="178" cy="362" r="18" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2"/>
        <text x="178" y="362" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#2C1800" data-key="mll">{pinaculo?.N1}</text>
      </g>

      {/* mid-right-lower */}
      <g filter="url(#nodeShadow)">
        <circle cx="282" cy="362" r="24" fill="none"           stroke="#B8922A" strokeWidth="1.6"/>
        <circle cx="282" cy="362" r="18" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2"/>
        <text x="282" y="362" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#2C1800" data-key="mlr">{pinaculo?.N2}</text>
      </g>

      {/* lower-left */}
      <g filter="url(#nodeShadow)">
        <circle cx="148" cy="432" r="29" fill="none"           stroke="#B8922A" strokeWidth="1.8"/>
        <circle cx="148" cy="432" r="23" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2.2"/>
        <text x="148" y="432" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#2C1800" data-key="bl">{pinaculo?.N3}</text>
      </g>

      {/* lower-right */}
      <g filter="url(#nodeShadow)">
        <circle cx="312" cy="432" r="29" fill="none"           stroke="#B8922A" strokeWidth="1.8"/>
        <circle cx="312" cy="432" r="23" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2.2"/>
        <text x="312" y="432" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#2C1800" data-key="br">{pinaculo?.N4}</text>
      </g>

      {/* bottom apex */}
      <g filter="url(#nodeShadow)">
        <circle cx="230" cy="534" r="34" fill="none"           stroke="#B8922A" strokeWidth="2"/>
        <circle cx="230" cy="534" r="28" fill="url(#nodeGold)" stroke="#D4A830" strokeWidth="2.5"/>
        <text x="230" y="534" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="22" fontWeight="700" fill="#2C1800" data-key="bot">{pinaculo?.bottom}</text>
      </g>

      {/* SQUARE NODES A B C D */}
      <g filter="url(#boxShadow)">
        <rect x="38"  y="260" width="68" height="64" rx="12" fill="none"          stroke="#B8922A" strokeWidth="1.8"/>
        <rect x="42"  y="264" width="60" height="56" rx="9"  fill="url(#boxGold)" stroke="#D4A830" strokeWidth="2.5"/>
        <text x="72"  y="289" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="26" fontWeight="700" fill="#2C1800" data-key="A">{pinaculo?.A}</text>
        <text x="72"  y="312" textAnchor="middle"
              fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#A07828">A</text>
      </g>

      <g filter="url(#boxShadow)">
        <rect x="167" y="260" width="68" height="64" rx="12" fill="none"          stroke="#B8922A" strokeWidth="1.8"/>
        <rect x="171" y="264" width="60" height="56" rx="9"  fill="url(#boxGold)" stroke="#D4A830" strokeWidth="2.5"/>
        <text x="201" y="289" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="26" fontWeight="700" fill="#2C1800" data-key="B">{pinaculo?.B}</text>
        <text x="201" y="312" textAnchor="middle"
              fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#A07828">B</text>
      </g>

      <g filter="url(#boxShadow)">
        <rect x="297" y="260" width="68" height="64" rx="12" fill="none"          stroke="#B8922A" strokeWidth="1.8"/>
        <rect x="301" y="264" width="60" height="56" rx="9"  fill="url(#boxGold)" stroke="#D4A830" strokeWidth="2.5"/>
        <text x="331" y="289" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="26" fontWeight="700" fill="#2C1800" data-key="C">{pinaculo?.C}</text>
        <text x="331" y="312" textAnchor="middle"
              fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#A07828">C</text>
      </g>

      <g filter="url(#boxShadow)">
        <rect x="390" y="260" width="68" height="64" rx="12" fill="none"          stroke="#B8922A" strokeWidth="1.8"/>
        <rect x="394" y="264" width="60" height="56" rx="9"  fill="url(#boxGold)" stroke="#D4A830" strokeWidth="2.5"/>
        <text x="424" y="289" textAnchor="middle" dominantBaseline="central"
              fontFamily="Georgia,serif" fontSize="26" fontWeight="700" fill="#2C1800" data-key="D">{pinaculo?.D}</text>
        <text x="424" y="312" textAnchor="middle"
              fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#A07828">D</text>
      </g>
    </svg>
  );
};

export default NumerologyDiamond;
