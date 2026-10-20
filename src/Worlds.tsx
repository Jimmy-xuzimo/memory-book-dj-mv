import { Character, Couple } from "./Character";
import {
  C,
  Cloud,
  Frame,
  House,
  Hills,
  Lamp,
  PaperBoat,
  Petals,
  Photo,
  Sea,
  Sky,
  Star,
  Stars,
  Tree,
} from "./Art";
import { clamp, ease, hash, lerp, pulse, range, wave } from "./motion";

type SceneProps = { shot: number; f: number; p: number };
const line = {
  fill: "none",
  stroke: C.ink,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const MiniMemory = ({
  f = 0,
  variant = 0,
}: {
  f?: number;
  variant?: number;
}) => {
  const v = variant % 6,
    night = v === 1 || v === 3;
  return (
    <>
      <rect width="306" height="215" fill={night ? "#495c78" : "#c1d9db"} />
      <circle cx="244" cy="44" r="28" fill="#f4d89c" />
      {v === 2 ? (
        <>
          <path d="M0 140 L306 140 L306 215 L0 215Z" fill="#91b9c5" />
          <path
            d="M0 161 Q68 150 150 165 T306 163 M0 193 Q68 180 150 195 T306 191"
            stroke="#e9ecda"
            strokeWidth="3"
            fill="none"
          />
          <PaperBoat x={153} y={184} s={0.34} />
        </>
      ) : v === 3 ? (
        <path
          d="M178 21 Q81 0 79 79 Q83 160 175 133 Q95 113 144 50Z"
          fill="#efdbad"
        />
      ) : (
        <path
          d="M0 160 Q75 113 156 154 T306 144 L306 215 L0 215Z"
          fill={night ? "#7b8093" : "#a9c0b0"}
        />
      )}
      {v === 0 && <Tree x={258} y={183} s={0.3} f={f} pink />}
      {v === 1 &&
        [0, 1, 2].map((i) => (
          <g
            key={i}
            transform={`translate(${50 + i * 102} ${28 + (i % 2) * 30})`}
            stroke={[C.pink, C.yellow, C.blue][i]}
            strokeWidth="1.3"
          >
            {Array.from({ length: 8 }, (_, j) => (
              <path
                key={j}
                d={`M${Math.cos((j * Math.PI) / 4) * 8} ${Math.sin((j * Math.PI) / 4) * 8} l${Math.cos((j * Math.PI) / 4) * 18} ${Math.sin((j * Math.PI) / 4) * 18}`}
              />
            ))}
          </g>
        ))}
      {v === 4 && (
        <g fill="#ecc5be" stroke={C.ink} strokeWidth="2">
          <rect x="24" y="64" width="260" height="145" rx="10" />
          <rect x="40" y="82" width="228" height="95" fill="#c0d6d5" />
          <circle cx="67" cy="210" r="14" fill="#777f8f" />
          <circle cx="243" cy="210" r="14" fill="#777f8f" />
        </g>
      )}
      {v === 5 && (
        <g stroke="#ad8590" strokeWidth="2">
          <path d="M95 0 L95 204 M215 0 L215 204" />
          <path d="M74 204 L235 204" strokeWidth="6" />
        </g>
      )}
      <Couple
        x={151}
        y={v === 2 ? 183 : 211}
        scale={0.32}
        frame={f}
        walk={v === 2}
        hold
      />
    </>
  );
};
const Ribbon = ({
  f = 0,
  y = 700,
  color = C.pink,
}: {
  f?: number;
  y?: number;
  color?: string;
}) => (
  <path
    d={`M-200 ${y + 30} Q${250 + wave(f, 250) * 20} ${y - 190} 650 ${y} T1390 ${y - 40} T2200 ${y - 160}`}
    fill="none"
    stroke={color}
    strokeWidth="17"
    strokeLinecap="round"
  />
);
const Earphone = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} {...line}>
    <path d="M-23 0 L-23 -20 Q-23 -45 0 -45 Q23 -45 23 -20 L23 0" />
    <rect x="-30" y="-12" width="13" height="30" rx="6" fill={C.pink} />
    <rect x="17" y="-12" width="13" height="30" rx="6" fill={C.blue} />
  </g>
);
const Birds = ({
  f = 0,
  x = 1100,
  y = 360,
  count = 7,
}: {
  f?: number;
  x?: number;
  y?: number;
  count?: number;
}) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <g
        key={i}
        transform={`translate(${x + i * 77 + wave(f, 130, i) * 18} ${y + (i % 3) * 55 + wave(f, 90, i) * 16}) rotate(-12)`}
        {...line}
      >
        <path
          d={`M-26 ${wave(f, 22, i) * 14} L0 4 L24 ${wave(f + 4, 22, i) * 14} L5 15Z`}
          fill={i % 2 ? "#f4e4cf" : "#bbcbd5"}
          strokeWidth="2"
        />
      </g>
    ))}
  </>
);

