import { Color } from "excalibur";
import { Resources } from "./resources";
export interface WavesDescriptor {
    [waveIndex: number] : {
        name: string;
        offsets: {
            [offsetTimeSeconds: number]: { type: 'crab' | 'turtle', count: number}[]
        }
    }
}

export default {
    ShowDevTool: true,
    SoundVolume: 0.3,
    BackgroundAmbianceVolume: 0.4,
    Seed: 1337,

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
    },

    tower: {
        default: { // rename this tower type?
            baseTowerFireRateMs: 5000,
            bulletDamage: 1,
            bulletRadius: 10,
            bulletSpeedPixelsPerSecond: 100,
            color: Color.Orange,
            cost: 1,
            firesBullets: true,
            maxHealth: 5, 
            resourceSpawnTimer: 0,
            resourceSpawnValue: 0,
            sprite: Resources.BaseTower,
        },
        sandBucket: {
            bulletSpeedPixelsPerSecond: 0,
            bulletRadius: 0,
            baseTowerFireRateMs: 0,
            bulletDamage: 0,
            color: Color.Azure,
            cost: 1,
            firesBullets: false,
            maxHealth: 5, 
            resourceSpawnTimer: 5,
            resourceSpawnValue: 1,
            sprite: null,
        }
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
            color: Color.Red // the color of the actor when it doesn't have any art applied
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
            // TODO art and animations?
        },
        // other enemy types?
    },

    waves: {
        1: {
            name: "Wave 1",
            offsets: {
                2 : [
                    { type: 'crab', count: 1 },
                    // { type: 'turtle', count: 3 }
                ],
                6 : [
                    // { type: 'crab', count: 3 },
                    { type: 'turtle', count: 2 }
                ],
                15 : [
                    { type: 'crab', count: 2 },
                    { type: 'turtle', count: 3 }
                ]
            }
        },
        2: {
            name: "Wave 2",
            offsets: {
                2: [
                    {type: 'crab', count: 5 }
                ],
                5: [
                    {type: 'crab', count: 5 }
                ],
                15: [
                    {type: 'crab', count: 5 }
                ]
            }
        },
        3: {
            name: "Wave Butts",
            offsets: {
                2: [
                    {type: 'crab', count: 4 }
                ],
                5: [
                    {type: 'crab', count: 4 }
                ],
                15: [
                    {type: 'crab', count: 4 }
                ]
            }
        },
        4: {
            name: "Wave INEVITABLE",
            offsets: {
                2: [
                    {type: 'crab', count: 5 }
                ],
                7: [
                    {type: 'crab', count: 5 }
                ],
                12: [
                    {type: 'crab', count: 5 }
                ],
                17: [
                    {type: 'crab', count: 5 }
                ],
                22: [
                    {type: 'crab', count: 5 }
                ],
                27: [
                    {type: 'crab', count: 5 }
                ]
            }
        }
    } as WavesDescriptor

}