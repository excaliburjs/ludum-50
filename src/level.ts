import { Engine, Random, Scene, vec, Timer, Actor, Color } from "excalibur";
import { Resources } from "./resources";
import config from "./config";
import { Grid } from "./grid";
import { SandCastle } from "./sandcastle";
import { EnemyGenerator } from "./enemyGenerator";
import { EnemyType } from "./enemy";
import { Tower, TowerType } from "./tower";
import { TowerPlacer } from "./tower-placer";
import { WaveDispatcher } from "./wave-dispatcher";
import { GameOver } from "./game-over";
import { SoundManager } from "./sound-manager";
import { Water } from "./water-edge";
import { PlayerState } from "./playerState";
import { Sandpile } from "./sand-pile";

export class Level extends Scene {
    random = new Random(Date.now());
    grid!: Grid;
    sandCastles: SandCastle[] = [];
    enemyGenerator!: EnemyGenerator;
    towerPlacer!: TowerPlacer;
    waveDispatcher!: WaveDispatcher;
    gameOver!: GameOver;

    private _playerWealthTick = 0;
    private _playerWealthGeneration = config.player.passiveWealthTick;
    onPostUpdate(_engine: Engine, _delta: number): void {
        this._playerWealthTick += _delta / 1000;
        if(this._playerWealthTick >= this._playerWealthGeneration) {
            PlayerState.AddMoney(config.player.passiveWealthAmt);
            this._playerWealthTick = 0;
        }
    }

    onInitialize(engine: Engine): void {
        SoundManager.startBackgroundMusic();
        
        // Grab the random seed
        config.Seed = this.random.seed as number;

        // Sand grid
        this.grid = new Grid(vec(config.grid.tileWidth, 0), config.grid.height, config.grid.width, config.grid.tileWidth, config.grid.tileHeight);
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
        
        const sandPile = new Sandpile();
        this.add(sandPile);
        PlayerState.initialize(sandPile);
        
        // Initial towers
        const tutorialDefaultTower = new Tower(TowerType.default, this.grid, 4, 3);
        this.grid.tileMap.getTile(4, 3).data.set("tower", tutorialDefaultTower);
        this.add(tutorialDefaultTower);

        const tutorialSandbucketTower = new Tower(TowerType.sandBucket, this.grid, 0, 3);
        this.grid.tileMap.getTile(0, 3).data.set("tower", tutorialSandbucketTower);
        this.add(tutorialSandbucketTower);
        
        // Initial enemy (aligned with the initial default tower)
        const addTutorialEnemy = () => {
            console.log('adding tutorial enemy');
            const enemy = this.enemyGenerator.spawnEnemy(EnemyType.Crab, 7, 3);
            this.add(enemy);
        }
        const tutorialEnemyTimer = new Timer({interval: 5000, fcn: () => {
            addTutorialEnemy();
        }});
        this.add(tutorialEnemyTimer);
        tutorialEnemyTimer.start();

        // Tower placement
        this.towerPlacer = new TowerPlacer(this.grid, engine);

        this.waveDispatcher = new WaveDispatcher(this.enemyGenerator, this.random);
        this.add(this.waveDispatcher);

        // Game over handler
        this.gameOver = new GameOver(engine, this, this.waveDispatcher);

        // Sandcastle(s)
        for (let y = 0; y < config.grid.height; y++) {
            const sandcastle = new SandCastle(this.grid, this.gameOver, y);
            this.sandCastles.push(sandcastle);
            this.add(sandcastle);
        }

        const bottomBorder = new Actor({
            // pos: vec(game.drawWidth / 2, game.drawHeight / 2), // excalibur: this doesn't work
            // pos: vec(game.canvasWidth / 2, game.canvasHeight / 2), // excalibur: this doesn't work either
            pos: vec(engine.screen.resolution.width / 2, engine.screen.resolution.height - 32),
            height: 50, width: 50,
            color: Color.Orange,
            z: -1,
        });
        bottomBorder.graphics.use(Resources.BottomBorder.toSprite());
        this.add(bottomBorder);

        const sideBorder = new Actor({
            pos: vec(32, engine.screen.resolution.height / 2),
            height: 50, width: 50,
            color: Color.Orange,
            z: -1,
        })
        sideBorder.graphics.use(Resources.SideBorder.toSprite());
        this.add(sideBorder);

        const towerMenu = document.getElementById("towerSelection")!;
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