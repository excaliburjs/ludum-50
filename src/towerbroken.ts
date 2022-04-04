import config from "./config";
import { Actor, CollisionType, Engine, Tile, vec} from "excalibur";
import { TowerType } from "./tower"
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

    private towerOpacity: number = 1;
    private towerOpacityFade: number = 5;
    onPostUpdate(_engine: Engine, updateMs: number) {
        if(this.towerOpacity >= 0){
            this.towerOpacity =  this.towerOpacity - 1 * updateMs / 1000 / this.towerOpacityFade;
            this.graphics.opacity = this.towerOpacity;
        }
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