function Opening({ shot: s, f, p }: SceneProps) {
  const travel = range(f, 0, 105) * 140;
  if (s === 0)
    return (
      <>
        <rect width="1920" height="1080" fill="#eee9df" />
        <g opacity=".22" {...line} stroke="#879bb0">
          {Array.from({ length: 23 }, (_, i) => (
            <path
              key={i}
              d={`M${i * 90} 0 L${i * 90} 1080 M0 ${i * 90} L1920 ${i * 90}`}
            />
          ))}
        </g>
        <Stars f={f} n={17} />
        <g transform={`translate(${-travel} 0)`}>
          {Array.from({ length: 9 }, (_, i) => (
            <House
              key={i}
              x={160 + i * 240}
              y={760 + Math.sin(i) * 40}
              s={0.55 + (i % 3) * 0.12}
              lit={false}
            />
          ))}
          <path
            d="M-100 864 Q530 731 1140 842 T2200 815"
            {...line}
            stroke="#b7bdc1"
            strokeWidth="35"
          />
          <Character
            x={900 + p * 105}
            y={849}
            scale={0.62 + ease(p) * 0.12}
            frame={f}
            walk={p < 0.75}
            mood="soft"
          />
        </g>
        <path
          d="M370 329 Q700 250 879 366"
          {...line}
          stroke="#bbaea0"
          strokeDasharray="4 14"
        />
        <Star
          x={lerp(800, 1030, ease(p))}
          y={lerp(180, 690, ease(p))}
          r={18}
          rotate={f * 0.6}
        />
      </>
    );
  if (s === 1)
    return (
      <>
        <Sky f={f} color="#c5d1d9" />
        <House x={360} y={825} s={2} lit={false} />
        <House x={1580} y={825} s={2} lit={false} />
        <path
          d="M500 920 L500 835 L680 835 L680 755 L860 755 L860 675 L1040 675 L1040 595 L1220 595 L1220 515 L1430 515"
          {...line}
          stroke="#74849a"
          strokeWidth="12"
        />
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            d={`M${680 + i * 180} ${835 - i * 80} l${70 * Math.sin(p * Math.PI)} -${35 * Math.sin(p * Math.PI)}`}
            {...line}
            stroke="#f9efe1"
            strokeWidth="8"
          />
        ))}
        <Character
          x={865}
          y={750 + wave(f, 45) * 2}
          scale={0.73}
          frame={f}
          mood="sad"
          pose={p > 0.6 ? "look" : "idle"}
        />
        <Cloud x={865} y={315} s={1.15} color="#99a7ba" f={f} />
        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={i}
            d={`M${750 + hash(i) * 225} ${370 + ((f * 3 + i * 51) % 230)} l-9 25`}
            stroke="#7e96b0"
            strokeWidth="3"
          />
        ))}
        <path
          d={`M1630 600 Q${1470 - p * 320} 520 ${1300 - p * 380} 650`}
          fill="none"
          stroke={C.pink}
          strokeWidth="8"
        />
      </>
    );
  if (s === 2)
    return (
      <>
        <Sky f={f} color="#f3e7d7" />
        <g stroke="#bcaaa0" strokeWidth="3">
          <path d="M210 120 L210 830 M430 120 L430 830 M1490 120 L1490 830 M1710 120 L1710 830 M210 280 L1710 280 M210 550 L1710 550" />
          <path d="M70 860 L1850 860 L1510 590 L410 590Z" fill="#e6d2b9" />
        </g>
        <g opacity={0.8}>
          <Tree x={1600} y={680} s={1.1} f={f} pink />
          <Cloud x={1100} y={190} f={f} />
        </g>
        <path
          d="M420 865 Q700 550 990 735 T1680 430"
          {...line}
          stroke={C.pink}
          strokeWidth={8}
        />
        <Character
          x={750}
          y={835}
          scale={0.91}
          frame={f}
          mood={p > 0.45 ? "happy" : "wonder"}
          tilt={-5}
          pose="reach"
        />
        <Character
          girl
          x={1320 - 220 * ease(p)}
          y={835}
          scale={0.83}
          frame={f + 6}
          walk={p < 0.8}
          mood="happy"
          tilt={4}
        />
        <Petals f={f} count={20} />
        <g opacity={range(p, 0, 0.65)}>
          <Star x={970} y={315} r={24} />
          <Star x={1080} y={380} r={12} />
        </g>
      </>
    );
  if (s === 3)
    return (
      <>
        <Sky f={f} />
        <Sea f={f} />
        <g
          transform={`translate(${960 - 120 * ease(p)} ${460 - 90 * ease(p)}) scale(${1 + ease(p) * 0.24})`}
        >
          <path
            d="M-590 -200 Q-270 -440 0 -410 Q300 -415 600 -200 Q320 52 0 42 Q-310 45 -590 -200Z"
            fill="#fff4dc"
            stroke="#8f7c79"
            strokeWidth="8"
          />
          <path
            d="M-554 -200 Q0 -590 563 -200 Q0 181 -554 -200Z"
            fill="#aed2d8"
          />
          <circle cx="0" cy="-180" r="170" fill="#76a8bd" />
          <circle cx="-48" cy="-233" r="53" fill="#fff9dd" opacity=".8" />
          <path
            d="M-550 -182 Q-260 -140 0 -170 T555 -180"
            fill="none"
            stroke="#fbf3d5"
            strokeWidth="5"
          />
        </g>
        <Couple x={990} y={892} scale={0.73} frame={f} mood="wonder" hold />
        <Birds f={f} x={200} y={320} count={3} />
      </>
    );
  return (
    <>
      <Sky f={f} />
      <Sea f={f} />
      <Cloud x={400} y={340} s={1.9} f={f} />
      <g transform={`translate(${wave(f, 150) * 18} ${wave(f, 100) * 7})`}>
        <PaperBoat x={990} y={800} s={1.45} />
        <Couple x={990} y={800} scale={0.65} frame={f} mood="happy" hold />
        <path
          d="M613 785 L736 925 L1245 925 L1371 784 L990 850Z"
          fill="#fff5e4"
          stroke={C.ink}
          strokeWidth="4"
        />
      </g>
      <Birds f={f} x={220} y={460} count={4} />
      <Ribbon f={f} y={1000} />
    </>
  );
}

