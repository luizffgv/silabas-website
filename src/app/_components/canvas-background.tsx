"use client";

import styles from "./canvas-background.module.css";
import { useEffect, useRef } from "react";

/**
 * Clamps a value between two values.
 *
 * @param min - Minimum result value.
 * @param value - Preferred result value.
 * @param max - Maximum result value.
 * @returns Clamped value.
 */
function clamp(min: number, value: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** A simulated particle. */
interface Particle {
  /** X position. */
  x: number;
  /** Y position. */
  y: number;
  /** X velocity. */
  vx: number;
  /** Y velocity. */
  vy: number;
  /** Particle width and height. */
  size: number;
}

/** A canvas particle simulation. */
class Simulation {
  /** Maximum particle speed. */
  private static MAX_PARTICLE_SPEED = 50;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private canvasStyle: CSSStyleDeclaration;

  /**
   * Creates a new {@link Simulation}.
   *
   * @param canvas - Canvas to draw on.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (ctx == null) throw new Error("Couldn't get 2D canvas context.");
    this.ctx = ctx;

    this.canvasStyle = getComputedStyle(canvas);

    for (let particleIndex = 0; particleIndex < 50; ++particleIndex)
      this.particles.push(this.makeNewParticle());

    this.advance(0);
  }

  /** Spawns a new particle, but doesn't add it to {@link particles}. */
  private makeNewParticle(): Particle {
    const size = Math.floor(Math.random() * 3) + 1;

    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + size / 2,
      vx: 0,
      vy: 0,
      size,
    };
  }

  /**
   * Advances the simulation.
   *
   * @param dt - Milliseconds to advance.
   */
  advance(dt: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.canvasStyle.color;
    this.ctx.shadowColor = this.canvasStyle.color;
    this.ctx.shadowBlur = 5;

    for (let particle of this.particles) {
      const halfSize = particle.size / 2;

      if (
        particle.x + halfSize < -1 ||
        particle.x - halfSize > this.canvas.width + 1 ||
        particle.y + halfSize < -1 ||
        particle.y - halfSize > this.canvas.height + 1
      )
        Object.assign(particle, this.makeNewParticle());

      particle.vx = clamp(
        -Simulation.MAX_PARTICLE_SPEED,
        particle.vx + ((Math.random() - 0.5) * 500 * dt) / 1000,
        Simulation.MAX_PARTICLE_SPEED
      );
      particle.vy = clamp(
        -Simulation.MAX_PARTICLE_SPEED,
        particle.vy + ((Math.random() - 0.51) * 500 * dt) / 1000,
        Simulation.MAX_PARTICLE_SPEED
      );

      particle.x += (particle.vx * dt) / 1000;
      particle.y += (particle.vy * dt) / 1000;

      this.ctx.globalAlpha = particle.y / this.canvas.height;
      this.ctx.fillRect(
        particle.x + halfSize,
        particle.y + halfSize,
        particle.size,
        particle.size
      );
    }
  }
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onResize = () => {
      canvasRef.current!.width = innerWidth;
      canvasRef.current!.height = innerHeight;
    };

    addEventListener("resize", onResize);

    onResize();

    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    try {
      const simulation = new Simulation(canvasRef.current!);

      let frameID: number | null = null;

      let lastTime: number | null = null;
      const update = (time: DOMHighResTimeStamp) => {
        const dt = time - (lastTime ?? time);
        lastTime = time;

        simulation.advance(dt);

        frameID = requestAnimationFrame(update);
      };
      requestAnimationFrame(update);

      return () => {
        if (frameID != null) cancelAnimationFrame(frameID);
      };
    } catch (e) {
      console.error(`Failed to create canvas simulation: ${e}`);
    }
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
}
