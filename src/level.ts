import { Actor, Engine, Random, Scene, vec } from "excalibur";
import { Resources } from "./resources";
import config from "./config";
import { Grid } from "./grid";

export class Level extends Scene {
    random = new Random(config.Seed);
    grid!: Grid;
    onInitialize(_engine: Engine): void {
        this.grid = new Grid(vec(config.tileWidth/2, config.tileHeight/2), config.height, config.width, config.tileWidth, config.tileHeight);
        this.add(this.grid.tileMap);
    }
}