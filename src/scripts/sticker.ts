type Point = { x: number; y: number };

// Clip the square at the fold; CSS supplies the sticker's silhouette.
export function foldPolygon(normal: Point, distance: number, back = false) {
  const square = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
  const side = (p: Point) => (normal.x * (p.x - .5) + normal.y * (p.y - .5) - distance) * (back ? -1 : 1);
  const points: Point[] = [];
  square.forEach((p, i) => {
    const q = square[(i + 1) % 4], a = side(p), b = side(q);
    if (a <= 0) points.push(p);
    if ((a < 0 && b > 0) || (a > 0 && b < 0)) {
      const t = a / (a - b);
      points.push({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
    }
  });
  return points;
}

// Exact critically damped spring (mass 1, stiffness 100, damping 2√100).
export function spring(position: number, velocity: number, target: number, seconds: number) {
  const offset = position - target, c = velocity + 10 * offset, decay = Math.exp(-10 * seconds);
  return { position: target + (offset + c * seconds) * decay, velocity: (velocity - 10 * c * seconds) * decay };
}

export function mountSticker(button: HTMLButtonElement) {
  const face = button.querySelector<HTMLElement>('.portrait-face')!;
  const back = button.querySelector<HTMLElement>('.portrait-backing')!;
  const sheet = button.querySelector<HTMLElement>('.portrait-peel')!;
  const outline = button.querySelector<SVGPathElement>('.portrait-outline path')!;
  const length = outline.getTotalLength();
  const edgePoints = Array.from({ length: 128 }, (_, i) => {
    const p = outline.getPointAtLength(i * length / 128);
    return { x: p.x / 1254 - .5, y: p.y / 1254 - .5 };
  });
  const edgeDistance = () => Math.max(...edgePoints.map(p => p.x * normal.x + p.y * normal.y));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let normal = { x: Math.SQRT1_2, y: Math.SQRT1_2 };
  let position = .5, velocity = 0, frame = 0, removed = false, dragged = false;
  let drag: { id: number; x: number; y: number; size: number; last: number; time: number } | null = null;
  const polygon = (back: boolean) => {
    const points = foldPolygon(normal, position, back);
    return `polygon(${(points.length ? points : [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]).map(p => `${p.x * 100}% ${p.y * 100}%`).join(',')})`;
  };
  function render() {
    face.style.clipPath = polygon(false);
    back.style.clipPath = polygon(true);
    const { x, y } = normal, size = button.clientWidth;
    const shift = 2 * (position + (x + y) / 2) * size;
    back.style.transform = `matrix(${1 - 2*x*x},${-2*x*y},${-2*x*y},${1 - 2*y*y},${shift*x},${shift*y})`;
    sheet.style.opacity = String(Math.max(0, Math.min(1, (position + .6) / .15)));
  }
  function settle(target: number, instant = false) {
    cancelAnimationFrame(frame);
    if (reduced.matches || instant) { position = target; velocity = 0; render(); return; }
    let last = performance.now();
    function tick(now: number) {
      const next = spring(position, velocity, target, (now - last) / 1000);
      position = next.position; velocity = next.velocity; last = now;
      render();
      if (Math.abs(position - target) > .001 || Math.abs(velocity) > .005) frame = requestAnimationFrame(tick);
      else { position = target; velocity = 0; render(); }
    }
    frame = requestAnimationFrame(tick);
  }
  function finish(off: boolean, instant = false) {
    removed = off;
    button.setAttribute('aria-pressed', String(off));
    button.setAttribute('aria-label', off ? 'Stick portrait back' : 'Peel portrait sticker');
    settle(off ? -.6 : .5, instant);
  }
  button.disabled = false;
  button.addEventListener('dragstart', e => e.preventDefault());
  button.addEventListener('pointerdown', e => {
    if (!e.isPrimary || e.button !== 0 || drag) return;
    dragged = false;
    if (removed) return;
    cancelAnimationFrame(frame);
    const rect = button.getBoundingClientRect();
    position = .5; velocity = 0;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, size: rect.width, last: position, time: e.timeStamp };
    button.setPointerCapture(e.pointerId);
    button.dataset.dragging = 'true';
    render();
  });
  window.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y, travel = Math.hypot(dx, dy);
    if (travel < 6) {
      position = .5; velocity = 0;
      drag.last = position; drag.time = e.timeStamp;
      render();
      return;
    }
    dragged = true;
    // The crease turns with the pull; returning to the grab point lays it flat.
    normal = { x: -dx / travel, y: -dy / travel };
    // A folded edge travels twice as far as its crease.
    position = Math.max(-.6, Math.min(.5, edgeDistance() - travel / (2 * drag.size)));
    const seconds = Math.max(.008, (e.timeStamp - drag.time) / 1000);
    velocity = .5 * velocity + .5 * (position - drag.last) / seconds;
    drag.last = position; drag.time = e.timeStamp;
    render();
  });
  function release(e: PointerEvent, cancelled = false) {
    if (!drag || e.pointerId !== drag.id) return;
    const id = drag.id;
    if (e.timeStamp - drag.time > 100) velocity = 0;
    drag = null;
    delete button.dataset.dragging;
    if (button.hasPointerCapture(id)) button.releasePointerCapture(id);
    if (cancelled) finish(false);
    else if (dragged) finish(velocity < 1.2 && (position < 0 || (position < .3 && velocity < -1.2)));
  }
  window.addEventListener('pointerup', e => release(e));
  window.addEventListener('pointercancel', e => release(e, true));
  button.addEventListener('lostpointercapture', e => release(e, true));
  button.addEventListener('click', e => {
    if (e.detail && dragged) { dragged = false; return; }
    if (removed) finish(false, e.detail === 0);
  });
  button.addEventListener('keydown', e => {
    if (!removed && ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      cancelAnimationFrame(frame);
      velocity = 0;
      position = Math.min(.5, position + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -.12 : .12));
      if (position < 0) finish(true, true);
      else render();
    }
    if (e.key === 'Escape') { if (drag) { button.releasePointerCapture(drag.id); drag = null; delete button.dataset.dragging; } finish(false, true); }
  });
  window.addEventListener('blur', () => { if (drag) { const id = drag.id; drag = null; button.releasePointerCapture(id); delete button.dataset.dragging; finish(false, true); } });
  reduced.addEventListener('change', () => { if (!drag) finish(removed, true); });
  window.addEventListener('resize', () => { if (drag) { const id = drag.id; drag = null; button.releasePointerCapture(id); delete button.dataset.dragging; } finish(removed, true); });
  render();
}
