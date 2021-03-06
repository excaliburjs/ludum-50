import config from "./config";
import {
  Actor,
  Vector,
  CollisionGroupManager,
  CollisionType,
  PostCollisionEvent,
  KillEvent,
  Engine,
  Tile,
  Color,
  vec,
  SpriteSheet,
  Animation,
  range,
  AnimationStrategy,
  CollisionGroup,
} from "excalibur";
import { Tower } from "./tower";
import { Grid } from "grid";
import { Healthbar } from "./healthbar";
import { Resources } from "./resources";
import { EnemyGenerator } from "./enemyGenerator";

export class Enemy extends Actor {
  public static CollisionGroupGround =
    CollisionGroupManager.create("enemy_ground");
  public static CollisionGroupFlying =
    CollisionGroupManager.create("enemy_flying");

  public maxHealth: number;
  private currentHp: number;
  public damage: number;
  type: EnemyType;
  private _grid: Grid;
  private _configValues;
  private _currentAttackingTower: Tower | null = null;
  private _occupiedTile: Tile | null = null;
  private _leavingTile: Tile | null = null;
  private static TileDataEnemyCounterKey = "enemies";
  healthBar: Healthbar;
  turtleAnim: Animation;
  crabAnim: Animation;
  seagullAnim: Animation;

  // @ts-ignore
  constructor(type: EnemyType, grid: Grid, x: number, y: number) {
    const configValues = config.enemy[type];
    super({
      name: "Enemy",
      x,
      y,
      z: config.z.enemies,
      width: configValues.width,
      height: configValues.height,
      color: configValues.color,
      collisionType: configValues.collisionGroup == "enemy_flying" ? CollisionType.Passive :  CollisionType.Active,
      collisionGroup:
        configValues.collisionGroup == "enemy_flying"
          ? Enemy.CollisionGroupFlying  
          : Enemy.CollisionGroupGround,
      vel: new Vector(-1 * configValues.speed, 0), // moves horizontally, right to left
    });
    this.addTag("enemy");
    this.type = type;
    this._grid = grid;
    this._configValues = configValues;
    this.maxHealth = this._configValues.health;
    this.currentHp = this.maxHealth;
    this.damage = this._configValues.damage;
    this.on("postcollision", (evt) => this.onPostCollision(evt));
    this.on("kill", (ke) => this.onKill(ke));

    // @ts-ignore
    const enemySprite = config.enemy[this.type].sprite?.toSprite();
    if (enemySprite) this.graphics.use(enemySprite);

    // turtle type
    const turtleSheet = SpriteSheet.fromImageSource({
      image: Resources.TurtleSheet,
      grid: {
        rows: 1,
        columns: 8,
        spriteHeight: 64,
        spriteWidth: 64,
      },
    });
    this.turtleAnim = Animation.fromSpriteSheet(
      turtleSheet,
      range(0, 7),
      200,
      AnimationStrategy.Loop
    );

    // crab type
    const crabSheet = SpriteSheet.fromImageSource({
      image: Resources.CrabSheet,
      grid: {
        rows: 1,
        columns: 3,
        spriteHeight: 64,
        spriteWidth: 64,
      },
    });
    this.crabAnim = Animation.fromSpriteSheet(
      crabSheet,
      range(0, 2),
      200,
      AnimationStrategy.PingPong
    );

    // seagull type
    const seagullSheet = SpriteSheet.fromImageSource({
      image: Resources.SeagullSheet,
      grid: {
        rows: 1,
        columns: 3,
        spriteHeight: 64,
        spriteWidth: 64,
      },
    });
    this.seagullAnim = Animation.fromSpriteSheet(
      seagullSheet,
      range(0, 2),
      200,
      AnimationStrategy.PingPong
    );

    switch (this.type) {
      case EnemyType.Turtle:
        this.graphics.use(this.turtleAnim);
        break;
      case EnemyType.Crab:
        this.graphics.use(this.crabAnim);
        break;
      case EnemyType.Seagull:
        this.graphics.use(this.seagullAnim);
        break;
    }

    // draw health bar
    this.healthBar = new Healthbar(this.maxHealth);
    this.addChild(this.healthBar);
  }

