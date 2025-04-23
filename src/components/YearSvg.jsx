import React from 'react';

const YearSvg = ({ year, data, isCurrentYear }) => {
  return (
    <svg width="350" height="400" xmlns="http://www.w3.org/2000/svg">
      <g id="Layer_1">
        <title>{isCurrentYear ? 'Current Year' : 'Next Year'}</title>
        <rect rx="10" strokeWidth="1" id="svg_3" height="50" width="52" y="205.39999" x="14.99999" stroke="#000" fill="#fff"/>
        <rect rx="10" strokeWidth="1" id="svg_4" height="50" width="52" y="205.39999" x="145.99999" stroke="#000" fill="#fff"/>
        <rect rx="10" strokeWidth="1" id="svg_5" height="50" width="52" y="204.39999" x="276.99999" stroke="#000" fill="#fff"/>
        <ellipse ry="28" rx="28.5" id="svg_6" cy="162.4" cx="100.49999" strokeWidth="1" stroke="#000" fill="#fff"/>
        <ellipse ry="28" rx="28.5" id="svg_8" cy="164.4" cx="242.49999" strokeWidth="1" stroke="#000" fill="#fff"/>
        <ellipse ry="28" rx="28.5" id="svg_9" cy="42.4" cx="173.49999" strokeWidth="1" stroke="#000" fill="#fff"/>
        <ellipse ry="28" rx="28.5" id="svg_10" cy="119.4" cx="170.49999" strokeWidth="1" stroke="#000" fill="#fff"/>
        <ellipse ry="28" rx="28.5" id="svg_11" cy="313.4" cx="170.49999" strokeWidth="1" stroke="#000" fill="#fff"/>
        <line stroke="#000" id="svg_12" y2="174.40009" x2="74.55559" y1="204.88146" x1="51.14816" strokeWidth="1" fill="none"/>
        <line stroke="#000" id="svg_13" y2="139.10794" x2="117.14539" y1="48.36805" x1="145.29327" strokeWidth="1" fill="none"/>
        <line stroke="#000" id="svg_14" y2="142.81161" x2="225.66289" y1="44.29402" x1="202.32977" strokeWidth="1" fill="none"/>
        <line id="svg_15" y2="203.77399" x2="293.44003" y1="173.77427" x1="269.36618" strokeWidth="1" stroke="#000" fill="none"/>
        <line id="svg_16" y2="205.25546" x2="161.58941" y1="172.66317" x1="127.88603" strokeWidth="1" stroke="#000" fill="none"/>
        <line stroke="#000" id="svg_17" y2="205.25546" x2="181.95959" y1="169.70023" x1="213.81115" strokeWidth="1" fill="none"/>
        <line id="svg_18" y2="305.69896" x2="142.7007" y1="247.92173" x1="66.77549" strokeWidth="1" stroke="#000" fill="none"/>
        <line stroke="#000" id="svg_19" y2="241.99586" x2="276.77352" y1="307.18043" x1="199.36684" strokeWidth="1" fill="none"/>
        <line stroke="#000" id="svg_20" y2="230.14412" x2="146.77474" y1="229.77375" x1="67.14586" strokeWidth="1" fill="none"/>
        <line stroke="#000" id="svg_21" y2="230.14412" x2="277.14388" y1="230.14412" x1="197.14463" strokeWidth="1" fill="none"/>
        
        {isCurrentYear ? (
          <>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_22" y="236.73664" x="30" strokeWidth="0" fill="#000000">{data?.UniYear}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_24" y="233.95787" x="205" strokeWidth="0" fill="#000000">{data?.Cage}</text>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_25" y="235.81038" x="120" strokeWidth="0" fill="#000000">{data?.PerY}</text>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_26" y="178.99997" x="70" strokeWidth="0" fill="#000000">{data?.P1}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_27" y="179.61747" x="158.33847" strokeWidth="0" fill="#000000">{data?.P2}</text>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_28" y="77.42047" x="120" strokeWidth="0" fill="#000000">{data?.P3}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_29" y="143.18471" x="118" strokeWidth="0" fill="#000000">{data?.Pc}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="svg_30" y="305.27965" x="120" strokeWidth="0" fill="#000000">{data?.Pb}</text>
          </>
        ) : (
          <>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_22" y="236.73664" x="30" strokeWidth="0" fill="#000000">{data?.NextUY}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_24" y="233.95787" x="205" strokeWidth="0" fill="#000000">{data?.NxAge}</text>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_25" y="235.81038" x="118" strokeWidth="0" fill="#000000">{data?.NextPY}</text>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_26" y="178.99997" x="70" strokeWidth="0" fill="#000000">{data?.NxP1}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_27" y="179.61747" x="158.33847" strokeWidth="0" fill="#000000">{data?.NxP2}</text>
            <text transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_28" y="77.42047" x="120" strokeWidth="0" fill="#000000">{data?.NxP3}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_29" y="143.18471" x="118" strokeWidth="0" fill="#000000">{data?.NxPc}</text>
            <text style={{ cursor: 'move' }} transform="matrix(1.49773 0 0 1.19956 -15.8042 -41.7748)" stroke="#000" xmlSpace="preserve" textAnchor="start" fontFamily="'Roboto Mono'" fontSize="25" id="next_svg_30" y="305.27965" x="120" strokeWidth="0" fill="#000000">{data?.NxPb}</text>
          </>
        )}
      </g>
    </svg>
  );
};

export default YearSvg; 