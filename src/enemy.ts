import config from "./config";
import { Actor, Color, Vector, CollisionGroupManager, CollisionType } from "excalibur";

export class Enemy extends Actor {
    public static CollisionGroup = CollisionGroupManager.create("enemy");

    public health: number;
    public damage: number;
    type: EnemyType;

    constructor(type: EnemyType, x: number, y: number) {
        const configValues = config.enemy[type];
        super({
            name: "Enemy",
            x, y, 
            width: configValues.width, 
            height: configValues.height, 
            color: configValues.color, 
            vel: new Vector(-1 * configValues.speed, 0), // moves horizontally, right to left
        });
        this.type = type;
        this.health = configValues.health;
        this.damage = configValues.damage;
    }

    takeDamage() {
        this.kill();
    }
}

export enum EnemyType {
    Crab = 'crab',
    Turtle = 'turtle',
    // others?
}
