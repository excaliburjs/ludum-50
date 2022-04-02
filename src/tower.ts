import config from "./config";
import { Actor, CollisionGroup, CollisionType, Color, Engine, vec, Vector } from "excalibur";
import { Resources } from "./resources";
import { Grid } from "./grid";
import { Enemy } from "./enemy";

export class Tower extends Actor {
    private _engine!: Engine;
    private _grid: Grid;
    healthBar: Actor;
    currentHp: number = 5;
    maxHealth: number = 5;
    constructor(grid: Grid, x: number, y: number) {
        super({
            name: "Base Tower",
            pos: grid.tileMap.getTile(x, y).pos.add(vec(config.grid.tileWidth/2, config.grid.tileHeight/2)),
            width: config.grid.tileWidth,
            height: config.grid.tileHeight,
            collisionType: CollisionType.Fixed,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroup]),
        });

        this._grid = grid;
        const towerSprite = Resources.BaseTower.toSprite()

        this.graphics.use(towerSprite);

        // draw health bar
        this.healthBar = new Actor({
            name: 'Healthbar',
            pos: vec(0, -10),
            width: config.healthBarWidthPixels,
            height: 5,
            color: Color.Green,
            collisionType: CollisionType.PreventCollision
        });
        this.addChild(this.healthBar);
    }

    onInitialize(engine: Engine) {
        this._engine = engine;
    }

    private _currentFireTimer = 0;
    onPostUpdate(_engine: Engine, updateMs: number) {
        this._currentFireTimer += updateMs;
        if (this._currentFireTimer > config.tower.default.baseTowerFireRateMs) {
            this.fire();
            this._currentFireTimer = 0;
        }
    }

    fire = () => {
        // Fire bullet and add to engine
        const bullet = new Actor({
            name: "Tower Bullet",
            pos: this.pos,
            vel: vec(config.tower.default.bulletSpeedPixelsPerSecond, 0),
            radius: config.tower.default.bulletRadius,
            color: Color.Black,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroup]),
            collisionType: CollisionType.Passive
        })

        bullet.on('precollision', (evt) => {
            const enemy = evt.other as Enemy;
            enemy.takeDamage();
            bullet.kill();
        })

        bullet.on('exitviewport', () => {
            bullet.kill();
        });

        this._engine.add(bullet);
    }

    takeDamage() {
        this.currentHp -= 1;
        const pixelsPerHp = config.healthBarWidthPixels / this.maxHealth;
        const graphic = this.healthBar.graphics.current[0].graphic;
        graphic.width = this.currentHp * pixelsPerHp;
        if (this.currentHp <= 0) {
            this._grid.tileMap.getTileByPoint(this.pos).data.delete("tower");
            this.kill();
        }
    }
}