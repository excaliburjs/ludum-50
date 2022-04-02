import config from "./config";
import { Actor, Color, Vector, CollisionGroupManager, CollisionType } from "excalibur";

export class Enemy extends Actor {
    public static CollisionGroup = CollisionGroupManager.create("enemy");

    public health = config.crabHealth;

    constructor(x: number, y: number) {
        super({
            name: "Enemey",
            x, y, 
            width: config.crabWidth, 
            height: config.crabHeight, 
            color: Color.Red, 
            vel: new Vector(-1 * config.crabSpeed, 0),
            collisionType: CollisionType.Active,
            collisionGroup: Enemy.CollisionGroup
        });
    }
}