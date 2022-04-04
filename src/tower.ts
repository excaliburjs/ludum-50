import config from "./config";
import {
  Actor,
  CollisionGroup,
  CollisionType,
  Color,
  Engine,
  Tile,
  vec,
  KillEvent,
  Random,
  Animation,
  AnimationStrategy,
  range,
  SpriteSheet,
  Sprite,
  Input,
  EasingFunctions,
} from "excalibur";
import { Grid } from "./grid";
import { Enemy } from "./enemy";
import { PlayerState } from "./playerState";
import { Healthbar } from "./healthbar";
import { TowerBroken } from "./towerbroken";
import { Resources, FxTowerFlings } from "./resources";
import Config from "./config";

const randFling = new Random(Config.Seed);

export class Tower extends Actor {
  private _engine!: Engine;
  private _grid: Grid;
  private _tile: Tile;
  healthBar: Healthbar;
  currentHp: number;
  maxHealth: number;
  cost: number;
  type: TowerType;
  private healthBarOpacity: number = 1;
  private healthBarOpacityFade: number = 3;
  private row: Tile[];
  bucketSheet: SpriteSheet;
  bucketGlow: Animation;
  bucketLoadingFrames: number;
  sand: Sprite;
  beachball: Sprite;
  constructor(towerType: TowerType, grid: Grid, x: number, y: number) {
    super({
      name: "Base Tower",
      pos: grid.tileMap
        .getTile(x, y)
        .pos.add(vec(config.grid.tileWidth / 2, config.grid.tileHeight / 2)),
      width: config.grid.tileWidth,
      height: config.grid.tileHeight,
      collisionType: CollisionType.Fixed,
      collisionGroup: CollisionGroup.collidesWith([Enemy.CollisionGroupGround]),
      color: config.tower[towerType].color,
      z: config.z.towers,
    });

    this._grid = grid;
    this._tile = grid.tileMap.getTile(x, y);
    this.row = this._grid.tileMap.getRows()[y];
    this.type = towerType;
    this.maxHealth = config.tower[this.type].maxHealth;
    this.currentHp = this.maxHealth;
    this.cost = config.tower[this.type].cost;

    const towerSprite = config.tower[this.type].sprite?.toSprite();
    if (towerSprite) this.graphics.use(towerSprite);

    this.beachball = Resources.Beachball.toSprite();
    this.beachball.scale = vec(0.5, 0.5);

    // For resource tower
    this.sand = Resources.CompactedSand.toSprite();
    this.bucketSheet = SpriteSheet.fromImageSource({
      image: Resources.BucketSheet,
      grid: {
        spriteWidth: 64,
        spriteHeight: 64,
        rows: 1,
        columns: 9,
      },
    });
    this.bucketLoadingFrames = 4;
    this.bucketGlow = Animation.fromSpriteSheet(
      this.bucketSheet,
      range(5, 8),
      200,
      AnimationStrategy.Loop
    );

    // draw health bar
    this.healthBar = new Healthbar(this.maxHealth);
    this.addChild(this.healthBar);
    this.on("kill", (ke) => this.onKill(ke));
    this.on("pointerdown", (evt) => this.onClick(evt));
  }

  onInitialize(engine: Engine) {
    this._engine = engine;
  }

  // Note: Doesn't restrict to only tiles we can fire upon.
  // I.E. We place this and there are enemies to the left - it will still fire
  hasEnemyToFireOn(): boolean {
    return this.row.find((tile) => Enemy.enemiesInTile(tile) > 0) != undefined;
  }

  setSprite() {
    if (this.readyToFire()) {
      const towerSprite = config.tower[this.type].spriteReady?.toSprite();
      if (towerSprite) this.graphics.use(towerSprite);
    } else {
      const towerSprite = config.tower[this.type].sprite?.toSprite();
      if (towerSprite) this.graphics.use(towerSprite);
    }
  }

  readyToFire() {
    return this._currentFireTimer <= 0;
  }

