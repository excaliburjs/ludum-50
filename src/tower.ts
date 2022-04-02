import config from "./config";
import { Actor, CollisionGroup, CollisionType, Color, Engine, Tile, vec, Vector } from "excalibur";
import { Resources } from "./resources";
import { Grid } from "./grid";
import { Enemy } from "./enemy";
import { PlayerState } from "./playerState";

export class Tower extends Actor {
    private _engine!: Engine;
    private _grid: Grid;
    healthBar: Actor;
    currentHp: number = 5;
    maxHealth: number;
    cost: number;
    type: TowerType;
    private healthBarOpacity: number = 1;
    private healthBarOpacityFade : number = 3;
    private row: Tile[];
    constructor(towerType: TowerType, grid: Grid, x: number, y: number) {
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
        this.type = towerType;
        this.maxHealth = config.tower[this.type].maxHealth;
        this.cost = config.tower[this.type].cost;

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
    private _resourceTimer: number = 0;
    onPostUpdate(_engine: Engine, updateMs: number) {
        if(this.row.find(tile => Enemy.enemiesInTile(tile))){
            this._currentFireTimer += updateMs;
        }
        if(this.healthBarOpacity > 0){
            this.healthBarOpacity =  this.healthBarOpacity - 1 * updateMs / 1000 / this.healthBarOpacityFade;
            this.healthBar.graphics.opacity = this.healthBarOpacity;
        }
        if (this._currentFireTimer > config.tower[this.type].baseTowerFireRateMs) {
            this.fire();
            this._currentFireTimer = 0;
        }
        if (this._resourceTimer > config.tower[this.type].resourceSpawnTimer) {
            this._resourceTimer = 0;
            PlayerState.moneyResource += config.tower[this.type].resourceSpawnValue;
        }
    }

    fire = () => {
        // Fire bullet and add to engine
        const bullet = new Actor({
            name: "Tower Bullet",
            pos: this.pos,
            vel: vec(config.tower[this.type].bulletSpeedPixelsPerSecond, 0),
            radius: config.tower[this.type].bulletRadius,
            color: Color.Black,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroup]),
            collisionType: CollisionType.Passive
        })

        bullet.on('precollision', (evt) => {
            const enemy = evt.other as Enemy;
            enemy.takeDamage(config.tower[this.type].bulletDamage);
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

export enum TowerType {
    default = 'default'
}