  takeDamage(damage: number) {
    this.currentHp -= damage;
    this.healthBar.takeDamage(damage);

    Resources.FxImpactEnemyBall.play();
    this.actions.blink(50, 50, 2);

    if (this.currentHp <= 0) {
      this.kill();
      this.playDeathSound();
    }
  }

  playDeathSound() {
    switch (this.type) {
      case EnemyType.Turtle:
        Resources.FxDeathTurtle.play();
        break;
      case EnemyType.Seagull:
        Resources.FxDeathGull.play();
        break;
      case EnemyType.Crab:
        Resources.FxDeathCrabForCutie.play();
        break;
    }
  }

  private _stopped = false;
  stop() {
    this._stopped = true;
  }

  isAttacking() {
    if (this._currentAttackingTower) {
      return this._currentAttackingTower.active;
    }
    return false;
  }

  static addEnemyToTile(tile: Tile) {
    if (tile.data.has(Enemy.TileDataEnemyCounterKey)) {
      tile.data.set(
        Enemy.TileDataEnemyCounterKey,
        tile.data.get(Enemy.TileDataEnemyCounterKey) + 1
      );
    } else {
      tile.data.set(Enemy.TileDataEnemyCounterKey, 1);
    }
  }

  static removeEnemyFromTile(tile: Tile) {
    const enemyCounter = this.enemiesInTile(tile);
    if (enemyCounter <= 1) {
      tile.data.delete(Enemy.TileDataEnemyCounterKey);
    }
    tile.data.set(Enemy.TileDataEnemyCounterKey, enemyCounter - 1);
  }

  static enemiesInTile(tile: Tile): number {
    if (tile.data.has(Enemy.TileDataEnemyCounterKey))
      return tile.data.get(Enemy.TileDataEnemyCounterKey);
    return 0;
  }

  onKill(killEvent: KillEvent) {
    if (this._occupiedTile != null) {
      Enemy.removeEnemyFromTile(this._occupiedTile);
    }
    if (this._leavingTile != null) {
      Enemy.removeEnemyFromTile(this._leavingTile);
    }
  }

  claimTiles(enteringTile: Tile, leavingTile: Tile) {
    this.claimOccupyingTile(enteringTile);
    this.claimLeavingTile(leavingTile);
  }

  claimOccupyingTile(tile: Tile) {
    if (this._occupiedTile == tile) return;

    if (this._occupiedTile != null) {
      Enemy.removeEnemyFromTile(this._occupiedTile);
    }
    this._occupiedTile = tile;
    if (this._occupiedTile != null) {
      Enemy.addEnemyToTile(this._occupiedTile);
    }
  }

  claimLeavingTile(tile: Tile) {
    if (this._leavingTile == tile) return;

    if (this._leavingTile != null) {
      Enemy.removeEnemyFromTile(this._leavingTile);
    }
    this._leavingTile = tile;
    if (this._leavingTile != null) {
      Enemy.addEnemyToTile(this._leavingTile);
    }
  }

  private _damageTimer = 0;
  onPostCollision(evt: PostCollisionEvent) {
    if (evt.other instanceof Tower) {
      if (this._damageTimer <= 0) {
        this._damageTimer = this._configValues.damageTimerMs;
        const tower = evt.other as Tower;
        tower.takeDamage(this.damage);
      }
      this.vel = new Vector(0, 0);
    }
  }

  onPostUpdate(_engine: Engine, deltaMs: number) {
    if (this._stopped) return;
    this._damageTimer -= deltaMs;

    const enteringTile = this._grid.tileMap.getTileByPoint(
      this.pos.sub(vec(this.width / 2, 0))
    );
    const leavingTile = this._grid.tileMap.getTileByPoint(
      this.pos.add(vec(this.width * 0.2, 0))
    );

    this.claimTiles(enteringTile, leavingTile);

    if (!this.isAttacking()) {
      this.vel = new Vector(-1 * config.enemy[this.type].speed, 0);
    }
  }
}

// The values for these enemy types must match the property names of config.enemy
export enum EnemyType {
  Crab = "crab",
  Turtle = "turtle",
  Seagull = "seagull",
  // others?
}
