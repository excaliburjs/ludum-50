import { Engine, Input, Tile, Actor, Color, Rectangle, vec } from "excalibur";
import { Tower, TowerType } from "./tower";
import { Grid } from "./grid";
import config from "./config";
import { Enemy } from "./enemy";
import { PlayerState } from "./playerState";
import { TowerBroken } from "./towerbroken";
import { Resources } from "./resources";

export class TowerPlacer {
  private _grid: Grid;
  private _engine: Engine;
  private _highlightedTile: Tile | null = null;
  private _highlight: Actor;
  private _rect: Rectangle;
  selectedTowerType: TowerType = TowerType.default;
  private ghostTower: Actor;
  constructor(grid: Grid, engine: Engine) {
    this._grid = grid;
    this._engine = engine;
    engine.input.pointers.primary.on("move", (evt) => this.onPointerMove(evt));
    engine.input.pointers.primary.on("down", () => this.onConfirm());
    this._highlight = new Actor({
      pos: vec(-100, -100), // default offscreen
    });
    this.ghostTower = new Actor();
    this.ghostTower.graphics.opacity = 0.5;
    this._highlight.onPostUpdate = () => {
      if (this._highlightedTile == null) return;

      if (this._highlightedTile.data.has("tower")) {
        this._rect.strokeColor = Color.Yellow;
      } else if (Enemy.enemiesInTile(this._highlightedTile) > 0 || this._highlightedTile.data.has("water")) {
        this._rect.strokeColor = Color.Red;
      } else {
        this._rect.strokeColor = Color.Green;
      }
    };
    this._rect = new Rectangle({
      width: config.grid.tileWidth,
      height: config.grid.tileHeight,
      color: Color.Transparent,
      strokeColor: Color.Green,
      lineWidth: 3,
      lineDash: [3, 3],
    });
    this._highlight.graphics.use(this._rect);
    engine.add(this._highlight);
    engine.add(this.ghostTower);
  }

  onPointerMove(evt: Input.PointerEvent) {
    // TODO add tile highlight
    const maybeTile = this._grid.tileMap.getTileByPoint(evt.worldPos);
    const sprite = config.tower[(window as any).TowerPickerUI.selectedTower() as TowerType]?.sprite?.toSprite();
    if(sprite) this.ghostTower.graphics.use(sprite);

    if (maybeTile) {
      this._highlightedTile = maybeTile;
      this._highlight.pos = this._highlightedTile.pos.add(
        vec(config.grid.tileWidth / 2, config.grid.tileHeight / 2)
      );
      this.ghostTower.pos = this._highlight.pos;
    }
  }

  onConfirm() {
    if (this._highlightedTile) {
      if (this._highlightedTile.data.has("tower")) {
        console.log("Tower already there!");
      } else if (Enemy.enemiesInTile(this._highlightedTile) > 0) {
        console.log("Enemy already there!");
      } else {
        const selectedTower = (window as any).TowerPickerUI.selectedTower(); // TODO a way to get types?
        const tower = new Tower(
          selectedTower,
          this._grid,
          this._highlightedTile.x,
          this._highlightedTile.y
        );
        if (PlayerState.SubtractMoney(tower.cost)) {
          this._highlightedTile.data.set("tower", tower);
          TowerBroken.removeBrokenTower(this._highlightedTile);
          this._engine.add(tower);
          Resources.FxPlaceTower.play();
        }
      }
    }
  }
}
