import type { ReactNode } from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  CanvasImage,
  Interactive,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import shots from "./data/shots.json";
import captions from "./data/captions.json";
import envelope from "./data/envelope.json";
import { SceneArt, Frame } from "./Worlds";
import { RigSheet } from "./Character";
import { C } from "./Art";
import { clamp, ease, kf, range } from "./motion";

const flips = [408, 774, 1144, 1563, 1949];
const maskOrigins = [
  [1030, 690],
  [1300, 650],
  [980, 400],
  [960, 460],
  [980, 746],
  [1420, 650],
  [1090, 400],
  [960, 335],
  [1100, 280],
  [960, 430],
  [1420, 410],
  [1020, 450],
  [960, 200],
  [960, 490],
  [960, 490],
  [960, 510],
  [960, 530],
  [960, 530],
  [960, 530],
  [1440, 430],
  [1000, 620],
  [710, 690],
  [960, 440],
  [1610, 580],
  [1300, 450],
  [1210, 740],
  [1580, 730],
  [1430, 510],
  [960, 510],
  [1670, 650],
  [1500, 510],
  [980, 725],
  [1380, 620],
  [960, 670],
  [960, 690],
  [960, 510],
  [960, 430],
  [960, 710],
  [960, 460],
  [960, 460],
];
const maskTypes = [
  "drop",
  "door",
  "eye",
  "wave",
  "ribbon",
  "window",
  "circle",
  "cloud",
  "circle",
  "leaf",
  "ribbon",
  "circle",
  "circle",
  "star",
  "circle",
  "circle",
  "none",
  "none",
  "circle",
  "ribbon",
  "circle",
  "circle",
  "window",
  "window",
  "cloud",
  "cloud",
  "ribbon",
  "window",
  "window",
  "ribbon",
  "fold",
  "leaf",
  "leaf",
  "ribbon",
  "ribbon",
  "window",
  "window",
  "ribbon",
  "circle",
  "none",
];

