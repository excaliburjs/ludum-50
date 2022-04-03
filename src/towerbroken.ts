import config from "./config";
import { Actor, CollisionGroup, CollisionType, Color, Engine, ImageSource, Tile, vec, Vector} from "excalibur";
import { Tower, TowerType } from "./tower"
import { Grid } from "./grid";

export class TowerBroken extends Actor {
    constructor(towerType: TowerType, tile: Tile, grid: Grid, x: number, y: number) {
                console.log("Making broken tower");
        super({
            name: "BrokenTower",
            pos: tile.pos.add(vec(config.grid.tileWidth/2, config.grid.tileHeight/2)),
            width: config.grid.tileWidth,
            height: config.grid.tileHeight,
            collisionType: CollisionType.PreventCollision,
        });
        const towerSprite = config.tower[towerType].spriteBroken?.toSprite()
        if(towerSprite) this.graphics.use(towerSprite);
        TowerBroken.removeBrokenTower(tile);
        tile.data.set(TowerBroken.DataKey, this);
    }
    private static DataKey = "BrokenTower";
    static removeBrokenTower(tile: Tile) {
        if(tile.data.has(TowerBroken.DataKey))
        {
            tile.data.get(TowerBroken.DataKey).kill();
            tile.data.delete(TowerBroken.DataKey);
        }
    }
}