import { Engine, Input, Tile, Actor, Color, Rectangle, vec } from "excalibur";
import { Tower } from "./tower";
import { Grid } from "./grid";
import config from "./config";


export class TowerPlacer {
    private _grid: Grid;
    private _engine: Engine;
    private _highlightedTile: Tile | null = null;
    private _highlight: Actor;
    constructor(grid: Grid, engine: Engine) {
        this._grid = grid;
        this._engine = engine;
        engine.input.pointers.primary.on('move', (evt) => this.onPointerMove(evt));
        engine.input.pointers.primary.on('down', () => this.onConfirm());
        this._highlight = new Actor({
            pos: vec(-100, -100) // default offscreen
        })
        const rect = new Rectangle({
            width: config.tileWidth,
            height: config.tileHeight,
            color: Color.Transparent,
            strokeColor: Color.Green,
            lineWidth: 3,
            lineDash: [3, 3]
        })
        this._highlight.graphics.use(rect);
        engine.add(this._highlight);
    }

    onPointerMove(evt: Input.PointerEvent) {
        // TODO add tile highlight
        const maybeTile = this._grid.tileMap.getTileByPoint(evt.worldPos);

        if (maybeTile) {
            this._highlightedTile = maybeTile;
            this._highlight.pos = this._highlightedTile.pos.add(vec(config.tileWidth/2, config.tileHeight/2));
        }
    }

    onConfirm() {
        if (this._highlightedTile) {
            if (!this._highlightedTile.data.has("tower")) {
                const tower = new Tower(this._grid, this._highlightedTile.x, this._highlightedTile.y);
                this._highlightedTile.data.set("tower", tower);
                this._engine.add(tower);
            } else {
                console.log("Tower already there!")
            }
        }
        this._highlightedTile = null;
    }
}