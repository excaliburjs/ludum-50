import { Color } from "excalibur";

export default {
    ShowDevTool: true,
    SoundVolume: 0.3,
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

    tower: {
        default: { // rename this tower type?
            bulletSpeedPixelsPerSecond: 100,
            bulletRadius: 10,
            baseTowerFireRateMs: 5000,
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
    }

}