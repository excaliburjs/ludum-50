import { Engine, Input, Tile } from "excalibur";
import { Tower } from "./tower";
import { Grid } from "./grid";


export class TowerPlacer {
    private _grid: Grid;
    private _engine: Engine;
    private _highlightedTile: Tile | null = null;
    constructor(grid: Grid, engine: Engine) {
        this._grid = grid;
        this._engine = engine;
        engine.input.pointers.primary.on('move', (evt) => this.onPointerMove(evt));
        engine.input.pointers.primary.on('down', () => this.onConfirm());
    }

    onPointerMove(evt: Input.PointerEvent) {
        // TODO add tile highlight
        const maybeTile = this._grid.tileMap.getTileByPoint(evt.worldPos);

        if (maybeTile) {
            this._highlightedTile = maybeTile;
        }
    }

    onConfirm() {
        if (this._highlightedTile) {
            const tower = new Tower(this._grid, this._highlightedTile.x, this._highlightedTile.y);
            this._engine.add(tower);
        }
        this._highlightedTile = null;
    }
}