  private _currentFireTimer: number = 0; // Counts down, when <= 0 the tower can fire.
  private _resourceTimer: number = 0;
  private _resourceAvailable: boolean = false;
  onPostUpdate(_engine: Engine, updateMs: number) {
    this._resourceTimer += updateMs / 1000;
    this._currentFireTimer -= updateMs;
    if (!this.isResourceType()) {
      if (this.readyToFire()) {
        if (this.hasEnemyToFireOn()) {
          this.fire();
          this._currentFireTimer = config.tower[this.type].baseTowerFireRateMs;
          this.setSprite();
        } else {
          this._currentFireTimer = 0;
          this.setSprite();
        }
      }
    } else {
      // Resource tower charging up
      if (
        this._resourceTimer <= config.tower[this.type].resourceSpawnTimer &&
        !this._resourceAvailable
      ) {
        const percentLoaded =
          this._resourceTimer / config.tower[this.type].resourceSpawnTimer;
        const bucketFrame = Math.floor(
          percentLoaded * this.bucketLoadingFrames
        );
        const maybeFrame = this.bucketSheet.getSprite(bucketFrame, 0);
        if (maybeFrame) {
          this.graphics.use(maybeFrame);
        }
      }

      // Resource is available for player to click, doesn't reset until click
      if (
        this._resourceTimer > config.tower[this.type].resourceSpawnTimer &&
        !this._resourceAvailable
      ) {
        this._resourceTimer = 0;
        this._resourceAvailable = true;
        this.graphics.use(this.bucketGlow);
      }
    }
  }

  isResourceType() {
    return config.tower[this.type].resourceSpawnTimer !== 0;
  }

  onClick(evt: Input.PointerEvent) {
    if (this.isResourceType() && this._resourceAvailable) {
      Resources.FxHarvestTower.play();
      PlayerState.AddMoney(config.tower[this.type].resourceSpawnValue);
      this._resourceAvailable = false;
      this._resourceTimer = 0;

      const collectedActor = new Actor({
        name: "Collected Sand",
        pos: this.pos,
        z: 10,
        scale: vec(0.8, 0.8),
      });

      collectedActor.on("initialize", (evt) => {
        evt.target.graphics.use(this.sand);

        // NOT KILLING EVEN THOUGH IT WORKS
        // const moneyPos = $("#moneyContainer").offset();
        // const moneyWidth = $("#moneyContainer").width();
        // const moneyHeight = $("#moneyContainer").height();
        // const screenMoneyPos = evt.engine.screen.pageToScreenCoordinates(
        //   vec(
        //     Math.round(moneyPos.left + moneyWidth / 2),
        //     Math.round(moneyPos.top + moneyHeight / 2)
        //   )
        // );
        var screenMoneyPos = vec(
          Math.round(config.grid.tileWidth + config.grid.tileWidth / 4),
          Math.round(
            config.grid.tileHeight * config.grid.height +
              config.grid.tileHeight / 2
          )
        );

        evt.target.actions
          .easeTo(screenMoneyPos, 500, EasingFunctions.EaseOutCubic)
          .delay(200)
          .callMethod(() => {
            evt.target.kill();
          });
      });

      this._engine.add(collectedActor);
    }
  }

  onKill(killEvent: KillEvent) {
    const broken = new TowerBroken(
      this.type,
      this._tile,
      this._grid,
      this.pos.x,
      this.pos.y
    );
    this._engine.add(broken);
  }

  fire = () => {
    if (!config.tower[this.type].firesBullets) return;
    // Fire bullet and add to engine
    const bullet = new Actor({
      name: "Tower Bullet",
      pos: this.pos,
      vel: vec(config.tower[this.type].bulletSpeedPixelsPerSecond, 0),
      radius: config.tower[this.type].bulletRadius,
      color: Color.Black,
      angularVelocity: Math.PI * 2,
      collisionGroup: CollisionGroup.collidesWith([
        Enemy.CollisionGroupGround,
        Enemy.CollisionGroupFlying,
      ]),
      collisionType: CollisionType.Passive,
      z: config.z.bullets,
    });

    bullet.graphics.use(this.beachball);

    bullet.on("precollision", (evt) => {
      const enemy = evt.other as Enemy;
      enemy.takeDamage(config.tower[this.type].bulletDamage);
      bullet.kill();
    });

    bullet.on("exitviewport", () => {
      bullet.kill();
    });

    this.playBulletFling();

    this._engine.add(bullet);
  };

  playBulletFling() {
    var sound = randFling.pickOne(FxTowerFlings);
    sound.play();
  }

  takeDamage(damage: number) {
    this.currentHp -= damage;
    this.healthBar.takeDamage(damage);

    this.playTakeDamageSound();

    if (this.currentHp <= 0) {
      this._tile.data.delete("tower");
      this.kill();
    }
  }

  playTakeDamageSound() {
    switch (this.type) {
      default:
        Resources.FxImpactTowerByEnemy.play();
    }
  }
}

export enum TowerType {
  default = "default",
  sandBucket = "sandBucket",
  upgradeCatapult = "upgradeCatapult",
  sandWall = "sandWall",
}
