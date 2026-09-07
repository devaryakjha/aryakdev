import assert from 'node:assert/strict';
import { foldPolygon, spring, mountSticker } from '../src/scripts/sticker.ts';

const area = points => Math.abs(points.reduce((sum, p, i) => {
  const q = points[(i + 1) % points.length];
  return sum + p.x * q.y - p.y * q.x;
}, 0)) / 2;
for (const normal of [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: Math.SQRT1_2, y: -Math.SQRT1_2 }]) {
  for (const distance of [-.8, -.5, 0, .25, .5, .8]) {
    const front = foldPolygon(normal, distance), back = foldPolygon(normal, distance, true);
    assert.ok(Math.abs(area(front) + area(back) - 1) < 1e-9, 'Fold partitions the surface without gaps');
    for (const p of front) assert.ok(normal.x * (p.x - .5) + normal.y * (p.y - .5) <= distance + 1e-9);
    if (distance === 0) assert.ok(Math.abs(area(front) - .5) < 1e-9, 'Center crease divides the sticker equally');
  }
}
const one = spring(1, 0, 0, 1);
let stepped = { position: 1, velocity: 0 };
for (let i = 0; i < 100; i++) stepped = spring(stepped.position, stepped.velocity, 0, .01);
assert.ok(Math.abs(one.position - stepped.position) < 1e-9, 'Spring is independent of frame rate');
assert.ok(one.position > 0 && one.position < .001, 'Release settles without overshoot');

// Run the actual pointer handlers: capture, cancellation, release and native drag suppression.
const handlers = {}, attrs = { 'aria-pressed': 'false' }, frames = new Map();
let captured = false, frame = 0;
const elements = Object.fromEntries(['.portrait-face', '.portrait-backing', '.portrait-peel'].map(key => [key, { style: {} }]));
elements['.portrait-outline path'] = { getTotalLength: () => Math.PI * 2, getPointAtLength: angle => ({ x: (Math.cos(angle) / 2 + .5) * 1254, y: (Math.sin(angle) / 2 + .5) * 1254 }) };
const button = {
  clientWidth: 320, dataset: {}, disabled: true,
  querySelector: key => elements[key], addEventListener: (name, fn) => { handlers[name] = fn; },
  setAttribute: (key, value) => { attrs[key] = value; },
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 320 }),
  setPointerCapture: () => { captured = true; }, hasPointerCapture: () => captured,
  releasePointerCapture: () => { captured = false; },
};
globalThis.matchMedia = () => ({ matches: false, addEventListener() {} });
globalThis.window = { addEventListener(name, fn) { handlers[name] = fn; } };
globalThis.requestAnimationFrame = fn => { frames.set(++frame, fn); return frame; };
globalThis.cancelAnimationFrame = id => frames.delete(id);
function settle() { let now = performance.now(); for (let i = 0; frames.size && i < 200; i++) { now += 16; const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(now)); } assert.equal(frames.size, 0); }
const pointer = (x, y, timeStamp) => ({ clientX: x, clientY: y, timeStamp, pointerId: 1, button: 0, isPrimary: true });
mountSticker(button);
handlers.click({ detail: 1 });
assert.equal(attrs['aria-pressed'], 'false', 'Clicking the attached face does not peel it');
handlers.click({ detail: 0 });
assert.equal(attrs['aria-pressed'], 'false', 'Keyboard activation does not bypass gradual peeling');
let prevented = false;
handlers.dragstart({ preventDefault() { prevented = true; } });
assert.ok(prevented, 'Native image drag is blocked');
handlers.pointerdown(pointer(300, 160, 0));
assert.ok(captured);
handlers.pointermove(pointer(260, 160, 100));
handlers.pointerup(pointer(260, 160, 250));
settle();
assert.equal(attrs['aria-pressed'], 'false', 'Short pull returns to the surface');
assert.equal(captured, false);
handlers.click({ detail: 1 });
assert.equal(attrs['aria-pressed'], 'false', 'Drag does not also trigger click');
handlers.pointerdown(pointer(300, 160, 300));
handlers.pointermove(pointer(-100, 160, 600));
handlers.pointercancel(pointer(-100, 160, 610));
settle();
assert.equal(attrs['aria-pressed'], 'false', 'Cancelled drag restores sticker');
handlers.pointerdown(pointer(300, 160, 700));
handlers.pointermove(pointer(-100, 160, 1000));
handlers.pointerup(pointer(-100, 160, 1200));
settle();
assert.equal(attrs['aria-pressed'], 'true', 'Long pull peels off');
assert.equal(elements['.portrait-peel'].style.opacity, '0');
handlers.click({ detail: 1 });
handlers.click({ detail: 0 });
assert.equal(attrs['aria-pressed'], 'false', 'Keyboard can put the sticker back');
assert.equal(elements['.portrait-peel'].style.opacity, '1');
handlers.pointerdown(pointer(20, 160, 1300));
handlers.pointermove(pointer(420, 160, 1600));
handlers.pointerup(pointer(420, 160, 1800));
settle();
handlers.click({ detail: 1 });
handlers.click({ detail: 0 });
const restingFold = elements['.portrait-face'].style.clipPath;
handlers.pointermove({ ...pointer(300, 160, 1900), pointerType: 'mouse' });
handlers.pointermove({ ...pointer(20, 160, 2000), pointerType: 'mouse' });
settle();
assert.equal(elements['.portrait-face'].style.clipPath, restingFold, 'Moving the pointer after a peel does not lift an edge');
handlers.pointerdown(pointer(300, 160, 2100));
handlers.pointermove(pointer(220, 160, 2200));
const matrix = () => elements['.portrait-backing'].style.transform.slice(7, -1).split(',').map(Number);
assert.deepEqual(matrix().slice(0, 4), [-1, 0, 0, 1], 'Leftward pull folds the right edge');
handlers.pointermove(pointer(300, 80, 2300));
assert.deepEqual(matrix().slice(0, 4), [1, 0, 0, -1], 'Changing direction during a drag rotates the crease');
handlers.pointermove(pointer(300, 160, 2400));
assert.equal(elements['.portrait-face'].style.clipPath, restingFold, 'Returning to the grab point lays it flat');
handlers.pointermove(pointer(380, 160, 2500));
assert.ok(matrix()[4] < button.clientWidth / 2, 'Crossing the grab point peels from the opposite edge');
handlers.pointercancel(pointer(380, 160, 2600));
settle();
handlers.keydown({ key: 'ArrowLeft', preventDefault() {} });
assert.equal(attrs['aria-pressed'], 'false', 'One arrow key only peels partway');
for (let i = 0; i < 4; i++) handlers.keydown({ key: 'ArrowLeft', preventDefault() {} });
assert.equal(attrs['aria-pressed'], 'true', 'Repeated arrow keys peel off');
handlers.click({ detail: 0 });
assert.equal(attrs['aria-pressed'], 'false', 'Activation restores the removed sticker');
console.log('Checked fold geometry, spring timing, pointer capture, cancellation, native drag suppression and restore.');
