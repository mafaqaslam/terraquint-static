/**
 * hero-globe.js - TerraQuint homepage globe
 *
 * Shows a still image of the globe immediately, then upgrades to the
 * animated 3D globe when the device can handle it.
 *
 * The still image stays (no 3D at all) when:
 *  - the visitor has "reduce motion" turned on
 *  - the browser has no WebGL
 *  - the device reports very little memory / CPU
 *  - the animation runs too slowly after it starts (frame-rate check)
 *  - the graphics context is lost
 *
 * Phones get a lighter version: lower resolution, fewer polygons,
 * smaller textures, fewer stars, 30 fps cap.
 * The animation pauses whenever the hero is off-screen or the tab is hidden.
 */

const ASSET_BASE = new URL('../globe/', import.meta.url).href;
const THREE_URL = new URL('./three-globe.min.js', import.meta.url).href;

// Shared look (also used to render the still image, so both match)
export const GLOBE = {
  fov: 42,
  cameraPos: [0, 0.1, 4.2],
  radius: 1.25,
  startRotationY: 0,     // which side of the Earth faces the visitor at start
  spinPerSec: 0.108,     // same speed as the original (0.0018 per frame @60fps)
  cloudSpinPerSec: 0.126
};

export function buildGlobe(THREE, opts) {
  const { lite, textures, onTexturesReady } = opts;
  const group = new THREE.Group();
  const loader = new THREE.TextureLoader();
  let pending = 0;
  const done = () => { if (--pending === 0 && onTexturesReady) onTexturesReady(); };
  const load = (file) => { pending++; return loader.load(ASSET_BASE + file, done, undefined, done); };

  const seg = lite ? 64 : 128;
  const earthMat = new THREE.MeshPhongMaterial({
    map: load(textures.day),
    specularMap: load(textures.specular),
    specular: new THREE.Color('grey'),
    shininess: 8
  });
  if (textures.normal) {
    earthMat.normalMap = load(textures.normal);
    earthMat.normalScale = new THREE.Vector2(0.9, 0.9);
  }
  const earth = new THREE.Mesh(new THREE.SphereGeometry(GLOBE.radius, seg, seg), earthMat);
  group.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE.radius + 0.012, seg, seg),
    new THREE.MeshPhongMaterial({
      map: load(textures.clouds),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  group.add(clouds);

  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE.radius + 0.06, lite ? 32 : 64, lite ? 32 : 64),
    new THREE.MeshBasicMaterial({ color: 0x0077b6, transparent: true, opacity: 0.05, side: THREE.BackSide })
  ));

  group.rotation.y = GLOBE.startRotationY;
  return { group, clouds };
}

export function addLights(THREE, scene) {
  scene.add(new THREE.AmbientLight(0x222222));
  const main = new THREE.DirectionalLight(0xffffff, 1.3);
  main.position.set(5, 3, 4);
  scene.add(main);
  const fill = new THREE.PointLight(0x3366aa, 0.3); fill.position.set(-2, 1, 3); scene.add(fill);
  const back = new THREE.PointLight(0x4488aa, 0.2); back.position.set(0, 2, -3.5); scene.add(back);
  const rim = new THREE.PointLight(0x88aaff, 0.25); rim.position.set(1.5, 1, -2.5); scene.add(rim);
}

