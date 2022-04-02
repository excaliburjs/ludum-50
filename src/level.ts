import { Actor, Engine, Random, Scene, vec } from "excalibur";
import { Resources } from "./resources";
import config from "./config";
import { Grid } from "./grid";
import { SandCastle } from "./sandcastle";
import { EnemyGenerator } from "./enemyGenerator";
import { Enemy, EnemyType } from "./enemy";
import { Tower } from "./tower";
import { TowerPlacer } from "./tower-placer";

export class Level extends Scene {
    random = new Random(config.Seed);
    grid!: Grid;
    sandCastles: SandCastle[] = [];
    enemyGenerator = new EnemyGenerator(this);
    towerPlacer!: TowerPlacer;

    onInitialize(engine: Engine): void {
        // Sand grid
        this.grid = new Grid(vec(config.tileWidth/2, config.tileHeight/2), config.gridHeight, config.gridWidth, config.tileWidth, config.tileHeight);
        this.add(this.grid.tileMap);

        // Sandcastle(s)
        for (let y = 0; y < config.gridHeight; y++) {
            const sandcastle = new SandCastle(this.grid, y);
            this.sandCastles.push(sandcastle);
            this.add(sandcastle);
        }

        // Tower Test
        const tower = new Tower(this.grid, 5, 3);
        this.grid.tileMap.getTile(5, 3).data.set("tower", tower);
        this.add(tower);

        // Tower placement
        this.towerPlacer = new TowerPlacer(this.grid, engine)

        // enemy test
        this.enemyGenerator.spawnEnemy(EnemyType.Crab, config.gridWidth - 1, 0);
        this.enemyGenerator.spawnEnemy(EnemyType.Crab, config.gridWidth - 1, 1);
        this.enemyGenerator.spawnEnemy(EnemyType.Turtle, config.gridWidth - 1, 2);
        this.enemyGenerator.spawnEnemy(EnemyType.Crab, config.gridWidth - 1, 3);
        this.enemyGenerator.spawnEnemy(EnemyType.Turtle, config.gridWidth - 1, 4);
    }

}