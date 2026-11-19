export const fullscreenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ping-pong buffer that remembers where the pointer has been. The stored value fades and
// wobbles so the inspected region closes like a liquid instead of a hard circle.
export const trailFragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tPrev;
  uniform vec2 uFrom;
  uniform vec2 uTo;
  uniform vec2 uTexel;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uDecay;
  uniform float uTime;
  varying vec2 vUv;

  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i), f), dot(hash3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
                   mix(dot(hash3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)), dot(hash3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x), u.y),
               mix(mix(dot(hash3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)), dot(hash3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
                   mix(dot(hash3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)), dot(hash3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x), u.y), u.z);
  }

  void main() {
    vec2 drift = vec2(noise(vec3(vUv * 5.0, uTime * 0.4)), noise(vec3(vUv * 5.0 + 9.7, uTime * 0.4)));
    vec2 uv = vUv + drift * 0.0045;
    float prev = texture2D(tPrev, uv).r * 2.0;
    prev += texture2D(tPrev, uv + vec2(uTexel.x, 0.0)).r;
    prev += texture2D(tPrev, uv - vec2(uTexel.x, 0.0)).r;
    prev += texture2D(tPrev, uv + vec2(0.0, uTexel.y)).r;
    prev += texture2D(tPrev, uv - vec2(0.0, uTexel.y)).r;
    prev = prev / 6.0 * uDecay;

    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    vec2 a = vec2(uFrom.x * uAspect, uFrom.y);
    vec2 b = vec2(uTo.x * uAspect, uTo.y);
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    float d = length(pa - ba * h);
    float wobble = 1.0 + noise(vec3(vUv * 7.0, uTime * 0.9)) * 0.22;
    float brush = smoothstep(uRadius * wobble, uRadius * wobble * 0.3, d) * uStrength;

    gl_FragColor = vec4(max(prev, brush), 0.0, 0.0, 1.0);
  }
`;

// Mixes the polished surface render with the X-ray render through the trail mask.
export const compositeFragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tSurface;
  uniform sampler2D tXray;
  uniform sampler2D tTrail;
  uniform vec2 uTrailTexel;
  uniform vec3 uAmber;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform float uXray;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    float t = texture2D(tTrail, vUv).r * uXray;
    vec2 e = uTrailTexel * 1.5;
    vec2 grad = vec2(
      texture2D(tTrail, vUv + vec2(e.x, 0.0)).r - texture2D(tTrail, vUv - vec2(e.x, 0.0)).r,
      texture2D(tTrail, vUv + vec2(0.0, e.y)).r - texture2D(tTrail, vUv - vec2(0.0, e.y)).r
    ) * uXray;

    float mask = smoothstep(0.38, 0.46, t);
    float edge = smoothstep(0.26, 0.4, t) * (1.0 - smoothstep(0.44, 0.58, t));
    float rim = smoothstep(0.37, 0.42, t) * (1.0 - smoothstep(0.42, 0.47, t));

    // The surface bends at the rim of the lens, with a slight color split.
    vec2 bent = vUv - grad * 0.05 * edge;
    vec3 surface = texture2D(tSurface, bent).rgb;
    surface.r = mix(surface.r, texture2D(tSurface, bent + grad * 0.014).r, edge);
    surface.b = mix(surface.b, texture2D(tSurface, bent - grad * 0.014).b, edge);

    // Measurement grid behind the X-ray view, in CSS pixels so it stays fine on dense screens.
    vec2 px = gl_FragCoord.xy / uPixelRatio;
    vec2 minor = abs(fract(px / 44.0 - 0.5) - 0.5) * 44.0;
    vec2 major = abs(fract(px / 176.0 - 0.5) - 0.5) * 176.0;
    float grid = (1.0 - smoothstep(0.0, 1.1, min(minor.x, minor.y))) * 0.028
               + (1.0 - smoothstep(0.0, 1.4, min(major.x, major.y))) * 0.05;
    vec3 xray = vec3(0.0032, 0.0028, 0.0026) + uAmber * grid + texture2D(tXray, vUv).rgb;

    vec3 color = mix(surface, xray, mask);
    color += uAmber * (edge * 0.05 + rim * 0.55);
    color += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * 0.0035;
    gl_FragColor = vec4(max(color, 0.0), 1.0);
  }
`;

export const backdropVertex = /* glsl */ `
  varying vec2 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xy;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

// Graphite field with one soft pool of amber light behind whatever object is on stage.
export const backdropFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uBase;
  uniform vec3 uGlow;
  uniform vec2 uCenter;
  uniform float uAmount;
  varying vec2 vWorld;
  void main() {
    vec2 d = (vWorld - uCenter) * vec2(0.82, 1.0);
    float pool = exp(-dot(d, d) * 0.028);
    float core = exp(-dot(d, d) * 0.16);
    vec3 color = uBase + uGlow * (pool * 0.03 + core * 0.03) * uAmount;
    float vignette = smoothstep(26.0, 6.0, length(vWorld * vec2(0.8, 1.2)));
    gl_FragColor = vec4(color * mix(0.55, 1.0, vignette), 1.0);
  }
`;

export const shellVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Additive rim-only body: reads as a scanned volume rather than a solid.
export const shellFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), uPower);
    gl_FragColor = vec4(uColor * rim, 1.0);
  }
`;
