import config from "./config";
import { Tile, Random, range } from "excalibur";
import { Level } from "./level";
import { Enemy, EnemyType } from "./enemy";


export class EnemyGenerator {

    possibleSpawnTiles: Tile[] = [];

    constructor(private level: Level, private random: Random) {
        // Currently, this only picks the tiles from the furthest right column of the grid.
        for (let i = 0; i < config.grid.height; i++) {
            this.possibleSpawnTiles.push(this.level.grid.tileMap.getTile(config.grid.width - 1, i));
        }
    }

    /**
     * 
     * @param type the EnemyType
     * @param gridX the grid square x coordinate ('2' would be the third square from the left)
     * @param gridY the grid square y coordinate ('1' would be the second square from the top)
     */
    public spawnEnemy(type: EnemyType, gridX: number, gridY: number) {
        const enemySpawnTile = this.level.grid.tileMap.getTile(gridX, gridY);
        const enemy = new Enemy(type, this.level.grid, enemySpawnTile.pos.x + config.grid.tileWidth / 2, enemySpawnTile.pos.y + config.grid.tileHeight / 2);
        this.level.add(enemy);
        enemy.claimTiles(enemySpawnTile, enemySpawnTile);
        return enemy;
    }

    /**
     * Spawns an enemy at a random tile from the available possible spawn tiles
     */
    public spawnEnemyAtRandomTile(type: EnemyType, possible?: number[]) {
        
        const randomYIndex = this.random.integer(0, this.possibleSpawnTiles.length - 1);

        return this.spawnEnemy(type, config.grid.width - 1, randomYIndex);
    }

    public spawnEnemies(type: EnemyType, count: number) {
        const set = this.random.pickSet(range(0, this.possibleSpawnTiles.length - 1), count, true);
        let enemies = [];
        for (let index of set) {
            enemies.push(this.spawnEnemy(type, config.grid.width - 1, index));
        }
        return enemies;
    }

}