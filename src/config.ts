import { Color } from "excalibur";
import { Resources } from "./resources";
export interface WavesDescriptor {
    [waveIndex: number] : {
        name: string;
        offsets: {
            [offsetTimeSeconds: number]: { type: 'crab' | 'turtle' | 'seagull', count: number}[]
        }
    }
}

export default {
  DatGuiMenuEnabled: true,
  ShowDevTool: true,
  SoundVolume: 0.3,
  BackgroundAmbianceVolume: 1.0,
  BackgroundMusicVolume: 0.2,
  Seed: 1337,

  z: {
    towers: 3,
    bullets: 6,
    enemies: 4,
    healthbars: 5
  },

  // Grid (the "board" of the game)
  grid: {
    width: 9,
    height: 5,
    padding: 1,
    tileWidth: 64,
    tileHeight: 64,
  },

  sandcastle: {
    maxHealth: 10,
  },

  healthBarWidthPixels: 64 - 10,

  player: {
    startingMonies: 5,
    passiveWealthTick: 15,
    passiveWealthAmt: 1,
  },

  tower: {
    default: {
      // rename this tower type?
      baseTowerFireRateMs: 5000,
      bulletDamage: 1,
      bulletRadius: 10,
      bulletSpeedPixelsPerSecond: 100,
      color: Color.Orange,
      cost: 1,
      firesBullets: true,
      displayName: "Hatty",
      hoverText: "A sand turret to spray",
      maxHealth: 5,
      resourceSpawnTimer: 0,
      resourceSpawnValue: 0,
      sprite: Resources.BaseTower,
      spriteBroken: Resources.BaseTowerBroken,
      spriteReady: Resources.BaseTower,
    },
    upgradeCatapult: {
      // rename this tower type?
      baseTowerFireRateMs: 5000,
      bulletDamage: 3,
      bulletRadius: 10,
      bulletSpeedPixelsPerSecond: 750,
      color: Color.DarkGray,
      cost: 3,
      firesBullets: true,
      displayName: "Sandapult",
      hoverText: "Seas the day to fling sand!",
      maxHealth: 2,
      resourceSpawnTimer: 0,
      resourceSpawnValue: 0,
      sprite: Resources.CatapultTower,
      spriteBroken: Resources.CatapultTowerBroken,
      spriteReady: Resources.CatapultTowerLoaded,
    },
    sandBucket: {
      bulletSpeedPixelsPerSecond: 0,
      bulletRadius: 0,
      baseTowerFireRateMs: 0,
      bulletDamage: 0,
      color: Color.Azure,
      cost: 1,
      firesBullets: false,
      displayName: "Buckaroo",
      hoverText: "All the kids need sand to build!",
      maxHealth: 5,
      resourceSpawnTimer: 15,
      resourceSpawnValue: 1,
      sprite: Resources.BucketTower,
      spriteBroken: Resources.BucketTowerBroken,
      spriteReady: Resources.BucketTower,
    },
    sandWall: {
      bulletSpeedPixelsPerSecond: 0,
      bulletRadius: 0,
      baseTowerFireRateMs: 0,
      bulletDamage: 0,
      color: Color.Orange,
      cost: 2,
      firesBullets: false,
      displayName: "Sandguard",
      hoverText: "Piled sand to hold the nastys at bay!",
      maxHealth: 10,
      resourceSpawnTimer: 0,
      resourceSpawnValue: 0,
      sprite: Resources.Sandwall,
      spriteBroken: null,
      spriteReady: Resources.Sandwall,
    },
    // other tower types?
  },

  enemy: {
    crab: {
      width: 50,
      height: 50,
      health: 3,
      damage: 2, // how much damage this enemy type does
      damageTimerMs: 1000, // how frequently this enemy type attacks
      speed: 15, // (pixels/second)
      color: Color.Red, // the color of the actor when it doesn't have any art applied
      sprite: null,
      collisionGroup: "enemy_ground",
      // TODO art and animations?
    },
    turtle: {
      width: 50,
      height: 50,
      health: 5,
      damage: 1,
      damageTimerMs: 1000,
      speed: 8,
      color: Color.Green,
      sprite: null,
      collisionGroup: "enemy_ground",
      // TODO art and animations?
    },
    seagull: {
      width: 50,
      height: 50,
      health: 1,
      damage: 1,
      damageTimerMs: 1000,
      speed: 26,
      color: Color.Blue,
      sprite: null,
      collisionGroup: "enemy_flying",
    },
    // other enemy types?
  },

  waves: {
    0: {
      name: "The Beginning", // tutorial
      offsets: {
        2: [
          { type: "crab", count: 0 }, // we hardcode the first enemy in level.ts so that it's on the path of the existing default tower
        ],
        15: [
          { type: "crab", count: 1 },
          { type: "seagull", count: 15 },
        ],
        25: [{ type: "crab", count: 2 }],
        35: [
          { type: "turtle", count: 1 },
          { type: "crab", count: 2 },
        ],
      },
    },
    1: {
      name: "Wave 1",
      offsets: {
        // in seconds
        7: [
          { type: "crab", count: 1 },
          // { type: 'turtle', count: 3 }
        ],
        11: [
          // { type: 'crab', count: 3 },
          { type: "turtle", count: 2 },
        ],
        20: [
          { type: "crab", count: 2 },
          { type: "turtle", count: 3 },
        ],
      },
    },
    2: {
      name: "Wave 2",
      offsets: {
        7: [{ type: "crab", count: 5 }],
        11: [{ type: "crab", count: 5 }],
        20: [{ type: "crab", count: 5 }],
      },
    },
    3: {
      name: "Wave 3",
      offsets: {
        7: [{ type: "crab", count: 4 }],
        11: [{ type: "crab", count: 4 }],
        20: [{ type: "crab", count: 4 }],
      },
    },
    4: {
      name: "Wave INEVITABLE",
      offsets: {
        2: [
          { type: "crab", count: 5 },
          { type: "turtle", count: 6 },
        ],
        7: [
          { type: "crab", count: 5 },
          { type: "turtle", count: 6 },
        ],
        12: [
          { type: "crab", count: 5 },
          { type: "turtle", count: 9 },
        ],
        17: [
          { type: "crab", count: 5 },
          { type: "turtle", count: 12 },
        ],
        22: [
          { type: "crab", count: 5 },
          { type: "turtle", count: 15 },
        ],
        27: [
          { type: "crab", count: 5 },
          { type: "turtle", count: 18 },
        ],
      },
    },
  } as WavesDescriptor,
};
