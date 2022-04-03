import { Enemy } from "enemy";
import { Component, Engine, Query, MotionComponent, Vector, Text, Font, Actor, vec, CollisionType, EasingFunctions, ImageFiltering } from "excalibur";
import { Level } from "./level";
import { WaveDispatcher } from "./wave-dispatcher";

export class GameOver {
    enemyQuery: Query<Component<'enemy'>>;
    gameOverActor: Actor;
    restartGame$: HTMLElement | null;
    constructor(private engine: Engine, private level: Level, private waveDispatcher: WaveDispatcher) {
        this.enemyQuery = this.engine.currentScene.world.queryManager.createQuery(['enemy']);

        const gameOverText = new Text({
            text: 'Game Over',
            font: new Font({
                size: 64,
                family: 'Kanit, sans-serif',
                quality: 4,
                smoothing: true,
                filtering: ImageFiltering.Blended
            })
        });

        this.gameOverActor = new Actor({
            pos: vec(engine.screen.center.x, 800),
            z: 10,
            collisionType: CollisionType.PreventCollision
        });
        this.gameOverActor.graphics.use(gameOverText);
        engine.currentScene.add(this.gameOverActor);

        const restartGame$ = document.getElementById('restart-game');
        restartGame$?.addEventListener('click', () => this.restart());

        this.restartGame$ = restartGame$;
    }

    triggerGameOver() {
        this.waveDispatcher.stop();
        const enemies = this.enemyQuery.getEntities();
        for (let enemy of enemies) {
            const motion = enemy.get(MotionComponent);
            if (motion) {
                setTimeout(() => {
                    (enemy as Enemy).stop();
                    motion.vel = Vector.Zero;
                });
            }
        }

        this.gameOverActor.actions.easeTo(vec(this.engine.screen.center.x, 200), 1000, EasingFunctions.EaseInOutCubic).blink(2000, 1000);
        this.restartGame$!.style.visibility = 'visible';
    }

    restart() {
        this.level.restart();
        this.restartGame$!.style.visibility = 'hidden';
    }
}