import config from "./config";
import { Actor, CollisionType, Color, Engine, vec, Vector } from "excalibur";
import { Resources } from "./resources";
import { Grid } from "./grid";

export class Tower extends Actor {
    private _engine!: Engine;
    constructor(grid: Grid, x: number, y: number) {
        super({
            name: "Base Tower",
            pos: grid.tileMap.getTile(x, y).pos.add(vec(config.tileWidth/2, config.tileHeight/2)),
            width: config.tileWidth,
            height: config.tileHeight,
            collisionType: CollisionType.Fixed
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
            color: Color.Black
        })

        this._engine.add(bullet);
    }
}