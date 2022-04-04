import config from "./config";
import { Actor, vec, Color, CollisionType, Engine } from "excalibur";

export class Healthbar extends Actor {
    public MaxHealth: number;
    public CurHealth: number;
    private _fillColor;
    private healthBarOpacity: number = 0;
    private healthBarOpacityFade : number = 3;
    constructor(maxHealth: number) {
            super({name: 'Healthbar',
            pos: vec(0, -10),
            width: config.healthBarWidthPixels,
            height: 5,
            color: Color.Black,
            collisionType: CollisionType.PreventCollision
        });
        this.MaxHealth = maxHealth;
        this.CurHealth = maxHealth;
        this._fillColor = new Actor({
            name: 'Healthbar_fill',
            pos: vec(0, 0),
            width: this.width-2,
            height: this.height-2,
            color: Color.Green,
            collisionType: CollisionType.PreventCollision
            });
        this.addChild(this._fillColor);
    }

    onPostUpdate(_engine: Engine, updateMs: number) {
        if(this.healthBarOpacity >= 0){
            this.healthBarOpacity =  this.healthBarOpacity - 1 * updateMs / 1000 / this.healthBarOpacityFade;
            this.graphics.opacity = this.healthBarOpacity;
            this._fillColor.graphics.opacity = this.healthBarOpacity;
        }
    }

    takeDamage(damage: number) {
        this.CurHealth -= damage;
        const pixelsPerHp = config.healthBarWidthPixels / this.MaxHealth;
        const graphic = this.graphics.current[0].graphic;
        graphic.width = this.CurHealth * pixelsPerHp;
        this._fillColor.graphics.current[0].graphic.width = graphic.width-2;
        this.healthBarOpacity = 1;
        if (this.CurHealth <= (this.MaxHealth/4)) {
            this._fillColor.color = Color.Red;
        }
        else if (this.CurHealth <= (this.MaxHealth/2)) {
            this._fillColor.color = Color.Yellow;
        }
    }
}