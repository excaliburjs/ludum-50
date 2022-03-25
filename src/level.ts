import { Actor, Engine, Random, Scene, vec } from "excalibur";
import { Resources } from "./resources";
import config from "./config";

export class Level extends Scene {
    random = new Random(config.Seed);
    onInitialize(_engine: Engine): void {
        const actor = new Actor({
            pos: vec(this.random.floating(100, 500), this.random.floating(100, 500)),
        });
        actor.graphics.use(Resources.Sword.toSprite());
        this.add(actor);
    }
}