function Collect({ shot: s, f, p }: SceneProps) {
  if (s === 5) {
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <g opacity=".65">
          {Array.from({ length: 8 }, (_, i) => (
            <House
              key={i}
              x={i * 310 - ((f * 0.4) % 300)}
              y={660}
              s={0.65}
              pink={i % 2 === 0}
            />
          ))}
        </g>
        <path
          d="M0 888 Q950 800 1920 877 M0 910 Q950 822 1920 899"
          {...line}
          stroke="#957a73"
        />
        <g transform={`translate(${80 * wave(f, 400)} 0)`}>
          <path
            d="M480 808 L480 390 Q500 364 525 390 L1350 390 L1430 520 L1410 807Z"
            fill="#f4d6c4"
            stroke={C.ink}
            strokeWidth="5"
          />
          <path
            d="M500 391 L1350 391 L1425 518 L490 518Z"
            fill={C.pink}
            stroke={C.ink}
            strokeWidth="4"
          />
          <rect
            x="527"
            y="474"
            width="817"
            height="287"
            rx="14"
            fill="#c3d9d9"
            stroke={C.ink}
            strokeWidth="4"
          />
          <Couple x={928} y={815} scale={0.75} frame={f} mood="happy" />
          <path
            d="M475 723 L1418 723 L1418 810 L475 810Z"
            fill="#efc5b5"
            stroke={C.ink}
            strokeWidth="4"
          />
          {[600, 1280].map((x) => (
            <g key={x} transform={`translate(${x} 828) rotate(${f * 5})`}>
              <circle r="42" fill="#7f8090" stroke={C.ink} strokeWidth="4" />
              <path
                d="M-30 0 L30 0 M0 -30 L0 30"
                stroke="#f5e6ce"
                strokeWidth="4"
              />
            </g>
          ))}
          <path
            d="M940 583 L965 559 L990 583 L978 614 L950 614Z"
            fill="#e1ad77"
            stroke={C.ink}
            strokeWidth="3"
          />
        </g>
        <Cloud x={1450} y={217} s={1.6} f={f} />
      </>
    );
  }
  if (s === 6)
    return (
      <>
        <Sky f={f} color="#e6e4d9" />
        <Sea f={f} />
        <g transform={`translate(1090 740) rotate(${wave(f, 180) * 0.6} 0 0)`}>
          <path
            d="M-190 0 L-127 -522 L120 -522 L187 0Z"
            fill="#f2e8d9"
            stroke={C.ink}
            strokeWidth="5"
          />
          <path
            d="M-128 -522 L-169 -558 L159 -558 L121 -522Z"
            fill={C.pink}
            stroke={C.ink}
            strokeWidth="4"
          />
          <path
            d="M-170 -558 L0 -670 L160 -558Z"
            fill="#7c92a4"
            stroke={C.ink}
            strokeWidth="4"
          />
          <rect
            x="-85"
            y="-475"
            width="168"
            height="134"
            rx="46"
            fill="#f3d48e"
            stroke={C.ink}
            strokeWidth="4"
          />
          <path d="M-128 -332 L143 -332" stroke={C.pink} strokeWidth="44" />
          <Character x={-44} y={-110} scale={0.4} frame={f} mood="soft" />
          <Character girl x={61} y={-112} scale={0.38} frame={f} mood="happy" />
          <path d="M-133 -126 L138 -126" stroke="#fff3de" strokeWidth="30" />
          <path
            d="M-74 -415 L-650 -610 L-630 -250Z M72 -415 L640 -570 L625 -247Z"
            fill="#ffe4a0"
            stroke="none"
            opacity={0.14 + wave(f, 100) * 0.02}
          />
        </g>
        <Tree x={280} y={839} s={1.5} f={f} />
      </>
    );
  if (s === 7 || s === 8)
    return (
      <>
        <Sky f={f} color={s === 7 ? "#d4dce3" : "#f0e9dd"} />
        <Hills f={f} />
        <path
          d="M480 821 L1420 821 M560 774 L560 922 M1340 774 L1340 922"
          {...line}
          stroke="#a88d7c"
          strokeWidth="13"
        />
        <Couple
          x={960}
          y={807}
          scale={0.73}
          frame={f}
          mood={s === 7 ? "sad" : "soft"}
          hold
        />
        <Cloud
          x={960}
          y={335}
          s={2.45}
          f={f}
          color={s === 7 ? "#a6b0c0" : "#d9d6ce"}
        />
        {s === 7 ? (
          Array.from({ length: 20 }, (_, i) => (
            <path
              key={i}
              d={`M${740 + hash(i) * 430} ${410 + ((f * 3 + i * 23) % 260)} l-8 20`}
              stroke="#7f9fb7"
              strokeWidth="3"
            />
          ))
        ) : (
          <>
            <path
              d={`M960 222 L${960 + 130 * ease(p)} ${420 - 140 * ease(p)}`}
              stroke={C.pink}
              strokeWidth="9"
            />
            <g
              transform={`translate(${960 + 130 * ease(p)} ${420 - 140 * ease(p)}) rotate(-20)`}
            >
              <path
                d="M-13 -22 L13 -22 L13 16 L0 30 L-13 16Z"
                fill="#edba85"
                stroke={C.ink}
                strokeWidth="3"
              />
            </g>
            {Array.from({ length: 12 }, (_, i) => (
              <Star
                key={i}
                x={960 + (hash(i) - 0.5) * 700 * ease(p)}
                y={340 - hash(i + 50) * 240 * ease(p)}
                r={7 + hash(i + 8) * 12}
              />
            ))}
          </>
        )}
      </>
    );
  if (s === 9)
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <g transform={`translate(960 480) rotate(${wave(f, 180) * 2})`}>
          <path
            d="M-240 -205 L240 -205 L240 292 Q0 350 -240 292Z"
            fill="#d9e5de"
            fillOpacity=".5"
            stroke="#8b9c9c"
            strokeWidth="5"
          />
          <path
            d="M-264 -204 L264 -204 L264 -244 L-264 -244Z"
            fill="#d6b9a8"
            stroke={C.ink}
            strokeWidth="4"
          />
          <ellipse cy="292" rx="238" ry="36" fill="#d3ded5" opacity=".7" />
          {Array.from({ length: 13 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${Math.sin(i * 2.4 + f / 140) * 160} ${-90 + (i % 5) * 65 + wave(f, 100, i) * 14})`}
            >
              <circle
                r={16 + (i % 3) * 9}
                fill={[C.pink, C.blue, C.yellow][i % 3]}
                stroke="#8b8590"
                strokeWidth="2"
              />
              <ellipse
                rx={28 + (i % 3) * 10}
                ry="7"
                fill="none"
                stroke="#fff7df"
                strokeWidth="3"
                transform="rotate(-24)"
              />
            </g>
          ))}
        </g>
        <Character
          x={510}
          y={870}
          scale={0.72}
          frame={f}
          pose="reach"
          mood="happy"
        />
        <Character
          girl
          x={1410}
          y={870}
          scale={0.68}
          frame={f}
          pose="reach"
          mood="happy"
        />
        <Star
          x={lerp(520, 850, ease(p))}
          y={590 - 150 * Math.sin(p * Math.PI)}
          r={27}
        />
      </>
    );
  return (
    <>
      <Sky f={f} />
      <Hills f={f} />
      <Couple x={760} y={850} scale={0.77} frame={f} mood="soft" hold />
      <Birds f={f} x={1050 + ease(p) * 200} y={410 - ease(p) * 150} count={8} />
      <path
        d="M1050 720 Q1260 530 1670 240"
        stroke="#b6a69d"
        strokeDasharray="3 15"
        strokeWidth="3"
        fill="none"
      />
      <Petals f={f} count={19} />
    </>
  );
}

function Fireworks({ shot: s, f, p }: SceneProps) {
  if (s === 11)
    return (
      <>
        <Sky f={f} night />
        <Stars f={f} night />
        <g transform={`translate(950 510) rotate(${wave(f, 160) * 1.2})`}>
          <path
            d="M265 -280 Q-80 -320 -195 -60 Q-240 238 50 300 Q270 319 360 121 Q139 230 22 45 Q-79 -160 265 -280Z"
            fill="#f8ddb0"
            stroke="#d2b18a"
            strokeWidth="4"
          />
          <Couple x={80} y={120} scale={0.66} frame={f} mood="happy" />
          <Earphone x={79} y={-80} s={1.0} />
          <path
            d="M56 -80 Q-10 -20 40 75 T370 -55 Q530 -250 300 -350"
            {...line}
            stroke={C.pink}
            strokeWidth="6"
          />
        </g>
        <g transform={`rotate(${f * 0.1} 960 540)`}>
          <ellipse
            cx="960"
            cy="540"
            rx="780"
            ry="280"
            fill="none"
            stroke="#bbc5d7"
            strokeWidth="2"
            strokeDasharray="5 13"
          />
        </g>
      </>
    );
  if (s === 12 || s === 13)
    return (
      <>
        <Sky f={f} night />
        <Sea f={f} night />
        {Array.from({ length: s === 12 ? 6 : 9 }, (_, i) => {
          const phase = ((f + i * 17) % 93) / 93;
          const e = ease(phase);
          const xx = 260 + hash(i + 5) * 1390,
            yy = 130 + hash(i + 11) * 355;
          return (
            <g
              key={i}
              transform={`translate(${xx} ${yy})`}
              opacity={Math.sin(phase * Math.PI)}
            >
              {Array.from({ length: 12 }, (_, j) => {
                const a = (j * Math.PI) / 6;
                return s === 12 ? (
                  <path
                    key={j}
                    d={`M${Math.cos(a) * e * 25} ${Math.sin(a) * e * 25} Q${Math.cos(a + 0.25) * e * 125} ${Math.sin(a + 0.25) * e * 125} ${Math.cos(a) * e * 160} ${Math.sin(a) * e * 160}`}
                    stroke={[C.pink, C.yellow, C.blue][i % 3]}
                    strokeWidth={4 - (j % 2)}
                    fill="none"
                  />
                ) : (
                  <path
                    key={j}
                    d={`M0 0 Q${Math.cos(a) * 90} ${Math.sin(a) * 70} ${Math.cos(a) * e * 145} ${Math.sin(a) * e * 110}`}
                    fill="none"
                    stroke={[C.pink, C.blue, C.yellow][i % 3]}
                    strokeWidth="2"
                  />
                );
              })}
              <Star x={0} y={0} r={e * 20} fill={C.yellow} />
              {s === 13 && (
                <>
                  <path d="M-46 25 Q0 -49 46 25Z" fill="#d6b7d1" opacity=".6" />
                  {[0, 1, 2, 3, 4].map((k) => (
                    <path
                      key={k}
                      d={`M${-38 + k * 18} 25 Q${-80 + k * 24 + wave(f, 80, k) * 20} 90 ${-45 + k * 24} 155`}
                      stroke={C.pink}
                      strokeWidth="2"
                      fill="none"
                    />
                  ))}
                </>
              )}
            </g>
          );
        })}
        <path d="M0 920 Q800 850 1920 904 L1920 1080 L0 1080Z" fill="#8c7b8d" />
        <Couple x={990} y={940} scale={0.84} frame={f} mood="wonder" back />
        <Lamp x={1490} y={856} f={f} />
      </>
    );
  if (s === 14)
    return (
      <>
        <Sky f={f} night />
        <g
          transform={`translate(960 490) rotate(${lerp(-12, 4, ease(p))}) scale(${lerp(0.83, 1.3, ease(p))})`}
        >
          <Photo x={0} y={0} s={1.7}>
            <MiniMemory f={f} variant={1} />
          </Photo>
          <Star x={-272} y={-189} r={45} />
          <Star x={275} y={145} r={28} />
        </g>
        <Stars f={f} night />
      </>
    );
  return (
    <>
      <Sky f={f} night />
      <Stars f={f} night />
      <ellipse
        cx="960"
        cy="510"
        rx="705"
        ry="315"
        fill="none"
        stroke="#c4c3cc"
        strokeWidth="2"
      />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3 + f * 0.0025;
        return (
          <Photo
            key={i}
            x={960 + Math.cos(a) * 680}
            y={500 + Math.sin(a) * 290}
            s={
              0.6 + (Math.sin(a) + 1) * 0.15 + (i === 0 ? pulse(f) * 0.035 : 0)
            }
            rotate={Math.sin(a) * 10}
          >
            <MiniMemory f={f} variant={i} />
          </Photo>
        );
      })}
      <Couple x={960} y={810} scale={0.85} frame={f} mood="soft" hold />
      <Ribbon f={f} y={930} />
    </>
  );
}

export function Globe({ f }: { f: number }) {
  const t = clamp((f - 1144) / 89);
  const angle = 160 + t * 25;
  return (
    <>
      <rect width="1920" height="1080" fill="#f0e7dc" />
      <Stars f={f} n={25} />
      <circle cx="1670" cy="260" r="78" fill="#f5d38e" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <path
            key={i}
            d={`M${1670 + Math.cos(a) * 98} ${260 + Math.sin(a) * 98} l${Math.cos(a) * 25} ${Math.sin(a) * 25}`}
            stroke="#d2ab6e"
            strokeWidth="3"
          />
        );
      })}
      <defs>
        <clipPath id="world-circle">
          <circle cx="960" cy="530" r="252" />
        </clipPath>
        <clipPath id="night-half">
          <rect x="700" y="260" width="260" height="540" />
        </clipPath>
      </defs>
      <g clipPath="url(#world-circle)">
        <circle cx="960" cy="530" r="252" fill="#a9cbd5" />
        <g
          transform={`rotate(${-t * 11} 960 530)`}
          fill="#adc4a4"
          stroke="#8a9e8e"
          strokeWidth="2"
        >
          <path d="M732 390 L810 330 L899 343 L939 399 L879 435 L875 505 L826 529 L791 470 L738 465Z" />
          <path d="M832 539 L899 536 L931 581 L919 640 L882 705 L857 649 L856 600Z" />
          <path d="M1010 338 L1127 347 L1186 395 L1163 464 L1086 489 L1050 553 L989 512 L974 450 L1019 421Z" />
          <path d="M1076 617 L1152 611 L1196 662 L1158 693 L1094 674Z" />
        </g>
        <g stroke="#eef1e3" strokeWidth="2" fill="none" opacity=".55">
          <ellipse cx="960" cy="530" rx="138" ry="252" />
          <ellipse cx="960" cy="530" rx="48" ry="252" />
          <ellipse cx="960" cy="530" rx="250" ry="85" />
          <ellipse cx="960" cy="530" rx="250" ry="175" />
        </g>
        <circle
          cx="960"
          cy="530"
          r="253"
          fill="#263b60"
          opacity=".73"
          clipPath="url(#night-half)"
        />
        <path
          d="M960 276 L960 783"
          stroke="#f4dfb8"
          strokeWidth="2"
          strokeDasharray="7 9"
        />
      </g>
      <circle
        cx="960"
        cy="530"
        r="253"
        fill="none"
        stroke={C.ink}
        strokeWidth="4"
      />
      <ellipse
        cx="960"
        cy="530"
        rx="412"
        ry="308"
        transform="rotate(-13 960 530)"
        {...line}
        stroke="#bdaea1"
        strokeWidth="2"
        strokeDasharray="4 12"
      />
      {[false, true].map((girl) => {
        const a = ((angle + (girl ? 180 : 0)) * Math.PI) / 180;
        const xx = 960 + Math.cos(a) * 258,
          yy = 530 - Math.sin(a) * 258;
        return (
          <g
            key={String(girl)}
            transform={`translate(${xx} ${yy}) rotate(${90 - angle - (girl ? 180 : 0)})`}
          >
            <Character
              girl={girl}
              y={0}
              scale={girl ? 0.49 : 0.54}
              frame={f}
              walk
              mood="soft"
              turn="side"
              direction={-1}
            />
          </g>
        );
      })}
      <path
        d="M1080 232 Q990 199 905 218"
        {...line}
        stroke={C.pink}
        strokeWidth="4"
      />
      <path
        d="M922 204 L905 218 L928 227"
        {...line}
        stroke={C.pink}
        strokeWidth="4"
      />
      <circle cx="370" cy="260" r="29" fill="#e4d9c6" />
      <circle cx="382" cy="248" r="26" fill="#f0e7dc" />
      <Cloud x={1430} y={690} s={0.85} f={f} />
    </>
  );
}

function Room({ girl, f, p }: { girl: boolean; f: number; p: number }) {
  return (
    <g transform={`translate(${girl ? 960 : 0} 0)`}>
      <rect width="960" height="1080" fill={girl ? "#f3e2d1" : "#44506c"} />
      <path
        d="M0 845 L960 845 L960 1080 L0 1080Z"
        fill={girl ? "#dfc1ac" : "#60647c"}
      />
      <rect
        x="75"
        y="127"
        width="470"
        height="357"
        rx="110"
        fill={girl ? "#d7e4df" : "#293954"}
        stroke={girl ? "#ac9484" : "#a8a1a9"}
        strokeWidth="8"
      />
      {girl ? (
        <>
          <circle cx="401" cy="233" r="51" fill="#f5d795" />
          <Cloud x={235} y={345} s={0.7} f={f} />
        </>
      ) : (
        <>
          <circle cx="205" cy="222" r="34" fill="#eee2bd" />
          <circle cx="219" cy="209" r="33" fill="#293954" />
          {Array.from({ length: 9 }, (_, i) => (
            <Star
              key={i}
              x={123 + hash(i) * 360}
              y={167 + hash(i + 2) * 250}
              r={6}
              fill="#efe1b7"
            />
          ))}
        </>
      )}
      <path
        d="M80 500 L549 500 M310 133 L310 485"
        stroke={girl ? "#ac9484" : "#a8a1a9"}
        strokeWidth="8"
      />
      <path
        d="M56 844 L350 844 L350 688 Q177 616 56 688Z"
        fill={girl ? "#d0b5ba" : "#727d98"}
        stroke={C.ink}
        strokeWidth="4"
      />
      <path
        d="M650 825 L650 543 M611 546 L690 546 L666 495 L631 495Z"
        fill="#f3d99f"
        stroke={C.ink}
        strokeWidth="4"
      />
      <path d="M650 547 L580 818 L747 818Z" fill="#f4d797" opacity=".10" />
      <Character
        girl={girl}
        x={488}
        y={904}
        scale={girl ? 0.9 : 1}
        frame={f}
        mood="soft"
        pose="phone"
        tilt={girl ? -6 : 6}
      />
      <g
        transform={`translate(${girl ? 165 : 640} ${500 + wave(f, 110) * 5})`}
        opacity={range(p, girl ? 0.18 : 0, girl ? 0.5 : 0.3)}
      >
        <path
          d="M-100 -52 L105 -52 Q125 -52 125 -30 L125 35 Q125 55 103 55 L-60 55 L-88 78 L-82 55 L-100 55 Q-120 55 -120 32 L-120 -31 Q-120 -52 -100 -52Z"
          fill={girl ? "#fff5e8" : "#a8c7d0"}
          stroke={C.ink}
          strokeWidth="3"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={-28 + i * 28}
            cy={0}
            r={5}
            fill={C.ink}
            opacity={0.3 + (wave(f, 43, i) + 1) * 0.25}
          />
        ))}
      </g>
    </g>
  );
}
function TimeWorld({ shot: s, f, p }: SceneProps) {
  if (s === 16 || s === 17) return <Globe f={f} />;
  if (s === 18)
    return (
      <>
        <Room girl={false} f={f} p={p} />
        <Room girl f={f} p={p} />
        <path
          d="M960 0 Q943 300 968 540 T960 1080"
          stroke="#fff3e1"
          strokeWidth="11"
          fill="none"
        />
      </>
    );
  if (s === 19)
    return (
      <>
        <Sky f={f} night />
        <Hills f={f} night />
        <Character
          x={525}
          y={900}
          scale={1}
          frame={f}
          mood="sad"
          pose="reach"
        />
        <path
          d="M660 636 Q900 292 1490 460"
          {...line}
          stroke="#b7c6d4"
          strokeDasharray="4 12"
        />
        <g
          transform={`translate(${lerp(660, 1450, ease(p))} ${636 - 260 * Math.sin(p * Math.PI * 0.75)}) rotate(${-12 + ease(p) * 22})`}
          {...line}
        >
          <path d="M-60 -27 L65 0 L-10 42 L-2 8Z" fill="#f9edd8" />
          <path d="M-60 -27 L-2 8 L65 0 M-2 8 L-10 42" fill="none" />
        </g>
        <Lamp x={631} y={680} s={0.5} f={f} />
        <Cloud x={1370} y={305} s={1.4} f={f} color="#728399" />
      </>
    );
  if (s === 20)
    return (
      <>
        <Sky f={f} night />
        <Hills f={f} night />
        <Character
          x={810}
          y={910}
          scale={1.08}
          frame={f}
          mood="sad"
          pose="reach"
        />
        <circle
          cx={lerp(900, 1390, ease(p))}
          cy={lerp(660, 315, ease(p))}
          r={47}
          fill="#f8d78f"
        />
        <path
          d={`M900 660 Q1160 710 ${lerp(900, 1390, ease(p))} ${lerp(660, 315, ease(p))}`}
          fill="none"
          stroke={C.pink}
          strokeWidth="4"
          opacity=".6"
        />
        <Tree x={1520} y={870} s={1.5} f={f} />
        <path
          d="M270 908 Q660 830 1145 925"
          {...line}
          stroke="#aaa7ad"
          strokeWidth="3"
        />
      </>
    );
  if (s === 21)
    return (
      <>
        <Sky f={f} night />
        <Hills f={f} night />
        <Character
          x={650}
          y={900}
          scale={0.95}
          frame={f}
          mood={p > 0.4 ? "soft" : "sad"}
          pose="look"
        />
        <Character
          girl
          x={1370}
          y={900}
          scale={0.86}
          frame={f}
          mood="soft"
          pose="look"
        />
        <Lamp x={713} y={696} s={0.9} f={f} />
        <Lamp x={1318} y={705} s={0.9} f={f} />
        <path
          d="M560 712 Q714 588 801 711 M1250 711 Q1340 594 1465 720"
          fill="none"
          stroke="#f4dfb4"
          strokeWidth="5"
          opacity=".6"
        />
        <Stars f={f} night n={25} />
      </>
    );
  return (
    <>
      <rect width="1920" height="1080" fill={C.paper} />
      <g
        transform={`translate(960 440) rotate(${-10 + ease(p) * 15}) scale(${lerp(1.5, 0.8, ease(p))})`}
        stroke={C.ink}
        strokeWidth="3"
      >
        <path d="M-490 -210 L490 -210 L490 210 L-490 210Z" fill="#e7d1b3" />
        <path d="M-325 -210 L-325 210" strokeDasharray="7 13" />
        <rect x="-270" y="-140" width="230" height="270" fill="#fff3dc" />
        <circle cx="-153" cy="-10" r="86" fill="#a9cbd5" />
        <path
          d="M-239 -10 A86 86 0 0 1 -153 -96 L-153 76 A86 86 0 0 1 -239 -10Z"
          fill="#4b607f"
        />
        <path
          d="M35 -105 L376 -105 M35 -35 L326 -35 M35 35 L287 35 M35 105 L347 105"
          stroke="#a78f7c"
          opacity=".6"
        />
      </g>
      <path
        d={`M-100 930 Q${650 + ease(p) * 500} 840 2070 910 M-100 955 Q${650 + ease(p) * 500} 865 2070 935`}
        {...line}
        stroke="#9b8581"
        strokeWidth="5"
      />
      <Birds f={f} x={300} y={220} />
    </>
  );
}

function Whale({ f, p }: { f: number; p: number }) {
  return (
    <>
      <Sky f={f} color="#eee3df" />
      <Cloud x={340} y={740} s={2.9} f={f} />
      <Cloud x={1610} y={700} s={2.6} f={f} />
      <g
        transform={`translate(${900 + wave(f, 230) * 23} ${600 + wave(f, 140) * 20}) rotate(${wave(f, 170) * 1.7})`}
        stroke={C.ink}
        strokeWidth="4"
      >
        <path
          d={`M-480 -130 Q-635 -66 -484 92 Q-182 254 237 104 Q382 59 418 -75 Q470 -47 528 ${-80 + wave(f, 50) * 17} Q547 -187 477 -210 Q443 -167 407 -159 Q218 -300 -122 -220 Q-335 -216 -480 -130Z`}
          fill="#a7cbd4"
        />
        <path
          d="M-465 53 Q-113 213 238 68 Q114 166 -119 175 Q-342 147 -465 53Z"
          fill="#e5eee3"
          stroke="none"
        />
        <path d="M-76 36 Q-53 112 46 149 Q40 58 -76 36Z" fill="#88b1c2" />
        <path d="M-428 -51 Q-414 -75 -399 -51" fill="none" strokeWidth="6" />
        <path d="M-470 -7 Q-440 6 -419 -7" fill="none" strokeWidth="3" />
        <path
          d="M-283 -209 Q-321 -274 -263 -287 M-273 -206 Q-231 -258 -207 -244"
          fill="none"
          stroke={C.blue}
          strokeWidth="4"
        />
        <Couple x={-50} y={-180} scale={0.64} frame={f} mood="happy" hold />
        {[0, 1, 2].map((i) => (
          <Photo
            key={i}
            x={-210 + i * 225}
            y={-25 + wave(f, 130, i) * 10}
            s={0.35}
            rotate={-10 + i * 10 + (i === 0 ? pulse(f) * 3 : 0)}
          >
            <MiniMemory f={f} variant={i} />
          </Photo>
        ))}
      </g>
      <Birds f={f} x={1400} y={300} count={3} />
      <Ribbon f={f} y={1000} />
      <Star x={1650} y={340 + wave(f, 130) * 12} r={28 + ease(p) * 5} />
    </>
  );
}

function Memories({ shot: s, f, p }: SceneProps) {
  if (s === 23)
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <path
          d="M0 893 Q800 774 1920 858 M0 919 Q800 800 1920 884"
          {...line}
          stroke="#9d8a7c"
          strokeWidth="5"
        />
        <g transform={`translate(${-60 * ease(p)} 0)`}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${120 + i * 550} 0)`}>
              <rect
                x="0"
                y="400"
                width="510"
                height="408"
                rx="40"
                fill={i % 2 ? "#c8d9d8" : "#efc8c5"}
                stroke={C.ink}
                strokeWidth="4"
              />
              <Photo x={255} y={577} s={1.1}>
                <MiniMemory f={f} variant={i} />
              </Photo>
              <path d="M14 736 L495 736" stroke="#a59081" strokeWidth="4" />
              {[80, 420].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy="840"
                  r="44"
                  fill="#6b7283"
                  stroke={C.ink}
                  strokeWidth="4"
                />
              ))}
              <path d="M510 783 L551 783" stroke={C.ink} strokeWidth="5" />
            </g>
          ))}
        </g>
        <Cloud x={1450} y={250} s={2} f={f} />
      </>
    );
  if (s === 24) return <Whale f={f} p={p} />;
  if (s === 25)
    return (
      <>
        <Sky f={f} color="#eddfdf" />
        <Cloud x={360} y={750} s={3} f={f} />
        <Cloud x={1570} y={800} s={2.5} f={f} />
        <g transform={`rotate(${wave(f, 160) * 8} 960 90)`}>
          <path
            d="M680 65 L680 734 M1240 65 L1240 734"
            stroke="#af8a91"
            strokeWidth="8"
          />
          <Couple x={958} y={735} scale={0.85} frame={f} mood="happy" hold />
          <path
            d="M627 738 Q958 760 1296 738 L1289 767 L630 767Z"
            fill="#c5a697"
            stroke={C.ink}
            strokeWidth="4"
          />
          <path
            d="M681 132 Q954 194 1237 132"
            {...line}
            stroke="#bcb4bf"
            strokeDasharray="3 15"
          />
        </g>
        <Birds f={f} x={200} y={280} count={3} />
        <Petals f={f} count={18} />
      </>
    );
  if (s === 26)
    return (
      <>
        <Sky f={f} />
        <Cloud x={380} y={970} s={3.4} f={f} />
        <Cloud x={1550} y={1000} s={3.6} f={f} />
        <path
          d="M80 867 Q950 428 1830 813"
          {...line}
          stroke="#f9edda"
          strokeWidth="66"
        />
        <path
          d="M80 888 Q950 449 1830 834"
          {...line}
          stroke="#b6a49a"
          strokeWidth="4"
        />
        <g transform="rotate(-6 960 650)">
          <Couple
            x={1000 + ease(p) * 100}
            y={647}
            scale={0.73}
            frame={f}
            walk
            hold
            mood="happy"
          />
        </g>
        <g
          transform={`translate(${lerp(1430, 1780, ease(p))} ${lerp(701, 820, ease(p))}) rotate(22)`}
        >
          <path
            d="M-210 -16 L100 -16 L148 0 L100 16 L-210 16Z"
            fill="#e6be8f"
            stroke={C.ink}
            strokeWidth="3"
          />
          <path d="M100 -16 L148 0 L100 16Z" fill="#e8d6b8" />
          <path d="M138 -4 L148 0 L138 4Z" fill={C.ink} />
        </g>
        <Star x={450} y={280} r={32} />
      </>
    );
  if (s === 27)
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <path
          d="M0 862 Q900 795 1920 850"
          {...line}
          stroke={C.pink}
          strokeWidth="9"
        />
        {Array.from({ length: 8 }, (_, i) => (
          <g
            key={i}
            opacity={range(p, i * 0.06, i * 0.06 + 0.4)}
            transform={`translate(0 ${90 * (1 - range(p, i * 0.06, i * 0.06 + 0.4))})`}
          >
            <House
              x={170 + i * 230}
              y={722 + (i % 2) * 52}
              s={0.75 + (i % 3) * 0.12}
              pink={i % 2 === 1}
            />
          </g>
        ))}
        <Couple x={960} y={908} scale={0.71} frame={f} walk hold mood="happy" />
        <Birds f={f} x={1320} y={210} />
        <Petals f={f} />
      </>
    );
  if (s === 28)
    return (
      <>
        <Sky f={f} color="#f6e8d4" />
        <Sea f={f} />
        <rect y="790" width="1920" height="290" fill="#e6ceb0" />
        <g fill="#d3b6a5" stroke="#a18a7c" strokeWidth="4">
          <path d="M605 940 L605 740 Q700 700 795 740 L795 940Z" />
          <path d="M1135 940 L1135 740 Q1230 700 1325 740 L1325 940Z" />
        </g>
        <g stroke="#c7ab8c" strokeWidth="13">
          <path d="M170 130 L1750 130 L1750 790 L170 790Z" fill="none" />
          <path d="M960 130 L960 790 M170 510 L1750 510" />
        </g>
        <Character
          x={700}
          y={953}
          scale={1.06}
          frame={f}
          pose="sit"
          mood="happy"
        />
        <Character
          girl
          x={1230}
          y={953}
          scale={0.95}
          frame={f}
          pose="sit"
          mood="happy"
        />
        <path
          d="M430 760 Q960 691 1490 760 L1460 817 L460 817Z"
          fill="#d6b595"
          stroke={C.ink}
          strokeWidth="4"
        />
        <path
          d="M530 813 L510 1060 M1390 813 L1410 1060"
          stroke="#ab8b72"
          strokeWidth="20"
        />
        {[815, 1115].map((x) => (
          <g key={x} transform={`translate(${x} 723)`} {...line}>
            <path d="M-35 -25 L30 -25 L24 25 L-28 25Z" fill="#fff4df" />
            <path d="M31 -20 Q65 -19 50 4 L29 8" fill="none" />
            <path
              d={`M0 -40 Q${wave(f, 70) * 15} -62 4 -83`}
              fill="none"
              stroke="#e0bda5"
              strokeWidth="2"
            />
          </g>
        ))}
        <Cloud x={1430} y={290} s={1.3} f={f} />
      </>
    );
  if (s === 29)
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <Ribbon f={f} y={690} />
        {Array.from({ length: 13 }, (_, i) => {
          const xx = ((i * 190 - f * 0.7) % 2400) - 140;
          return (
            <g
              key={i}
              transform={`translate(${xx} ${790 + Math.sin(i * 1.7) * 45})`}
              fill={i % 2 ? "#bdc9c7" : "#d8bbba"}
              opacity=".7"
            >
              <circle cy="-145" r="30" />
              <path d="M-26 -110 Q0 -128 26 -110 L40 -25 L-40 -25Z" />
              <path
                d="M-13 -26 L-21 20 M13 -26 L21 20"
                stroke={i % 2 ? "#bdc9c7" : "#d8bbba"}
                strokeWidth="14"
              />
            </g>
          );
        })}
        <Couple x={960} y={898} scale={0.84} frame={f} walk hold mood="happy" />
        <Petals f={f} />
      </>
    );
  // The dream is physically folded back onto paper. The city, couple and ribbon remain one drawing.
  return (
    <>
      <rect width="1920" height="1080" fill="#eee2d0" />
      <g
        transform={`translate(960 490) rotate(${lerp(0, -7, ease(p))}) scale(1 ${1 - ease(p) * 0.46}) translate(-960 -490)`}
      >
        <rect
          x="245"
          y="85"
          width="1430"
          height="840"
          fill="#fbf3e2"
          stroke="#bba18b"
          strokeWidth="4"
        />
        <g opacity={1 - ease(p) * 0.25}>
          <path
            d="M270 650 Q920 400 1640 650 L1640 900 L270 900Z"
            fill="#c8d4bc"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <House
              key={i}
              x={430 + i * 215}
              y={690 + (i % 2) * 35}
              s={0.71}
              pink={i % 2 === 1}
            />
          ))}
          <Ribbon f={f} y={750} />
          <Couple x={960} y={830} scale={0.75} frame={f} mood="soft" hold />
        </g>
        <path
          d={`M${1675 - ease(p) * 270} 85 L1675 85 L1675 925 L${1675 - ease(p) * 270} 925 Q${1430 - ease(p) * 90} 500 ${1675 - ease(p) * 270} 85Z`}
          fill="#ead9c0"
          stroke="#bda58e"
          strokeWidth="3"
          opacity={ease(p)}
        />
      </g>
      <path
        d={`M1760 1080 Q1630 867 1580 ${850 - ease(p) * 195} Q1550 ${810 - ease(p) * 195} 1520 ${845 - ease(p) * 195} L1480 ${950 - ease(p) * 80} Q1440 1010 1470 1080Z`}
        fill="#ffe1c5"
        stroke={C.ink}
        strokeWidth="5"
      />
    </>
  );
}