function buildStars(THREE, lite) {
  const objs = [];
  const near = lite ? 1200 : 2800;
  const pos = new Float32Array(near * 3);
  const col = new Float32Array(near * 3);
  for (let i = 0; i < near; i++) {
    const r = 55 + Math.random() * 45;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(p) * Math.cos(t);
    pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
    pos[i * 3 + 2] = r * Math.cos(p);
    const c = Math.random();
    const rgb = c < 0.75 ? [1, 1, 1] : c < 0.88 ? [0.7, 0.8, 1] : [1, 0.75, 0.55];
    col.set(rgb, i * 3);
  }
  const g1 = new THREE.BufferGeometry();
  g1.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g1.setAttribute('color', new THREE.BufferAttribute(col, 3));
  objs.push(new THREE.Points(g1, new THREE.PointsMaterial({
    size: 0.065, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false
  })));

  const far = lite ? 800 : 2000;
  const pos2 = new Float32Array(far * 3);
  for (let i = 0; i < far; i++) {
    pos2[i * 3] = (Math.random() - 0.5) * 400;
    pos2[i * 3 + 1] = (Math.random() - 0.5) * 250;
    pos2[i * 3 + 2] = (Math.random() - 0.5) * 250 - 100;
  }
  const g2 = new THREE.BufferGeometry();
  g2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
  objs.push(new THREE.Points(g2, new THREE.PointsMaterial({ color: 0xaabbdd, size: 0.025, transparent: true, opacity: 0.3, depthWrite: false })));
  return objs;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

function isLowPowerDevice() {
  const mem = navigator.deviceMemory;          // Chrome/Android only
  const cores = navigator.hardwareConcurrency;
  const saveData = navigator.connection && navigator.connection.saveData;
  return (mem && mem <= 2) || (cores && cores <= 2) || !!saveData;
}

async function init() {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('hero-canvas');
  if (!hero || !canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !hasWebGL() || isLowPowerDevice()) {
    hero.classList.add('globe-static');
    return;                                   // still image only, 3D never downloads
  }

  const lite = window.matchMedia('(max-width: 800px), (pointer: coarse)').matches;
  let THREE;
  try {
    THREE = await import(THREE_URL);
  } catch (e) {
    hero.classList.add('globe-static');
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !lite,
      powerPreference: lite ? 'low-power' : 'default'
    });
  } catch (e) {
    hero.classList.add('globe-static');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(GLOBE.fov, 1, 0.1, 1000);
  camera.position.set(...GLOBE.cameraPos);
  camera.lookAt(0, 0, 0);

  const stars = buildStars(THREE, lite);
  stars.forEach((s) => scene.add(s));
  addLights(THREE, scene);

  let ready = false;
  const { group, clouds } = buildGlobe(THREE, {
    lite,
    textures: lite
      ? { day: 'earth-day-1024.webp', specular: 'earth-specular-1024.webp', clouds: 'earth-clouds-512.webp' }
      : { day: 'earth-day-2048.webp', specular: 'earth-specular-1024.webp', normal: 'earth-normal-2048.webp', clouds: 'earth-clouds-1024.webp' },
    onTexturesReady: () => { ready = true; }
  });
  scene.add(group);

  // ---- Sizing: the canvas covers the hero's first screen, not the whole stacked hero.
  // On touch devices only width changes trigger a resize, so the address bar
  // showing/hiding while scrolling no longer rebuilds the canvas.
  let lastW = 0, lastH = 0;
  function size(force) {
    const w = hero.clientWidth;
    // Same formula as the CSS for .hero-globe-still, so the still image and the
    // 3D globe line up exactly. On phones the width limit keeps the whole globe on screen.
    const h = Math.round(Math.min(hero.clientHeight, Math.max(window.innerHeight, 560), w * 1.25));
    if (!force && w === lastW && (lite || Math.abs(h - lastH) < 2)) return;
    lastW = w; lastH = h;
    canvas.style.height = h + 'px';
    hero.style.setProperty('--globe-h', h + 'px');
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  size(true);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => size(false), 150);
  });

  // ---- Run only while visible
  let onScreen = true;
  let tabVisible = !document.hidden;
  new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    if (onScreen) kick();
  }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => {
    tabVisible = !document.hidden;
    if (tabVisible) kick();
  });

  // ---- Give up gracefully if the graphics context is lost
  let dead = false;
  function fallBack() {
    if (dead) return;
    dead = true;
    hero.classList.remove('globe-live');
    hero.classList.add('globe-static');
    try { renderer.dispose(); } catch (e) {}
  }
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); fallBack(); });

  // ---- Animation loop
  const minFrameMs = lite ? 1000 / 30 : 0;     // 30 fps cap on phones
  let last = 0, lastDraw = 0, looping = false, t = 0;
  // frame-rate watchdog
  let sampleStart = 0, sampleFrames = 0, shown = false;

  function frame(now) {
    looping = false;
    if (dead || !onScreen || !tabVisible) return;
    looping = true;
    requestAnimationFrame(frame);

    if (minFrameMs && now - lastDraw < minFrameMs - 1) return;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now; lastDraw = now;
    t += dt;

    group.rotation.y += GLOBE.spinPerSec * dt;
    group.rotation.x = Math.sin(t * 0.18 * 0.12) * 0.02;
    group.rotation.z = Math.cos(t * 0.18 * 0.1) * 0.012;
    clouds.rotation.y += GLOBE.cloudSpinPerSec * dt;   // clouds drift on top of the Earth's spin
    stars[0].rotation.y += 0.0024 * dt;
    stars[0].rotation.x += 0.0012 * dt;
    stars[1].rotation.y -= 0.0018 * dt;

    renderer.render(scene, camera);

    if (ready && !shown) {
      shown = true;
      hero.classList.add('globe-live');       // fade 3D in, still image out
      sampleStart = now; sampleFrames = 0;
    } else if (shown && sampleStart) {
      sampleFrames++;
      const elapsed = now - sampleStart;
      if (elapsed > 3000) {
        const fps = (sampleFrames * 1000) / elapsed;
        if (fps < (lite ? 15 : 20)) fallBack(); // too slow: keep the still image
        sampleStart = 0;                        // check once
      }
    }
  }
  function kick() {
    if (!looping && !dead && onScreen && tabVisible) {
      last = 0;
      if (sampleStart) { sampleStart = performance.now(); sampleFrames = 0; }
      looping = true;
      requestAnimationFrame(frame);
    }
  }
  kick();
}

if (!window.__GLOBE_NO_AUTOSTART) {
  // Start after the page has loaded so text and layout appear first
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', () => init(), { once: true });
  }
}
