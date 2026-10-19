/**
 * High-performance Heart & Rose Petal Confetti Burst Canvas Engine
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
  shape: 'heart' | 'petal' | 'sparkle';
}

export function fireHeartConfetti(originX?: number, originY?: number) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = [
    '#E2728D', // Dusty Rose
    '#F4A6B8', // Blush Pink
    '#D4AF37', // Champagne Gold
    '#FAF5EE', // Ivory
    '#C47B89', // Rose Pink
    '#E63946', // Deep Romantic Red
    '#FFCAD4', // Cotton Pink
  ];

  const particles: Particle[] = [];
  const startX = originX ?? width / 2;
  const startY = originY ?? height * 0.45;

  const count = 120;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    const shapes: ('heart' | 'petal' | 'sparkle')[] = ['heart', 'heart', 'petal', 'sparkle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
      vy: Math.sin(angle) * speed - (Math.random() * 6 + 3), // Initial upward burst
      size: Math.random() * 14 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      opacity: 1,
      decay: Math.random() * 0.008 + 0.007,
      shape,
    });
  }

  function drawHeart(c: CanvasRenderingContext2D, size: number) {
    const s = size / 20;
    c.beginPath();
    c.moveTo(0, -5 * s);
    c.bezierCurveTo(-10 * s, -18 * s, -20 * s, 0, 0, 16 * s);
    c.bezierCurveTo(20 * s, 0, 10 * s, -18 * s, 0, -5 * s);
    c.fill();
  }

  function drawPetal(c: CanvasRenderingContext2D, size: number) {
    c.beginPath();
    c.ellipse(0, 0, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
    c.fill();
  }

  function drawSparkle(c: CanvasRenderingContext2D, size: number) {
    const s = size * 0.6;
    c.beginPath();
    c.moveTo(0, -s);
    c.quadraticCurveTo(0, 0, s, 0);
    c.quadraticCurveTo(0, 0, 0, s);
    c.quadraticCurveTo(0, 0, -s, 0);
    c.quadraticCurveTo(0, 0, 0, -s);
    c.fill();
  }

  let animationFrameId: number;
  function update() {
    ctx?.clearRect(0, 0, width, height);
    let activeCount = 0;

    for (const p of particles) {
      if (p.opacity <= 0) continue;
      activeCount++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravity
      p.vx *= 0.985; // Air drag
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (!ctx) continue;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.shape === 'heart') {
        drawHeart(ctx, p.size);
      } else if (p.shape === 'petal') {
        drawPetal(ctx, p.size);
      } else {
        drawSparkle(ctx, p.size);
      }
      ctx.restore();
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  update();
}
