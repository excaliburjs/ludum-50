import { Grid } from "./grid";
import config from "./config";
import { Actor, CollisionGroup, CollisionType, Color, vec, PostCollisionEvent } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { GameOver } from "./game-over";

export class SandCastle extends Actor {
    maxHp: number = config.sandcastle.maxHealth;
    currentHp: number = this.maxHp;
    healthBar: Actor;
    constructor(grid: Grid, private gameOver: GameOver, row: number) {
        super({
            name: 'Sand Castle',
            pos: grid.tileMap.pos.add(vec(0, row * config.grid.tileHeight + config.grid.tileHeight/2)),
            width: config.grid.tileWidth,
            height: config.grid.tileHeight,
            collisionType: CollisionType.Fixed,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroup])
        });
        this.on('postcollision', evt => this.onPostCollision(evt));

        const sandcastle = Resources.SandCastle.toSprite();
        this.graphics.use(sandcastle);

        // draw health bar
        this.healthBar = new Actor({
            name: 'Healthbar',
            width: config.healthBarWidthPixels,
            height: 5,
            color: Color.Green,
            collisionType: CollisionType.PreventCollision
        });
        this.addChild(this.healthBar);
    }

    onPostCollision(evt: PostCollisionEvent) {
        this.takeDamage();
        evt.other.kill();
    }

    takeDamage() {
        this.currentHp -= 1;
        const pixelsPerHp = config.healthBarWidthPixels / config.sandcastle.maxHealth;
        const graphic = this.healthBar.graphics.current[0].graphic;
        graphic.width = this.currentHp * pixelsPerHp;
        if (this.currentHp <= 0) {
            this.kill();
            this.gameOver.triggerGameOver();
        }
    }
}