import config from "./config";
import { Actor, Vector, CollisionGroupManager, CollisionType, PostCollisionEvent, KillEvent, Engine, Tile, Color, vec } from "excalibur";
import { Tower } from "./tower";
import { Grid } from "grid";
import { Healthbar } from "./healthbar";
import { Resources } from './resources';

export class Enemy extends Actor {
    public static CollisionGroup = CollisionGroupManager.create("enemy");

    public maxHealth: number;
    private currentHp: number;
    public damage: number;
    type: EnemyType;
    private _grid: Grid;
    private _configValues;
    private _currentAttackingTower: Tower | null = null;
    private _occupiedTile: Tile | null = null;
    private static TileDataEnemyCounterKey = "enemies";
    healthBar: Healthbar;

    // @ts-ignore
    constructor(type: EnemyType, grid: Grid, x: number, y: number) {        
        const configValues = config.enemy[type];
        super({
            name: "Enemy",
            x, y, 
            width: configValues.width, 
            height: configValues.height, 
            color: configValues.color, 
            collisionType: CollisionType.Active,
            collisionGroup: Enemy.CollisionGroup,
            vel: new Vector(-1 * configValues.speed, 0), // moves horizontally, right to left
        });
        this.addTag('enemy');
        this.type = type;
        this._grid = grid;
        this._configValues = configValues;
        this.maxHealth = this._configValues.health;
        this.currentHp = this.maxHealth;
        this.damage = this._configValues.damage;
        this.on('postcollision', (evt) => this.onPostCollision(evt));
        this.on('kill', (ke) => this.onKill(ke));

          // draw health bar
        this.healthBar = new Healthbar(this.maxHealth);
        this.addChild(this.healthBar);
    }

    takeDamage(damage: number) {
        this.currentHp-= damage;
        this.healthBar.takeDamage(damage);

        Resources.FxImpactEnemyRock.play();
      
        if (this.currentHp <= 0) {
            this.kill();
        }
    }

    private _stopped = false;
    stop() {
        this._stopped = true;
    }

    isAttacking() {
        if (this._currentAttackingTower) {
            return this._currentAttackingTower.active;
        }
        return false;
    }

    static addEnemyToTile(tile: Tile) {
        if(tile.data.has(Enemy.TileDataEnemyCounterKey))
        {
            tile.data.set(Enemy.TileDataEnemyCounterKey, tile.data.get(Enemy.TileDataEnemyCounterKey) + 1);
        }
        else {
            tile.data.set(Enemy.TileDataEnemyCounterKey, 1);
        }
    }

    static removeEnemyFromTile(tile: Tile) {
            const enemyCounter = this.enemiesInTile(tile);
            if (enemyCounter <= 1)
            {
                tile.data.delete(Enemy.TileDataEnemyCounterKey);
            }
            tile.data.set(Enemy.TileDataEnemyCounterKey, enemyCounter - 1);
    }

    static enemiesInTile(tile: Tile): number {
        if(tile.data.has(Enemy.TileDataEnemyCounterKey))
            return tile.data.get(Enemy.TileDataEnemyCounterKey);
        return 0;
    }

    onKill(killEvent: KillEvent) {
        if(this._occupiedTile != null) {
            Enemy.removeEnemyFromTile(this._occupiedTile);
        }
    }

    claimTile(tile: Tile) {
        if(this._occupiedTile == tile)
            return;

        if (this._occupiedTile != null) {
            Enemy.removeEnemyFromTile(this._occupiedTile);
        }
        this._occupiedTile = tile;
        if (this._occupiedTile != null) {
            Enemy.addEnemyToTile(this._occupiedTile);
        }
    }

    private _damageTimer = 0;
    onPostCollision(evt: PostCollisionEvent) {
        if (evt.other instanceof Tower) {
            if (this._damageTimer <= 0) {
                this._damageTimer = this._configValues.damageTimerMs;
                const tower = evt.other as Tower;
                tower.takeDamage(this.damage);
            }
            this.vel = new Vector(0,0);
        }
    }

    onPostUpdate(_engine: Engine, deltaMs: number) {
        if (this._stopped) return;
        this._damageTimer -= deltaMs;
        const curTile = this._grid.tileMap.getTileByPoint(this.pos.sub(vec(this.width/2, 0)));
        this.claimTile(curTile);

        if (!this.isAttacking()) {
            this.vel = new Vector(-1 * config.enemy[this.type].speed, 0)
        }
    }
}

// The values for these enemy types must match the property names of config.enemy 
export enum EnemyType {
    Crab = 'crab',
    Turtle = 'turtle',
    // others?
}
