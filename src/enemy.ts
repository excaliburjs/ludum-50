import config from "./config";
import { Actor, Color, Vector, CollisionGroupManager, CollisionType, PostCollisionEvent, Engine } from "excalibur";
import { Tower } from "./tower";

export class Enemy extends Actor {
    public static CollisionGroup = CollisionGroupManager.create("enemy");

    public health: number;
    public damage: number;
    type: EnemyType;
    private _currentAttackingTower: Tower | null = null;

    constructor(type: EnemyType, x: number, y: number) {
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
        this.type = type;
        this.health = configValues.health;
        this.damage = configValues.damage;
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.kill();
        }
    }

    isAttacking() {
        if (this._currentAttackingTower) {
            return this._currentAttackingTower.active;
        }
        return false;
    }

    private _damageTimer = 0;
    onPostCollision(evt: PostCollisionEvent) {
        if (evt.other instanceof Tower) {
            if (this._damageTimer <= 0) {
                this._damageTimer = config.enemyDamageTimerMs;
                const tower = evt.other as Tower;
                tower.takeDamage();
            }
        }
    }

    onPostUpdate(_engine: Engine, deltaMs: number) {
        this._damageTimer -= deltaMs;

        if (!this.isAttacking()) {
            this.vel = new Vector(-1 * config.enemy[this.type].speed, 0)
        }
    }
}

export enum EnemyType {
    Crab = 'crab',
    Turtle = 'turtle',
    // others?
}