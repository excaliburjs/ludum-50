import { TileMap, Vector } from "excalibur";
import { Resources } from "./resources";

export class Grid {
    public tileMap: TileMap
    constructor(pos: Vector, height: number, width: number, tileWidth: number, tileHeight: number) {
        this.tileMap = new TileMap({
            name: "Sand Grid",
            pos,
            width,
            height,
            tileWidth,
            tileHeight
        });
        
        const sandSprite = Resources.Sand.toSprite();
        for (let tile of this.tileMap.tiles) {
            tile.addGraphic(sandSprite);
        }
    }
}