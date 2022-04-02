import config from "./config";
import { Actor, CollisionGroup, CollisionType, Color, Engine, vec, Vector } from "excalibur";
import { Resources } from "./resources";
import { Grid } from "./grid";
import { Enemy } from "./enemy";

export class Tower extends Actor {
    private _engine!: Engine;
    constructor(grid: Grid, x: number, y: number) {
        super({
            name: "Base Tower",
            pos: grid.tileMap.getTile(x, y).pos.add(vec(config.tileWidth/2, config.tileHeight/2)),
            width: config.tileWidth,
            height: config.tileHeight,
            collisionType: CollisionType.Fixed,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroup]),
        });

        const towerSprite = Resources.BaseTower.toSprite()

        this.graphics.use(towerSprite);
    }

    onInitialize(engine: Engine) {
        this._engine = engine;
    }

    private _currentFireTimer = 0;
    onPostUpdate(_engine: Engine, updateMs: number) {
        this._currentFireTimer += updateMs;
        if (this._currentFireTimer > config.baseTowerFireRateMs) {
            this.fire();
            this._currentFireTimer = 0;
        }
    }

    fire = () => {
        // Fire bullet and add to engine
        const bullet = new Actor({
            name: "Tower Bullet",
            pos: this.pos,
            vel: vec(config.bulletSpeedPixelsPerSecond, 0),
            radius: config.bulletRadius,
            color: Color.Black,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroup]),
            collisionType: CollisionType.Active
        })

        bullet.on('postcollision', (evt) => {
            const enemy = evt.other as Enemy;
            enemy.takeDamage();
            bullet.kill();
        })

        bullet.on('exitviewport', () => {
            bullet.kill();
        });

        this._engine.add(bullet);
    }
}