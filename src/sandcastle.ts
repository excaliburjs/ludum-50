import { Grid } from "./grid";
import config from "./config";
import { Sprite, Actor, CollisionGroup, CollisionType, vec, PostCollisionEvent } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { GameOver } from "./game-over";
import { Healthbar } from "./healthbar";

export class SandCastle extends Actor {
    maxHp: number = config.sandcastle.maxHealth;
    currentHp: number = this.maxHp;
    healthBar: Healthbar;
    sandcastle: Sprite;
    constructor(grid: Grid, private gameOver: GameOver, row: number) {
        super({
            name: 'Sand Castle',
            pos: grid.tileMap.pos.add(vec(-config.grid.tileWidth/2, row * config.grid.tileHeight + config.grid.tileHeight/2)),
            width: config.grid.tileWidth,
            height: config.grid.tileHeight,
            collisionType: CollisionType.Fixed,
            collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroupGround, Enemy.CollisionGroupFlying])
        });
        this.on('postcollision', evt => this.onPostCollision(evt));

        this.sandcastle = Resources.SandCastle.toSprite();
        this.graphics.use(this.sandcastle);

        // draw health bar
        this.healthBar = new Healthbar(this.maxHp);
        this.addChild(this.healthBar);
    }

    onPostCollision(evt: PostCollisionEvent) {
        this.takeDamage();
        evt.other.kill();
    }

    takeDamage() {
        const damage = 1;
        this.currentHp -= damage;
        this.healthBar.takeDamage(damage);

        const origPos = this.pos.clone();

        this.actions
            .easeTo(origPos.add(vec(3, 0)), 50)
            .easeTo(origPos.add(vec(-3, 0)), 70)
            .easeTo(origPos, 50);
        
        Resources.FxImpactCastleByEnemy.play();

        if (this.currentHp <= 0) {
            this.kill();
            this.gameOver.triggerGameOver();
        }
    }
}