const SceneInner = ({
  shot = 0,
  offset = 0,
}: {
  shot?: number;
  offset?: number;
}) => {
  const local = useCurrentFrame();
  const f = offset + local;
  const data = shots[shot],
    duration = data.endFrameExclusive - data.startFrame;
  const p = clamp((f - data.startFrame) / Math.max(1, duration - 1));
  const previous = shots[Math.max(0, shot - 1)];
  const pprev = clamp(
    (f - previous.startFrame) /
      (previous.endFrameExclusive - previous.startFrame),
  );
  const page = flips.includes(data.startFrame);
  const keep = shot === 0 || maskTypes[shot] === "none" || page;
  const entering = !keep && local < 16;
  const e = ease(local / 15);
  const [ox, oy] = maskOrigins[shot];
  const type = maskTypes[shot];
  return (
    <Frame f={f} night={shot >= 11 && shot <= 15}>
      <defs>
        <clipPath id={`scene-mask-${shot}`}>
          {type === "window" || type === "door" ? (
            <rect
              x={ox - 2200 * e}
              y={oy - 1400 * e}
              width={4400 * e}
              height={2800 * e}
              rx={type === "door" ? 0 : 160 * e}
            />
          ) : type === "ribbon" || type === "wave" ? (
            <path
              d={`M${1920 - 2300 * e} -100 Q${1550 - 2300 * e} 260 ${1920 - 2300 * e} 540 T${1920 - 2300 * e} 1200 L2400 1200 L2400 -100Z`}
            />
          ) : type === "leaf" ? (
            <ellipse
              cx={ox}
              cy={oy}
              rx={2200 * e}
              ry={1500 * e}
              transform={`rotate(-26 ${ox} ${oy})`}
            />
          ) : (
            <circle cx={ox} cy={oy} r={2350 * e} />
          )}
        </clipPath>
      </defs>
      {entering && (
        <Camera shot={shot - 1} p={pprev}>
          <SceneArt shot={shot - 1} f={f} p={pprev} />
        </Camera>
      )}
      <g clipPath={entering ? `url(#scene-mask-${shot})` : undefined}>
        <Camera shot={shot} p={p}>
          <SceneArt shot={shot} f={f} p={p} />
        </Camera>
      </g>
    </Frame>
  );
};
const cameraPlans = [
  [1, 1.08, 920, 710, 0, -10],
  [1.04, 1.08, 900, 650, -15, 8],
  [1, 1.09, 960, 610, 20, -10],
  [1, 1.05, 960, 500, 0, -10],
  [1, 1.04, 990, 690, 10, -10],
  [1.03, 1.06, 960, 600, 18, -18],
  [1, 1.07, 1090, 530, 0, 0],
  [1.06, 1.1, 960, 650, 0, 0],
  [1.1, 1.02, 960, 520, 0, 0],
  [1, 1.07, 960, 520, 0, -5],
  [1.04, 1.01, 1000, 550, 0, -20],
  [1, 1.06, 960, 500, 0, 0],
  [1, 1.03, 960, 430, 0, 0],
  [1.03, 1.06, 960, 470, -10, 10],
  [1, 1.02, 960, 490, 0, 0],
  [1, 1.035, 960, 520, 0, 0],
  [1, 1, 960, 530, 0, 0],
  [1, 1, 960, 530, 0, 0],
  [1, 1, 960, 540, 0, 0],
  [1, 1.065, 900, 600, 0, -15],
  [1, 1.05, 900, 600, 0, 0],
  [1.035, 1, 960, 620, 0, 0],
  [1, 1.04, 960, 480, 0, 0],
  [1.02, 1.035, 960, 600, 16, -16],
  [1, 1.05, 960, 530, 10, -10],
  [1.02, 1.05, 960, 530, 0, 0],
  [1, 1.045, 960, 580, 16, -16],
  [1, 1.05, 960, 650, 0, -10],
  [1, 1.035, 960, 700, 0, 0],
  [1.04, 1.06, 960, 680, 16, -16],
  [1, 1, 960, 500, 0, 0],
  [1, 1.04, 960, 650, 0, 0],
  [1, 1.035, 960, 490, 0, 0],
  [1, 1.03, 960, 610, 0, 0],
  [1, 1.04, 960, 600, 0, 0],
  [1, 1.035, 960, 500, 0, 0],
  [1, 1.02, 960, 500, 0, 0],
  [1.03, 1, 960, 650, 0, 0],
  [1, 1.02, 960, 460, 0, 0],
  [1.02, 1.02, 960, 460, 0, 0],
];
function Camera({
  shot,
  p,
  children,
}: {
  shot: number;
  p: number;
  children: ReactNode;
}) {
  const [a, b, cx, cy, tx0, tx1] = cameraPlans[shot];
  const z = a + (b - a) * ease(p),
    tx = tx0 + (tx1 - tx0) * ease(p);
  return (
    <g
      transform={`translate(${cx + tx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`}
    >
      {children}
    </g>
  );
}
export const Scene = Interactive.create({
  Component: SceneInner,
  layout: "absolute-fill",
  schema: {
    shot: { type: "number", default: 0, hiddenFromList: false },
    offset: { type: "number", default: 0, hiddenFromList: false },
  },
});

function PageTurn() {
  const f = useCurrentFrame();
  const boundary = flips.find((v) => f >= v - 8 && f < v + 8);
  if (boundary === undefined) return null;
  const q = clamp((f - boundary + 8) / 16);
  const cover = Math.sin(q * Math.PI);
  const x = 1920 - 3840 * q;
  return (
    <svg
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="page-shadow">
          <stop stopColor="#9b8067" stopOpacity=".02" />
          <stop offset=".8" stopColor="#80634b" stopOpacity=".17" />
          <stop offset="1" stopColor="#fff8e8" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <rect
        width="1920"
        height="1080"
        fill="#fff6e5"
        opacity={Math.pow(cover, 5)}
      />
      <path
        d={`M${x} -30 Q${x - 220 * cover} 500 ${x} 1110 L${x + 1960} 1110 Q${x + 1700} 500 ${x + 1960} -30Z`}
        fill="#fcf1dd"
        stroke="#c7b195"
        strokeWidth="3"
      />
      <path
        d={`M${x} -30 Q${x - 220 * cover} 500 ${x} 1110 L${x + 240 * cover} 1110 Q${x + 32 * cover} 500 ${x + 240 * cover} -30Z`}
        fill="url(#page-shadow)"
      />
      <path
        d={`M${x + 350} 130 Q${x + 900} 80 ${x + 1450} 145 M${x + 340} 920 Q${x + 900} 860 ${x + 1500} 925`}
        stroke="#d4bfa2"
        strokeWidth="2"
        fill="none"
        opacity=".4"
      />
    </svg>
  );
}

