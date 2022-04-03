import { Actor, Engine, Random, Scene, vec } from "excalibur";
import { Resources } from "./resources";
import config from "./config";
import { Grid } from "./grid";
import { SandCastle } from "./sandcastle";
import { EnemyGenerator } from "./enemyGenerator";
import { Enemy, EnemyType } from "./enemy";
import { Tower, TowerType } from "./tower";
import { TowerPlacer } from "./tower-placer";
import { WaveDispatcher } from "./wave-dispatcher";
import { GameOver } from "./game-over";
import { SoundManager } from "./sound-manager";
import { Water } from "./water-edge";
import { PlayerState } from "./playerState";

export class Level extends Scene {
    random = new Random(Date.now());
    grid!: Grid;
    sandCastles: SandCastle[] = [];
    enemyGenerator: EnemyGenerator | undefined;
    towerPlacer!: TowerPlacer;
    waveDispatcher!: WaveDispatcher;
    gameOver!: GameOver;

    onInitialize(engine: Engine): void {
        SoundManager.startBackgroundMusic();
        
        // Grab the random seed
        config.Seed = this.random.seed as number;

        // Sand grid
        this.grid = new Grid(vec(config.grid.tileWidth, config.grid.tileHeight/2), config.grid.height, config.grid.width, config.grid.tileWidth, config.grid.tileHeight);
        this.add(this.grid.tileMap);

        // Water waves at the end
        for (let y = 0; y < config.grid.height * 2; y++) {
            const wave = new Water(this.grid, config.grid.tileWidth/2, y, 0, 0);
            wave.z = 0;
            this.add(wave);
            const wave2 = new Water(this.grid, config.grid.tileWidth, y, config.grid.tileHeight/2, 500);
            wave2.z = 5;
            this.add(wave2);

            // Make water unbuildable
            const tile = this.grid.tileMap.getTile(config.grid.width - 1, y);
            if (tile) {
                tile.data.set("water", true);
            }
        }

        this.enemyGenerator = new EnemyGenerator(this, this.random);

        // Tower Test
        const tower = new Tower(TowerType.default, this.grid, 5, 3);
        this.grid.tileMap.getTile(5, 3).data.set("tower", tower);
        this.add(tower);

        // Tower placement
        this.towerPlacer = new TowerPlacer(this.grid, engine)

        this.waveDispatcher = new WaveDispatcher(this.enemyGenerator);
        this.add(this.waveDispatcher);

        // Game over handler
        this.gameOver = new GameOver(engine, this, this.waveDispatcher);

        // Sandcastle(s)
        for (let y = 0; y < config.grid.height; y++) {
            const sandcastle = new SandCastle(this.grid, this.gameOver, y);
            this.sandCastles.push(sandcastle);
            this.add(sandcastle);
        }

        const towerMenu = document.getElementById("towerSelection")!;
        const pos = engine.screen.worldToScreenCoordinates(vec(0, engine.screen.viewport.height - 125));
        towerMenu.style.left = pos.x.toString();
        towerMenu.style.top = pos.y.toString() + "px";
        towerMenu.style.display = "flex";

        // enemy spawn test
        // this.enemyGenerator.spawnEnemy(EnemyType.Crab, config.grid.width - 1, 0);
        // this.enemyGenerator.spawnEnemy(EnemyType.Crab, config.grid.width - 1, 1);
        // this.enemyGenerator.spawnEnemy(EnemyType.Turtle, config.grid.width - 1, 2);
        // this.enemyGenerator.spawnEnemy(EnemyType.Crab, config.grid.width - 1, 3);
        // this.enemyGenerator.spawnEnemy(EnemyType.Turtle, config.grid.width - 1, 4);

        // random enemy spawn test
        // this.enemyGenerator.spawnEnemyAtRandomTile(EnemyType.Crab);
        // this.enemyGenerator.spawnEnemyAtRandomTile(EnemyType.Crab);
        // this.enemyGenerator.spawnEnemyAtRandomTile(EnemyType.Crab);
    }

    restart() {
        this.engine.currentScene.entities.forEach(e => e.kill());
        this.engine.currentScene.onInitialize(this.engine);
        PlayerState.moneyResource = config.player.startingMonies;
    }

}