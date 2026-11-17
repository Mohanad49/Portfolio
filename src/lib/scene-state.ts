// Shared values between the DOM choreography (GSAP writes) and the WebGL stage (reads each frame).
// Neither side animates the other's properties; they only exchange these numbers.
// Document order. 'roles' has no object of its own: it is the reading stretch that carries the career object away.
export const STATIONS = ['hero', 'layers', 'testpulse', 'caldiy', 'llm', 'archive', 'career', 'roles', 'method', 'profile', 'closing'] as const;
export type Station = (typeof STATIONS)[number];

export const sceneState = {
  /** Continuous chapter coordinate: 0 is the hero, 1 the layers chapter, and so on. */
  story: 0,
  /** Progress inside each chapter, 0 to 1. */
  local: new Float32Array(STATIONS.length),
  /** Narrow layouts only: each chapter's top edge in viewport heights, so objects travel with their chapter. */
  tops: new Float32Array(STATIONS.length),
  /** How much of the canvas a light field hides. Rendering stops at 1. */
  covered: 0,
  /** 0 while the opening handoff covers the page, 1 once the hero may arrive. */
  intro: 0,
  /** Set by the stage after its first complete frame. */
  ready: false,
};

export const stationIndex = (name: Station) => STATIONS.indexOf(name);