function Lyrics() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cue = captions.find(
    (c) => c.startMs <= (f / fps) * 1000 && (f / fps) * 1000 < c.endMs,
  );
  if (!cue) return null;
  const local = f - cue.startFrame;
  const length = cue.endFrameExclusive - cue.startFrame;
  const alpha = Math.min(clamp((local + 1) / 4), clamp((length - local) / 4));
  const night =
    (f >= 774 && f < 1144) ||
    (f >= 1281 && f < 1488) ||
    (f >= 2040 && f < 2088);
  return (
    <div
      style={{
        position: "absolute",
        left: 170,
        right: 170,
        bottom: 52,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 83,
        pointerEvents: "none",
        opacity: alpha,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "48% 40% 46% 43% / 30% 36% 35% 31%",
          padding: "9px 32px 13px",
          background: night ? "rgba(255,246,228,.89)" : "rgba(255,250,238,.87)",
          boxShadow: "0 2px 11px rgba(115,91,66,.055)",
          fontFamily: "STKaiti,KaiTi,Microsoft YaHei,serif",
          fontSize: 47,
          letterSpacing: 2,
          color: "#51444d",
          whiteSpace: "pre",
          lineHeight: 1.2,
        }}
      >
        {Array.from(cue.text).map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: clamp((local - i * 0.32 + 2) / 3),
              translate: `0px ${kf(local - i * 0.32, [0, 7, 12], [5, -0.6, 0])}px`,
            }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
        {[3, 14, 18, 24].includes(cue.id) && (
          <svg
            width="100%"
            height="12"
            style={{ position: "absolute", left: 0, bottom: 0 }}
            viewBox="0 0 900 12"
            preserveAspectRatio="none"
          >
            <path
              d="M80 7 Q390 0 816 7"
              pathLength="1"
              stroke={C.pink}
              strokeWidth="3"
              fill="none"
              strokeDasharray="1"
              strokeDashoffset={1 - range(local, 5, 20)}
              opacity=".6"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export function Finishing() {
  const f = useCurrentFrame();
  const amp = envelope[Math.min(f, envelope.length - 1)] || 0;
  return (
    <>
      <AbsoluteFill
        style={{
          mixBlendMode: "multiply",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <CanvasImage
            key={i}
            src={staticFile("paper.png")}
            style={{
              position: "absolute",
              left: (i % 4) * 512,
              top: Math.floor(i / 4) * 512,
              width: 512,
              height: 512,
            }}
          />
        ))}
      </AbsoluteFill>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <path
          d={`M55 55 L${75 + amp * 24} 55 M1845 1025 L${1865 + amp * 8} 1025`}
          fill="none"
          stroke="#dcc4a6"
          strokeWidth="3"
          opacity=".5"
        />
      </svg>
    </>
  );
}

export const CharacterStudy = () => <RigSheet frame={useCurrentFrame()} />;

// Source-authored, independently editable scene instances are in Timeline.tsx.
import { Timeline } from "./Timeline";
export const MV = () => (
  <AbsoluteFill style={{ background: C.paper }}>
    <Audio src={staticFile("song.wav")} />
    <Timeline />
    <PageTurn />
    <Finishing />
    <Lyrics />
  </AbsoluteFill>
);