function Goodbye({ shot: s, f, p }: SceneProps) {
  if (s === 31)
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <Tree x={1030} y={797} s={1.9} f={f} pink />
        <Character
          x={730}
          y={900}
          scale={0.82}
          frame={f}
          mood="soft"
          tilt={-4}
        />
        <Character
          girl
          x={1230}
          y={900}
          scale={0.75}
          frame={f}
          mood="soft"
          tilt={5}
        />
        <Lamp x={980} y={725} f={f} />
        <Petals f={f} count={18} />
      </>
    );
  if (s === 32)
    return (
      <>
        <rect width="1920" height="1080" fill="#f4e6d0" />
        <path
          d="M300 165 Q620 100 960 172 Q1285 106 1615 165 L1630 880 Q1290 808 960 879 Q618 806 287 880Z"
          fill="#fff8e8"
          stroke="#bea88f"
          strokeWidth="4"
        />
        <path d="M960 172 L960 879" stroke="#cdb99f" strokeWidth="3" />
        <g
          transform={`translate(${lerp(1390, 700, ease(p))} ${lerp(130, 450, ease(p))}) rotate(${lerp(30, -8, ease(p))})`}
        >
          <Photo x={0} y={0} s={1.05}>
            <MiniMemory f={f} />
          </Photo>
        </g>
        <path
          d={`M1080 600 Q1240 ${740 - 150 * ease(p)} 1510 620`}
          fill="none"
          stroke={C.blue}
          strokeWidth={8 + ease(p) * 55}
          opacity=".6"
        />
        <Star x={1330} y={380} r={24} />
      </>
    );
  if (s === 33)
    return (
      <>
        <Sky f={f} night />
        <Hills f={f} night />
        <House x={440} y={787} s={1.78} />
        <House x={1475} y={787} s={1.78} pink />
        <Character x={650} y={900} scale={0.68} frame={f} mood="soft" />
        <Character girl x={1260} y={900} scale={0.64} frame={f} mood="soft" />
        <path
          d={`M650 710 Q800 610 960 670 C${1070 - p * 20} ${780 - p * 120} ${850 + p * 80} ${760 - p * 130} 965 668 Q1120 607 1260 715`}
          fill="none"
          stroke={C.pink}
          strokeWidth="8"
        />
        <Lamp x={440} y={575} s={0.45} f={f} />
        <Lamp x={1475} y={575} s={0.45} f={f} />
      </>
    );
  if (s === 34)
    return (
      <>
        <Sky f={f} />
        <Sea f={f} />
        <path
          d="M250 837 Q960 370 1675 837"
          fill="none"
          stroke="#d6bda6"
          strokeWidth="57"
        />
        <path
          d="M250 807 Q960 340 1675 807"
          fill="none"
          stroke="#f8edda"
          strokeWidth="6"
        />
        <Character
          x={790 - 70 * ease(p)}
          y={615 + 35 * ease(p)}
          scale={0.72}
          frame={f}
          mood="soft"
          pose="reach"
        />
        <Character
          girl
          x={1140 + 70 * ease(p)}
          y={615 + 35 * ease(p)}
          scale={0.66}
          frame={f}
          mood="soft"
          pose="reach"
        />
        <path
          d="M270 791 Q950 280 1645 791"
          fill="none"
          stroke={C.pink}
          strokeWidth="5"
        />
        <Birds f={f} x={1300} y={220} count={3} />
      </>
    );
  if (s === 35)
    return (
      <>
        <rect width="1920" height="1080" fill="#f1e7da" />
        <g
          transform="translate(960 600) rotate(-6)"
          stroke={C.ink}
          strokeWidth="3"
        >
          <path
            d="M-440 -80 L0 -344 L440 -80 L440 300 L-440 300Z"
            fill="#e2c7b2"
          />
          <path
            d="M-440 -80 L0 176 L440 -80 L440 300 L-440 300Z"
            fill="#f3ddc2"
          />
          <path d="M-440 300 L-100 83 M440 300 L110 82" fill="none" />
        </g>
        {[0, 1, 2].map((i) => (
          <Photo
            key={i}
            x={lerp(400 + i * 550, 860 + i * 90, ease(p))}
            y={lerp(200, 510 + i * 20, ease(p))}
            s={lerp(0.63, 0.38, ease(p))}
            rotate={lerp(-20 + i * 23, 6, ease(p))}
          >
            <MiniMemory f={f} variant={i} />
          </Photo>
        ))}
        <Petals f={f} count={10} />
      </>
    );
  if (s === 36)
    return (
      <>
        <rect width="1920" height="1080" fill="#e7d6c3" />
        <path
          d="M160 160 Q560 70 960 161 Q1360 70 1760 160 L1760 900 Q1360 810 960 901 Q560 810 160 900Z"
          fill="#fff8e8"
          stroke="#ad927b"
          strokeWidth="5"
        />
        <path d="M960 160 L960 900" stroke="#c6b198" strokeWidth="3" />
        <Photo x={560} y={470} s={1.3} rotate={-5}>
          <MiniMemory f={f} />
        </Photo>
        <path
          d="M1160 395 Q1370 330 1590 392 M1160 460 L1480 446 M1160 535 L1550 523"
          fill="none"
          stroke="#d8c8af"
          strokeWidth="2"
          opacity=".55"
        />
        <path
          d="M1640 840 L1640 265 L1666 230 L1694 265 L1694 840Z"
          fill="#b8c8d0"
          stroke={C.ink}
          strokeWidth="3"
        />
        <path d="M1640 265 L1666 230 L1694 265Z" fill="#eadbc5" />
        <Star x={1420} y={670} r={22} />
      </>
    );
  if (s === 37)
    return (
      <>
        <Sky f={f} />
        <Hills f={f} />
        <Tree x={960} y={810} s={1.6} f={f} pink />
        <path
          d="M820 1080 Q970 800 950 760 Q690 780 130 1080 M950 760 Q1220 800 1800 1080"
          fill="none"
          stroke="#f4e6ce"
          strokeWidth="90"
        />
        <Character
          x={680 - 50 * ease(p)}
          y={890}
          scale={0.93}
          frame={f}
          mood="happy"
          pose="wave"
          tilt={-4}
        />
        <Character
          girl
          x={1260 + 50 * ease(p)}
          y={890}
          scale={0.84}
          frame={f + 6}
          mood="happy"
          pose="wave"
          tilt={4}
        />
        <Petals f={f} count={22} />
      </>
    );
  // All previous worlds become pieces of one intact photograph. Complete by 77.7s.
  const assemble = range(f, 2289, 2331);
  const end = s === 39;
  return (
    <>
      <rect width="1920" height="1080" fill="#e8d6c2" />
      <path
        d="M225 100 Q590 35 960 120 Q1325 35 1690 100 L1707 963 Q1310 889 960 968 Q590 889 210 963Z"
        fill="#fff7e8"
        stroke="#bda28b"
        strokeWidth="4"
      />
      <path d="M960 120 L960 968" stroke="#d1bca1" strokeWidth="2" />
      <g transform={`translate(960 460) rotate(-4)`}>
        <rect
          x="-412"
          y="-300"
          width="824"
          height="665"
          fill="#fffdf2"
          stroke="#bfa48f"
          strokeWidth="3"
        />
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 4,
            row = Math.floor(i / 4);
          const ox = (hash(i + 5) - 0.5) * 1400 * (1 - assemble),
            oy = (hash(i + 91) - 0.5) * 850 * (1 - assemble);
          return (
            <svg
              key={i}
              x={-380 + col * 190 + ox}
              y={-270 + row * 163 + oy}
              width="190.5"
              height="163.5"
              viewBox={`${col * 190} ${row * 163} 190 163`}
              overflow="hidden"
            >
              <rect width="760" height="489" fill="#bdd7db" />
              <circle cx="584" cy="101" r="57" fill="#f6d696" />
              <Cloud x={179} y={125} s={0.6} f={f} />
              <path
                d="M0 382 Q290 262 760 367 L760 490 L0 490Z"
                fill="#aec6af"
              />
              <Tree x={600} y={419} s={0.72} f={f} pink />
              <Couple
                x={357}
                y={470}
                scale={0.85}
                frame={end ? 2332 : f}
                mood="happy"
                hold
              />
            </svg>
          );
        })}
        <path
          d="M-170 317 Q0 297 170 314"
          fill="none"
          stroke="#d0b6a0"
          strokeWidth="3"
        />
        <path
          d="M-63 -323 L87 -320 L83 -271 L-68 -275Z"
          fill="#e0c7a5"
          opacity=".7"
        />
      </g>
      <Star x={1460} y={823} r={21} rotate={14} />
      <path
        d="M360 853 Q421 798 497 833"
        fill="none"
        stroke={C.pink}
        strokeWidth="5"
      />
      {!end && <Petals f={f} count={8} />}
      <text
        x="960"
        y="910"
        textAnchor="middle"
        fontFamily="STKaiti,KaiTi,serif"
        fontSize="43"
        fill="#8a7165"
        opacity={end ? 1 : range(f, 2325, 2349)}
      >
        把回忆拼好给你
      </text>
    </>
  );
}

export function SceneArt({ shot, f, p }: SceneProps) {
  if (shot < 5) return <Opening shot={shot} f={f} p={p} />;
  if (shot < 11) return <Collect shot={shot} f={f} p={p} />;
  if (shot < 16) return <Fireworks shot={shot} f={f} p={p} />;
  if (shot < 23) return <TimeWorld shot={shot} f={f} p={p} />;
  if (shot < 31) return <Memories shot={shot} f={f} p={p} />;
  return <Goodbye shot={shot} f={f} p={p} />;
}

export { Frame };
