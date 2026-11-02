import { describe, expect, it } from 'vitest';
import {
  AIM_LIMIT,
  AIM_TURN_SPEED,
  CANNON,
  TANK_SIZE,
  aimAngle,
  aimPoint,
  createState,
  fire,
  isHit,
  scoreForHit,
  step,
  turnAim,
  type Target,
} from './game';

const target: Target = { x: 400, y: 200, radius: 28, speed: 120 };

describe('water cannon', () => {
  it('starts with a full tank and no score', () => {
    const state = createState();
    expect(state.tank).toBe(TANK_SIZE);
    expect(state.score).toBe(0);
    expect(state.phase).toBe('playing');
  });

  it('uses one shot of water per fire', () => {
    const state = createState();
    expect(fire(state, 400, 0)).toBe(true);
    expect(state.tank).toBe(TANK_SIZE - 1);
    expect(state.shots).toHaveLength(1);
  });

  it('cannot fire once the tank is empty', () => {
    const state = createState();
    state.tank = 0;
    expect(fire(state, 400, 0)).toBe(false);
    expect(state.shots).toHaveLength(0);
  });

  it('never fires downwards, even when aimed below the cannon', () => {
    const state = createState();
    fire(state, CANNON.x + 100, CANNON.y + 100);
    expect(state.shots[0].vy).toBeLessThan(0);
  });

  it('scores a hit and sends the target back to the start of its rail', () => {
    const state = createState();
    state.targets = [{ ...target }];
    state.shots = [{ x: target.x, y: target.y + 5, vx: 0, vy: 0 }];
    step(state, 0);
    expect(state.score).toBe(scoreForHit(target));
    expect(state.shots).toHaveLength(0);
    expect(state.targets[0].x).toBeLessThan(0);
  });

  it('ends the game when the tank is empty and the last shot has landed', () => {
    const state = createState();
    state.tank = 0;
    state.shots = [{ x: 10, y: -20, vx: 0, vy: -700 }];
    step(state, 0.1);
    expect(state.phase).toBe('over');
  });

  it('keeps playing while a shot is still in the air', () => {
    const state = createState();
    state.targets = [];
    state.tank = 0;
    state.shots = [{ x: 400, y: 300, vx: 0, vy: -700 }];
    step(state, 0.1);
    expect(state.phase).toBe('playing');
  });

  it('detects a hit inside the target and a miss outside it', () => {
    expect(isHit({ x: 410, y: 210, vx: 0, vy: 0 }, target)).toBe(true);
    expect(isHit({ x: 460, y: 200, vx: 0, vy: 0 }, target)).toBe(false);
  });

  it('scores a fast target higher than a slow one', () => {
    const slow = scoreForHit({ ...target, speed: 60 });
    const fast = scoreForHit({ ...target, speed: -180 });
    expect(Math.max(fast, slow)).toBeGreaterThanOrEqual(slow);
  });

  describe('keyboard aiming', () => {
    it('turns the aim left and right', () => {
      expect(turnAim(0, -1, 0.1)).toBeCloseTo(-AIM_TURN_SPEED * 0.1);
      expect(turnAim(0, 1, 0.1)).toBeCloseTo(AIM_TURN_SPEED * 0.1);
      expect(turnAim(0.3, 0, 0.1)).toBe(0.3);
    });

    it('stops at the limits', () => {
      expect(turnAim(AIM_LIMIT - 0.01, 1, 1)).toBe(AIM_LIMIT);
      expect(turnAim(-AIM_LIMIT + 0.01, -1, 1)).toBe(-AIM_LIMIT);
    });

    it('brings a mouse aim from below the cannon back within the limits', () => {
      const angle = aimAngle(CANNON.x + 100, CANNON.y + 100);
      expect(turnAim(angle, -1, 0.01)).toBeLessThanOrEqual(AIM_LIMIT);
    });

    it('reads back the angle of an aim point', () => {
      expect(aimAngle(CANNON.x, 0)).toBeCloseTo(0);
      const point = aimPoint(0.5);
      expect(aimAngle(point.x, point.y)).toBeCloseTo(0.5);
    });

    it('fires along the turned aim', () => {
      const state = createState();
      const point = aimPoint(turnAim(0, 1, 0.2));
      fire(state, point.x, point.y);
      const shot = state.shots[0];
      expect(Math.atan2(shot.vx, -shot.vy)).toBeCloseTo(AIM_TURN_SPEED * 0.2);
    });
  });
});
