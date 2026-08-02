import type { GlyphConfig } from "./languages";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alphaDelta: number;
  phase: number;
  glyph: string;
  sprite: HTMLCanvasElement;
}

export interface ParticleOptions {
  count?: number;
  minSize?: number;
  maxSize?: number;
  repelRadius?: number;
}

const SPRITE_SIZE = 128;

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function pickWeighted(configs: GlyphConfig[]): GlyphConfig {
  const total = configs.reduce((sum, c) => sum + (c.weight ?? 1), 0);
  let roll = Math.random() * total;
  for (const config of configs) {
    roll -= config.weight ?? 1;
    if (roll <= 0) return config;
  }
  return configs[0];
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private w = 0;
  private h = 0;
  private particles: Particle[] = [];
  private sprites = new Map<string, HTMLCanvasElement>();
  private configs: GlyphConfig[];
  private opts: Required<ParticleOptions>;
  private paused = false;
  private pointer = { x: -9999, y: -9999 };
  private onResize: () => void;
  private onMove: (e: MouseEvent) => void;

  constructor(canvas: HTMLCanvasElement, configs: GlyphConfig[], opts: ParticleOptions = {}) {
    this.canvas = canvas;
    this.configs = configs;
    this.opts = {
      count: opts.count ?? 60,
      minSize: opts.minSize ?? 26,
      maxSize: opts.maxSize ?? 64,
      repelRadius: opts.repelRadius ?? 110,
    };
    this.ctx = canvas.getContext("2d")!;
    configs.forEach((c) => this.sprites.set(c.glyph, this.renderSprite(c)));

    this.onResize = () => this.resize();
    this.onMove = (e) => {
      this.pointer.x = e.clientX;
      this.pointer.y = e.clientY;
    };
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("mousemove", this.onMove, { passive: true });

    this.resize();
    this.initParticles();
  }

  private renderSprite(config: GlyphConfig): HTMLCanvasElement {
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE_SIZE;
    const sctx = sprite.getContext("2d")!;
    const center = SPRITE_SIZE / 2;

    const glow = sctx.createRadialGradient(center, center, 0, center, center, center);
    glow.addColorStop(0, hexToRgba(config.glow, 0.5));
    glow.addColorStop(0.55, hexToRgba(config.glow, 0.12));
    glow.addColorStop(1, "rgba(0,0,0,0)");
    sctx.fillStyle = glow;
    sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

    const fontSize = Math.max(22, Math.min(50, Math.floor(SPRITE_SIZE / (config.glyph.length * 0.72))));
    sctx.font = `700 ${fontSize}px var(--font-geist-mono), ui-monospace, monospace`;
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";

    sctx.fillStyle = "rgba(0,0,0,0.4)";
    sctx.fillText(config.glyph, center + 2, center + 3);
    sctx.fillStyle = config.color;
    sctx.fillText(config.glyph, center, center);
    return sprite;
  }

  private initParticles() {
    const areaFactor = Math.round((this.w * this.h) / 28000);
    const count = Math.min(this.opts.count, Math.max(24, areaFactor));
    this.particles = Array.from({ length: count }, () => {
      const config = pickWeighted(this.configs);
      const size = this.opts.minSize + Math.random() * (this.opts.maxSize - this.opts.minSize);
      return {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 4,
        vy: -(2 + Math.random() * 5),
        size,
        baseAlpha: 0.12 + Math.random() * 0.3,
        alphaDelta: 0.04 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2,
        glyph: config.glyph,
        sprite: this.sprites.get(config.glyph)!,
      };
    });
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = this.canvas.clientWidth || window.innerWidth;
    this.h = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  setPaused(paused: boolean) {
    this.paused = paused;
  }

  frame(dt: number) {
    if (this.paused) return;
    this.update(dt);
    this.draw();
  }

  drawStatic() {
    this.draw();
  }

  private update(dt: number) {
    const { w, h, pointer, opts } = this;
    for (const p of this.particles) {
      p.phase += dt * 0.4;
      p.x += (p.vx + Math.sin(p.phase) * 7) * dt;
      p.y += p.vy * dt;

      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist2 = dx * dx + dy * dy;
      const radius = opts.repelRadius;
      if (dist2 < radius * radius && dist2 > 0.01) {
        const dist = Math.sqrt(dist2);
        const force = (radius - dist) / radius;
        p.x += (dx / dist) * force * 42 * dt;
        p.y += (dy / dist) * force * 42 * dt;
      }

      const margin = p.size;
      if (p.x < -margin) p.x = w + margin;
      else if (p.x > w + margin) p.x = -margin;
      if (p.y < -margin) p.y = h + margin;
      else if (p.y > h + margin) p.y = -margin;
    }
  }

  private draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (const p of this.particles) {
      const alpha = Math.max(0, Math.min(0.5, p.baseAlpha + Math.sin(p.phase) * p.alphaDelta));
      ctx.globalAlpha = alpha;
      ctx.drawImage(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("mousemove", this.onMove);
    this.particles = [];
    this.sprites.clear();
  }
}
