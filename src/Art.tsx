import React from "react";
import { hash, wave } from "./motion";
export const C = {
  ink: "#554b5a",
  paper: "#fff7e8",
  pink: "#efb3c1",
  blue: "#a6ccdd",
  night: "#364763",
  sage: "#b1c7b5",
  yellow: "#f4d58d",
};
export const Cloud = ({
  x,
  y,
  s = 1,
  f = 0,
  color = "#fffaf1",
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
  color?: string;
}) => (
  <g transform={`translate(${x + wave(f, 340) * 12} ${y}) scale(${s})`}>
    <path
      d="M-103 18 Q-129 -5 -102 -25 Q-82 -45 -56 -30 Q-46 -80 -2 -73 Q36 -74 48 -37 Q86 -54 105 -23 Q141 15 105 31 L-95 31Z"
      fill={color}
      stroke={C.ink}
      strokeWidth={2}
      strokeOpacity={0.25}
    />
    <path
      d="M-74 7 Q-47 -5 -32 1"
      fill="none"
      stroke={C.blue}
      strokeWidth={3}
      opacity={0.4}
    />
  </g>
);
export const Star = ({
  x,
  y,
  r = 12,
  fill = C.yellow,
  rotate = 0,
}: {
  x: number;
  y: number;
  r?: number;
  fill?: string;
  rotate?: number;
}) => (
  <path
    d="M0 -1 L.24 -.30 L.95 -.31 L.38 .13 L.59 .81 L0 .39 L-.59 .81 L-.38 .13 L-.95 -.31 L-.24 -.30Z"
    transform={`translate(${x} ${y}) rotate(${rotate}) scale(${r})`}
    fill={fill}
    stroke={C.ink}
    strokeWidth={1.5 / r}
    strokeLinejoin="round"
  />
);
export const Stars = ({
  f = 0,
  n = 40,
  night = false,
}: {
  f?: number;
  n?: number;
  night?: boolean;
}) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} opacity={0.25 + (0.4 * (wave(f, 130, i) + 1)) / 2}>
        <Star
          x={hash(i + 22) * 1800 + 60}
          y={hash(i + 141) * 690 + 80}
          r={5 + hash(i + 400) * 9}
          fill={night ? "#f5ddb0" : "#d4be92"}
          rotate={i * 13}
        />
      </g>
    ))}
  </>
);
export const Sky = ({
  f = 0,
  night = false,
  color,
}: {
  f?: number;
  night?: boolean;
  color?: string;
}) => (
  <>
    <rect
      width="1920"
      height="1080"
      fill={color || (night ? "#344562" : "#e9f1e9")}
    />
    <path
      d="M0 470 Q500 190 1020 375 T1920 280 L1920 1080 L0 1080Z"
      fill={night ? "#596281" : "#f9ead9"}
      opacity={0.65}
    />
    {!night && <circle cx="1450" cy="220" r="86" fill="#f6dba2" />}
    <Cloud
      x={320}
      y={195}
      s={1.5}
      f={f}
      color={night ? "#7d829b" : "#fffaf1"}
    />
    <Cloud
      x={1560}
      y={350}
      s={1.8}
      f={-f}
      color={night ? "#64728d" : "#fffaf1"}
    />
    {night && <Stars f={f} night />}
  </>
);
export const Hills = ({
  f = 0,
  night = false,
}: {
  f?: number;
  night?: boolean;
}) => (
  <>
    <path
      d={`M-200 810 Q${180 + wave(f, 400) * 8} 520 690 740 T1980 650 L2120 1080 L-200 1080Z`}
      fill={night ? "#596880" : "#bdcfbe"}
    />
    <path
      d="M-40 880 Q520 660 1050 825 T2000 750 L2000 1080 L-40 1080Z"
      fill={night ? "#7e8798" : "#dbd8bb"}
    />
    <path
      d="M-40 897 Q520 677 1050 842 T2000 767"
      fill="none"
      stroke={C.ink}
      strokeWidth="3"
      opacity=".16"
    />
  </>
);
export const Sea = ({
  f = 0,
  night = false,
}: {
  f?: number;
  night?: boolean;
}) => (
  <>
    <rect
      x="0"
      y="625"
      width="1920"
      height="455"
      fill={night ? "#4b6b88" : "#a8cbd0"}
    />
    {Array.from({ length: 9 }, (_, i) => (
      <path
        key={i}
        d={`M-100 ${648 + i * 43} Q${200 + wave(f, 170, i) * 75} ${625 + i * 43} 650 ${650 + i * 43} T1360 ${652 + i * 43} T2090 ${650 + i * 43}`}
        fill="none"
        stroke={i % 2 ? "#f7ebce" : "#e3eee7"}
        strokeWidth={i < 3 ? 3 : 5}
        opacity={0.48}
      />
    ))}
  </>
);
export const Tree = ({
  x,
  y,
  s = 1,
  f = 0,
  pink = false,
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
  pink?: boolean;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${s})`}
    stroke={C.ink}
    strokeWidth="3"
  >
    <path
      d="M-15 0 L-13 -190 L-42 -235 M-12 -127 L41 -208 M-14 -70 L-49 -132"
      fill="none"
      strokeWidth="12"
      stroke="#9e8370"
    />
    <g
      transform={`rotate(${wave(f, 180) * 1.3} 0 -120)`}
      fill={pink ? "#eab5bc" : "#a1bdad"}
    >
      <path d="M-121 -191 Q-165 -228 -109 -276 Q-118 -326 -50 -336 Q-11 -387 36 -344 Q114 -355 115 -299 Q178 -262 122 -211 Q86 -173 30 -191 Q-28 -159 -61 -191Z" />
      <path
        d="M-86 -252 Q-63 -279 -36 -272 M40 -302 Q77 -310 87 -282 M9 -230 Q40 -252 58 -240"
        fill="none"
        opacity={0.3}
      />
    </g>
  </g>
);
export const House = ({
  x,
  y,
  s = 1,
  pink = false,
  lit = true,
}: {
  x: number;
  y: number;
  s?: number;
  pink?: boolean;
  lit?: boolean;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${s})`}
    stroke={C.ink}
    strokeWidth="3"
  >
    <path
      d="M-71 -140 L70 -140 L70 0 L-71 0Z"
      fill={pink ? "#eac2bf" : "#c1ced2"}
    />
    <path d="M-90 -137 L0 -217 L87 -137Z" fill={pink ? "#b98b92" : "#94a4b6"} />
    <rect
      x="-47"
      y="-119"
      width="37"
      height="43"
      rx="3"
      fill={lit ? "#f8db9b" : "#8294ab"}
    />
    <rect
      x="21"
      y="-119"
      width="28"
      height="43"
      rx="3"
      fill={lit ? "#f8db9b" : "#8294ab"}
    />
    <path d="M-17 0 L-17 -48 Q0 -65 18 -48 L18 0" fill="#f6ede0" />
    <path d="M-70 -60 L69 -60" fill="none" opacity={0.2} />
  </g>
);
export const PaperBoat = ({
  x,
  y,
  s = 1,
  f = 0,
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
}) => (
  <g
    transform={`translate(${x} ${y + wave(f, 100) * 7}) rotate(${wave(f, 160) * 1.1}) scale(${s})`}
    stroke={C.ink}
    strokeWidth="4"
    strokeLinejoin="round"
  >
    <path d="M-260 -10 L-175 86 L176 86 L263 -11 L0 35Z" fill="#fdf7e8" />
    <path d="M-260 -10 L0 -60 L263 -11 L0 35Z" fill="#e4d8c9" />
    <path d="M-177 -10 L-2 -148 L176 -10 L0 35Z" fill="#fff9ed" />
    <path d="M0 -148 L0 35" fill="none" opacity={0.3} />
  </g>
);
export const Photo = ({
  x,
  y,
  s = 1,
  rotate = 0,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  rotate?: number;
  children?: React.ReactNode;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
    <rect
      x="-168"
      y="-130"
      width="345"
      height="290"
      rx="3"
      fill="#8d7b79"
      opacity={0.12}
      transform="translate(9 12)"
    />
    <rect
      x="-170"
      y="-132"
      width="340"
      height="285"
      rx="3"
      fill="#fffaf0"
      stroke="#b6a59b"
      strokeWidth="2"
    />
    <svg
      x="-153"
      y="-115"
      width="306"
      height="215"
      viewBox="0 0 306 215"
      overflow="hidden"
    >
      <rect width="306" height="215" fill="#c6dee0" />
      {children}
    </svg>
    <path
      d="M-102 126 Q-22 117 65 125"
      stroke="#cfb5ac"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M-61 -142 L42 -147 L53 -109 L-57 -105Z"
      fill="#ecd6b8"
      opacity={0.65}
    />
  </g>
);
export const Lamp = ({
  x,
  y,
  s = 1,
  f = 0,
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${wave(f, 120) * 2}) scale(${s})`}>
    <circle r="57" fill="#f9d493" opacity=".13" />
    <path
      d="M-20 12 L-27 -36 L25 -36 L21 12Z"
      fill="#ffe2a3"
      stroke={C.ink}
      strokeWidth="3"
    />
    <path
      d="M-27 -36 L0 -52 L25 -36 M0 -52 L0 -70 M-20 12 L21 12"
      fill="none"
      stroke={C.ink}
      strokeWidth="3"
    />
  </g>
);
export const Petals = ({
  f = 0,
  count = 16,
}: {
  f?: number;
  count?: number;
}) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const x =
        ((hash(i + 31) * 2300 + f * (0.18 + hash(i + 40) * 0.4)) % 2300) - 160;
      const y = ((hash(i + 91) * 1200 + f * 0.5) % 1200) - 80;
      return (
        <path
          key={i}
          d="M0 0 Q-20 -27 4 -20 Q20 -14 0 0Z"
          transform={`translate(${x} ${y}) rotate(${f * 0.4 + i * 32})`}
          fill={i % 2 ? "#eab8bd" : "#fff2d7"}
          opacity={0.65}
        />
      );
    })}
  </>
);
export const Frame = ({
  children,
  f = 0,
  night = false,
}: {
  children: React.ReactNode;
  f?: number;
  night?: boolean;
}) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    style={{ position: "absolute", inset: 0 }}
  >
    <defs>
      <filter id="ink-soft">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".027"
          numOctaves="2"
          seed="8"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale=".8" />
      </filter>
      <radialGradient id="edge">
        <stop offset="55%" stopColor="#9c7862" stopOpacity="0" />
        <stop offset="100%" stopColor="#9c7862" stopOpacity=".16" />
      </radialGradient>
    </defs>
    <g filter="url(#ink-soft)">{children}</g>
    <rect width="1920" height="1080" fill="url(#edge)" pointerEvents="none" />
    <rect
      x="27"
      y="27"
      width="1866"
      height="1026"
      rx="4"
      fill="none"
      stroke={night ? "#e8dbcb" : "#8e7763"}
      strokeWidth="1.4"
      opacity=".22"
    />
    <path
      d="M49 83 L49 49 L84 49 M1836 49 L1871 49 L1871 83 M49 997 L49 1031 L84 1031 M1836 1031 L1871 1031 L1871 997"
      fill="none"
      stroke={night ? "#ead8bd" : "#998271"}
      strokeWidth="2"
      opacity=".35"
    />
    <Petals f={f} count={5} />
  </svg>
);
