import config from "./config";
import { Actor, Color, Vector } from "excalibur";

export class Enemy extends Actor {

    public health = config.crabHealth;

    constructor(x: number, y: number) {
        super({
            x, y, 
            width: config.crabWidth, 
            height: config.crabHeight, 
            color: Color.Red, 
            vel: new Vector(-1 * config.crabSpeed, 0),
        });
    }
}