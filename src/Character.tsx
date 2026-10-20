import React from "react";
import { wave } from "./motion";

// Reference-based vector redraw. One topology is shared by every shot.
// Coordinates are centred at the soles. No mirror transform: the girl's clip stays anatomical left.
export type Mood = "happy" | "soft" | "sad" | "wonder" | "eyesclosed";
type Props = {
  girl?: boolean;
  x?: number;
  y?: number;
  scale?: number;
  frame: number;
  walk?: boolean;
  mood?: Mood;
  pose?: "idle" | "wave" | "reach" | "hold" | "sit" | "hug" | "phone" | "look";
  turn?: "front" | "side" | "back";
  direction?: 1 | -1;
  tilt?: number;
  opacity?: number;
};
const ink = "#25212b";
export const Character: React.FC<Props> = ({
  girl = false,
  x = 0,
  y = 0,
  scale = 1,
  frame: f,
  walk = false,
  mood = "soft",
  pose = "idle",
  turn = "front",
  direction = 1,
  tilt = 0,
  opacity = 1,
}) => {
  const step = walk ? wave(f, 28) : 0,
    breath = wave(f, 112, girl ? 1 : 0) * 1.6;
  const bob = walk ? -Math.abs(wave(f, 14)) * 4 : breath;
  const back = turn === "back",
    side = turn === "side";
  const blink = (f + (girl ? 69 : 0)) % 137 < 5 || mood === "eyesclosed";
  const blue = girl ? "#efa7b7" : "#86add5",
    dark = girl ? "#6a4842" : "#333545",
    light = girl ? "#8d6255" : "#4b4d65";
  const headAngle =
    tilt +
    wave(f - 4, 110, girl ? 1 : 0) * 1.2 +
    (walk ? wave(f - 4, 28) * 1.5 : 0);
  const armL =
    pose === "hug"
      ? -66
      : pose === "phone"
        ? -62
        : pose === "hold"
          ? girl
            ? 35
            : 0
          : pose === "reach"
            ? 42
            : walk
              ? -step * 19
              : wave(f - 3, 112) * 1.5;
  const armR =
    pose === "wave"
      ? -125 + wave(f, 24) * 12
      : pose === "hug"
        ? 65
        : pose === "hold"
          ? girl
            ? 0
            : -35
          : pose === "reach"
            ? -46
            : pose === "phone"
              ? 45
              : walk
                ? step * 19
                : -wave(f - 8, 112) * 1.5;
  const legL = pose === "sit" ? -72 : step * 24,
    legR = pose === "sit" ? -62 : -step * 24;
  const arm = (right: boolean, angle: number) => (
    <g transform={`translate(${right ? 56 : -56} -160) rotate(${angle})`}>
      <path
        d={
          right
            ? "M-13 -4 Q20 -7 29 23 L43 75 Q39 91 10 86 L-9 25 Z"
            : "M13 -4 Q-20 -7 -29 23 L-43 75 Q-39 91 -10 86 L9 25 Z"
        }
        fill={blue}
      />
      <path
        d={
          right
            ? "M10 80 Q22 85 40 78 L39 94 Q29 110 15 99Z"
            : "M-10 80 Q-22 85 -40 78 L-39 94 Q-29 110 -15 99Z"
        }
        fill="#ffe1c5"
      />
      <path
        d={right ? "M11 78 Q23 84 40 77" : "M-11 78 Q-23 84 -40 77"}
        fill="none"
        strokeWidth={5}
      />
    </g>
  );
  const leg = (right: boolean, angle: number) => (
    <g transform={`translate(${right ? 26 : -26} -83) rotate(${angle})`}>
      <path
        d="M-18 -2 L17 -2 L16 65 Q0 74 -18 65Z"
        fill={girl ? "#ffe0c5" : "#3c3d4b"}
      />
      {girl && <path d="M-18 47 L16 47 L16 67 L-18 67Z" fill="#fffaf1" />}
      <path
        d="M-19 66 Q-28 69 -31 83 Q-34 93 -19 96 L23 96 Q33 92 27 80 Q22 66 10 65 Z"
        fill="#faf6ed"
      />
      <path
        d="M-28 83 Q-8 81 9 86 L27 84 L27 91 L-27 91Z"
        fill="#5b5d6c"
        strokeWidth={2.5}
      />
      <path d="M-12 72 L9 75 M-16 79 L5 81" fill="none" strokeWidth={4} />
    </g>
  );
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      opacity={opacity}
      stroke={ink}
      strokeWidth={5.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        transform={`translate(0 ${bob}) rotate(${walk ? step * 1.1 : 0} 0 -80)`}
      >
        {leg(false, legL)}
        {leg(true, legR)}
        {arm(false, armL)}
        <path
          d="M-51 -174 Q-64 -156 -63 -116 L-62 -79 Q-18 -70 61 -79 L58 -135 Q62 -159 47 -178 L24 -188 L-26 -188Z"
          fill={blue}
        />
        <path
          d="M-52 -169 Q-73 -184 -48 -202 L-15 -205 L0 -187 L17 -204 L45 -200 Q73 -182 50 -168 L21 -174 L0 -164 L-21 -174Z"
          fill={blue}
        />
        <path
          d="M-43 -82 Q0 -76 52 -82"
          fill="none"
          stroke={girl ? "#d8879c" : "#678fb7"}
          strokeWidth={4}
        />
        {!back && (
          <>
            <path
              d={`M-13 -169 Q-15 -148 ${-14 + wave(f - 5, 65) * 1.1} -134 M13 -169 Q12 -147 ${13 + wave(f - 8, 65) * 1.1} -134`}
              fill="none"
              stroke="#fff6e7"
              strokeWidth={5}
            />
            <path
              d="M-27 -107 Q0 -97 27 -107"
              fill="none"
              strokeWidth={2}
              opacity={0.15}
            />
          </>
        )}
        {girl && (
          <g
            transform={`rotate(${wave(f - 6, walk ? 28 : 98) * (walk ? 2 : 0.5)} 0 -79)`}
          >
            <path d="M-61 -78 L-72 -44 Q0 -30 72 -44 L60 -78Z" fill="#555765" />
            <path
              d="M-42 -76 L-49 -43 M-14 -75 L-18 -39 M17 -75 L20 -39 M44 -76 L51 -44"
              fill="none"
              strokeWidth={3}
            />
          </g>
        )}
        {arm(true, armR)}
        {pose === "phone" && (
          <g transform="translate(17 -149) rotate(12)">
            <rect width="33" height="53" rx="6" fill="#55576c" />
            <rect
              x="5"
              y="6"
              width="23"
              height="35"
              rx="2"
              fill="#c4d9df"
              strokeWidth="1"
            />
          </g>
        )}
        <g
          transform={`rotate(${headAngle} 0 -205) translate(${side ? direction * 3 : 0} 0)`}
        >
          {girl ? (
            <path
              d="M-112 -217 Q-126 -246 -113 -299 Q-109 -344 -76 -365 Q-26 -391 26 -377 Q82 -374 108 -331 Q125 -295 121 -232 L109 -206 Q92 -192 66 -205 L-62 -204 Q-95 -191 -112 -217Z"
              fill={dark}
            />
          ) : null}
          {!back && (
            <path
              d="M-98 -289 Q-118 -296 -117 -270 Q-115 -250 -96 -252 Q-79 -212 -7 -209 Q71 -210 93 -250 Q117 -245 118 -270 Q119 -298 99 -292 L75 -335 L-60 -338Z"
              fill="#ffe2c7"
            />
          )}
          {girl ? (
            <>
              <path
                d={
                  back
                    ? "M-111 -217 Q-130 -305 -88 -353 Q-31 -400 43 -372 Q120 -349 121 -261 L116 -218 Q97 -198 81 -208 L60 -214 L-65 -214 Q-91 -199 -111 -217Z"
                    : "M-111 -223 Q-120 -287 -100 -330 Q-66 -380 -11 -378 Q63 -385 99 -338 Q122 -308 116 -236 L97 -211 L91 -268 Q75 -288 68 -318 L57 -285 Q47 -274 38 -284 L24 -321 L23 -285 Q-1 -278 -17 -286 L-23 -320 Q-32 -285 -48 -281 L-49 -312 Q-61 -282 -82 -276 L-84 -226 L-99 -208Z"
                }
                fill={dark}
              />
              <path
                d={
                  back
                    ? "M-87 -244 Q-101 -301 -66 -342 M79 -238 Q100 -287 68 -340"
                    : "M-101 -238 Q-108 -290 -90 -318 M92 -242 Q105 -280 91 -303"
                }
                stroke={light}
                strokeWidth={4}
                fill="none"
                opacity={0.55}
              />
              {!back && (
                <path d="M77 -306 L94 -313" stroke="#f4aabc" strokeWidth={9} />
              )}
              {back && (
                <path
                  d="M-83 -318 L-99 -325"
                  stroke="#f4aabc"
                  strokeWidth={8}
                />
              )}
            </>
          ) : (
            <>
              <path
                d={
                  back
                    ? "M-102 -239 L-115 -265 L-111 -293 L-123 -287 L-109 -324 L-126 -322 L-86 -350 Q-45 -390 3 -378 L14 -393 L32 -379 L53 -390 L65 -377 Q98 -377 111 -343 L126 -329 L111 -318 L122 -288 L110 -275 L108 -248 L87 -224 Q-5 -201 -82 -222Z"
                    : "M-100 -258 L-112 -277 L-110 -300 L-122 -296 L-106 -328 L-122 -326 L-87 -354 Q-48 -384 -4 -377 Q24 -376 15 -395 Q43 -387 34 -374 Q57 -394 70 -381 L60 -373 Q95 -369 106 -344 L123 -329 L110 -319 L117 -295 L105 -278 L96 -258 L82 -282 L74 -307 L56 -280 L40 -296 L19 -270 L9 -296 L-8 -273 L-9 -304 L-33 -274 L-34 -302 L-59 -279 L-75 -273 L-82 -245Z"
                }
                fill={dark}
              />
              <path
                d="M-83 -332 Q-44 -361 -9 -359 M48 -357 Q74 -351 86 -329"
                fill="none"
                stroke={light}
                strokeWidth={5}
                opacity={0.5}
              />
            </>
          )}
          {!back && (
            <g
              transform={`translate(${side ? direction * 23 : 0} 0) scale(${side ? 0.8 : 1} 1)`}
            >
              {mood === "sad" ? (
                <>
                  <path
                    d="M-55 -269 Q-45 -258 -34 -268 M33 -267 Q45 -258 55 -269"
                    fill="none"
                    strokeWidth={6}
                  />
                  <path
                    d="M-43 -283 L-28 -286 M32 -286 L46 -282"
                    fill="none"
                    strokeWidth={3}
                  />
                </>
              ) : blink || mood === "happy" ? (
                <path
                  d="M-56 -265 Q-44 -289 -31 -265 M30 -265 Q43 -289 56 -265"
                  fill="none"
                  strokeWidth={7}
                />
              ) : (
                <>
                  <ellipse
                    cx="-44"
                    cy="-269"
                    rx="6.5"
                    ry="10"
                    fill={ink}
                    stroke="none"
                  />
                  <ellipse
                    cx="43"
                    cy="-269"
                    rx="6.5"
                    ry="10"
                    fill={ink}
                    stroke="none"
                  />
                </>
              )}
              <path
                d="M-70 -251 L-71 -243 M-60 -250 L-60 -242 M61 -251 L61 -243 M71 -251 L71 -243"
                fill="none"
                stroke="#ed8c91"
                strokeWidth={5}
              />
              {mood === "wonder" ? (
                <ellipse
                  cx="0"
                  cy="-246"
                  rx="5"
                  ry="7"
                  fill="none"
                  strokeWidth={3.5}
                />
              ) : (
                <path
                  d={
                    mood === "sad"
                      ? "M-7 -238 Q0 -247 7 -238"
                      : "M-8 -246 Q0 -235 9 -246"
                  }
                  strokeWidth={4}
                  fill="none"
                />
              )}
            </g>
          )}
        </g>
      </g>
    </g>
  );
};

