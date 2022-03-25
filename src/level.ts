import { Actor, Engine, Scene, vec } from "excalibur";
import { Resources } from "./resources";

export class Level extends Scene {
    onInitialize(_engine: Engine): void {
        const actor = new Actor({
            pos: vec(100, 100),
        });
        actor.graphics.use(Resources.Sword.toSprite());
        this.add(actor);
    }
}