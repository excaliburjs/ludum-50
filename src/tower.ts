import config from "./config";
import { Actor, CollisionGroup, CollisionType, Color, Engine, Tile, vec, Vector } from "excalibur";
import { Resources } from "./resources";
import { Grid } from "./grid";
import { Enemy } from "./enemy";

export class Tower extends Actor {
    private _engine!: Engine;
    private _grid: Grid;
    healthBar: Actor;
    currentHp: number = 5;
    maxHealth: number = 5;
    damage: number = 1;
    private healthBarOpacity: number = 1;
    private healthBarOpacityFade : number = 3;
    private row: Tile[];
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
        this.row = this._grid.tileMap.getRows()[y];
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

    private _currentFireTimer: number = 0;
    onPostUpdate(_engine: Engine, updateMs: number) {
        if(this.row.find(tile => Enemy.enemiesInTile(tile))){
            this._currentFireTimer += updateMs;
        }
        if(this.healthBarOpacity > 0){
            this.healthBarOpacity =  this.healthBarOpacity - 1 * updateMs / 1000 / this.healthBarOpacityFade;
            this.healthBar.graphics.opacity = this.healthBarOpacity;
        }
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
            enemy.takeDamage(this.damage);
            bullet.kill();
        })

        bullet.on('exitviewport', () => {
            bullet.kill();
        });

        this._engine.add(bullet);
    }

    takeDamage(damage: number) {
        this.currentHp -= damage;
        const pixelsPerHp = config.healthBarWidthPixels / this.maxHealth;
        const graphic = this.healthBar.graphics.current[0].graphic;
        graphic.width = this.currentHp * pixelsPerHp;
        this.healthBarOpacity = 1;

        if (this.currentHp <= 0) {
            this._grid.tileMap.getTileByPoint(this.pos).data.delete("tower");
            this.kill();
        }
        else if (this.currentHp <= (this.maxHealth/4)) {
            this.healthBar.color = Color.Red;
        }
        else if (this.currentHp <= (this.maxHealth/2)) {
            this.healthBar.color = Color.Yellow;
        }
    }
}