import config from "./config";
import { Actor, CollisionType, vec, EasingFunctions } from "excalibur";
import { Grid } from "./grid";
import { Resources } from "./resources";


export class Water extends Actor {
    constructor(private grid: Grid, xoffset: number, tiley: number, private phaseYOffset: number, private delay: number) {
        const endPos = grid.tileMap.getTile(config.grid.width - 1, 0).pos;
        super({
            name: "Water",
            pos: vec(endPos.x + xoffset, tiley * config.grid.tileHeight - config.grid.tileHeight * 2 + phaseYOffset),
            width: config.grid.tileWidth,
            height: config.grid.tileHeight,
            collisionType: CollisionType.PreventCollision
        })

        const waterSprite = Resources.Water.toSprite();
        this.graphics.use(waterSprite);
    }

    onInitialize() {
        const originalPos = this.pos.clone();
        this.actions.delay(this.delay);
        this.actions.repeatForever(ctx => {
            ctx.easeTo(originalPos.add(vec(-20, 0)), 3000, EasingFunctions.EaseInOutCubic);
            ctx.easeTo(originalPos.add(vec(20, 0)), 3000, EasingFunctions.EaseInOutCubic);
        })
    }
}