import { Actor, Engine, Text, Font, Color, BaseAlign, vec } from "excalibur";
import config from "./config";
import { Resources } from "./resources";

export class Sandpile extends Actor {
  private counter: Text = new Text({
    text: '0',
    font: new Font({ 
      bold: true, 
      color: Color.Black,
      strokeColor: Color.White,
      family: 'Kanit, Arial, sans-serif',
      lineWidth: 1,
      size: 22,
      baseAlign: BaseAlign.Top
    })
  });

  constructor() {
    super({
      x: config.grid.tileWidth / 2,
      y: config.grid.tileHeight * config.grid.height + (config.grid.tileHeight / 2),
      z: config.z.sandpile,
      width: 64,
      height: 64,
    });
  }

  onInitialize(_engine: Engine): void {
    const sand = Resources.CompactedSand.toSprite();
    this.graphics.layers.create({ name: 'background', order: -1 });
    this.graphics.layers.create({ name: 'foreground', order: 1 });
    this.graphics.layers.get('background').show(sand);
    this.graphics.layers.get('foreground').show(this.counter, {
      offset: vec(0, 5)
    });
  }

  public updateAmount(amount: number) {
    this.counter.text = `${amount}`;
  }
}
