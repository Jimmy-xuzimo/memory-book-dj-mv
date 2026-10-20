export type Point = [number, number];

/** Two fixed-length bones, with an explicit bend side. Never interpolate an elbow across the limb. */
export function solveArm(shoulder: Point, target: Point, bend: number) {
  const upper = 100, lower = 104;
  const dx = target[0] - shoulder[0], dy = target[1] - shoulder[1];
  const requested = Math.hypot(dx, dy);
  const distance = bend===0 ? 204 : Math.min(202.5, Math.max(64, requested));
  const ux = dx / (requested || 1), uy = dy / (requested || 1);
  const wrist: Point = [shoulder[0] + ux * distance, shoulder[1] + uy * distance];
  const along = (upper * upper - lower * lower + distance * distance) / (2 * distance);
  const height = Math.sqrt(Math.max(0, upper * upper - along * along));
  const elbow: Point = [shoulder[0] + ux * along - uy * height * bend, shoulder[1] + uy * along + ux * height * bend];
  const vx = (wrist[0] - elbow[0]) / lower, vy = (wrist[1] - elbow[1]) / lower;
  const cuff: Point = [wrist[0] - vx * 19, wrist[1] - vy * 19];
  const before: Point = [elbow[0] * .82 + shoulder[0] * .18, elbow[1] * .82 + shoulder[1] * .18];
  const after: Point = [elbow[0] * .82 + cuff[0] * .18, elbow[1] * .82 + cuff[1] * .18];
  const path = `M${shoulder}L${before}Q${elbow} ${after}L${cuff}`;
  return {shoulder, elbow, wrist, cuff, path, angle: Math.atan2(vy, vx) * 180 / Math.PI - 90, requested, distance};
}
