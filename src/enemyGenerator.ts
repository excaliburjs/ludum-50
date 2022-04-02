import config from "./config";
import { Timer, Tile } from "excalibur";
import { Level } from "./level";
import { Enemy, EnemyType } from "./enemy";

export class EnemyGenerator {

    possibleSpawnTiles: Tile[] = [];

    constructor(private level: Level) {
        // might be useful for randomly picking a tile to spawn from
        for (let i = 0; i < config.gridHeight, i++;) {
            this.possibleSpawnTiles.push(this.level.grid.tileMap.getTile(config.gridWidth - 1, i));
        }
    }

    public spawnEnemy(type: EnemyType, gridX: number, gridY: number) {
        // const enemySpawnTile = this.level.grid.tileMap.getTile(config.gridWidth - 1, 2);
        const enemySpawnTile = this.level.grid.tileMap.getTile(gridX, gridY);
        console.log({enemySpawnTile});
        const enemy = new Enemy(type, enemySpawnTile.pos.x + config.tileWidth / 2, enemySpawnTile.pos.y + config.tileHeight / 2);
        this.level.add(enemy);
    }

    /**
     * Spawns an enemy at a random tile from the available possible spawn tiles
     */
    public spawnEnemyAtRandomTile() {
        // TODO
    }

}