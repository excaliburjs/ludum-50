import config from "./config";
import { Timer } from "excalibur";
import { Level } from "./level";
import { Enemy } from "./enemy";

export class EnemyGenerator {

    // public timer: Timer;

    constructor(private level: Level) {

    }

    public spawnEnemy() {
        const enemySpawnTile = this.level.grid.tileMap.getTile(config.gridWidth - 1, 2);
        console.log({enemySpawnTile});
        const tempEnemy = new Enemy(enemySpawnTile.pos.x + config.tileWidth / 2, enemySpawnTile.pos.y + config.tileHeight / 2);
        this.level.add(tempEnemy);
    }

}