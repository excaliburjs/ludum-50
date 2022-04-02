import { Actor, Engine, Random, Scene, vec } from "excalibur";
import { Resources } from "./resources";
import config from "./config";
import { Grid } from "./grid";
import { SandCastle } from "./sandcastle";
import { EnemyGenerator } from "./enemyGenerator";
import { Enemy } from "./enemy";

export class Level extends Scene {
    random = new Random(config.Seed);
    grid!: Grid;
    sandCastles: SandCastle[] = [];
    enemyGenerator = new EnemyGenerator(this);

    onInitialize(_engine: Engine): void {
        // Sand grid
        this.grid = new Grid(vec(config.tileWidth/2, config.tileHeight/2), config.gridHeight, config.gridWidth, config.tileWidth, config.tileHeight);
        this.add(this.grid.tileMap);

        // Sandcastle(s)
        for (let y = 0; y < config.gridHeight; y++) {
            const sandcastle = new SandCastle(this.grid, y);
            this.sandCastles.push(sandcastle);
            this.add(sandcastle);
        }

        this.enemyGenerator.spawnEnemy();
    }

}