export const Couple = ({
  x = 960,
  y = 775,
  scale = 0.75,
  frame,
  walk = false,
  mood = "happy",
  hold = false,
  back = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  frame: number;
  walk?: boolean;
  mood?: Mood;
  hold?: boolean;
  back?: boolean;
}) => (
  <g>
    <Character
      x={x - 118 * scale}
      y={y}
      scale={scale}
      frame={frame}
      walk={walk}
      mood={mood}
      pose={hold ? "hold" : "idle"}
      turn={back ? "back" : "front"}
    />
    <Character
      girl
      x={x + 118 * scale}
      y={y}
      scale={scale * 0.9}
      frame={frame + 4}
      walk={walk}
      mood={mood}
      pose={hold ? "hold" : "idle"}
      turn={back ? "back" : "front"}
    />
    {hold && (
      <path
        d={`M${x + 8 * scale} ${y - 104 * scale} Q${x + 10 * scale} ${y - 96 * scale} ${x + 4 * scale} ${y - 94 * scale}`}
        stroke="#ffe1c5"
        strokeWidth={8 * scale}
        fill="none"
        strokeLinecap="round"
      />
    )}
  </g>
);

export const RigSheet = ({ frame }: { frame: number }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    style={{ background: "#fffdf7" }}
  >
    <text x="80" y="80" fontFamily="STKaiti, KaiTi" fontSize="40" fill={ink}>
      角色关节与表情 · 依据原图矢量重绘
    </text>
    {(["front", "side", "back"] as const).map((turn, i) => (
      <React.Fragment key={turn}>
        <Character
          x={230 + i * 300}
          y={580}
          scale={1.05}
          frame={frame}
          walk
          turn={turn}
        />
        <Character
          girl
          x={1190 + i * 285}
          y={580}
          scale={1.0}
          frame={frame}
          walk
          turn={turn}
        />
      </React.Fragment>
    ))}
    {(["happy", "soft", "sad", "wonder"] as const).map((mood, i) => (
      <React.Fragment key={mood}>
        <Character
          x={240 + i * 445}
          y={1010}
          scale={0.72}
          frame={frame}
          mood={mood}
          pose={i === 0 ? "wave" : i === 1 ? "reach" : "idle"}
        />
        <Character
          girl
          x={390 + i * 445}
          y={1010}
          scale={0.66}
          frame={frame}
          mood={mood}
          pose={i === 0 ? "wave" : i === 1 ? "reach" : "idle"}
        />
      </React.Fragment>
    ))}
  </svg>
);
