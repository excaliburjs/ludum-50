import { Color } from "excalibur";

export default {
    ShowDevTool: true,
    SoundVolume: 0.3,
    Seed: 1337,

    // Grid
    tileWidth: 64,
    tileHeight: 64,
    gridWidth: 9,
    gridHeight: 5,
    gridPadding: 1,

    // Sandcastle
    maxHealth: 10,
    healthBarWidthPixels: 64 - 10,

    // Tower
    bulletSpeedPixelsPerSecond: 100,
    bulletRadius: 10,
    baseTowerFireRateMs: 5000,

    // Enemies
    enemyDamageTimerMs: 1000,
    enemy: {
        crab: {
            width: 50,
            height: 50,
            health: 3,
            damage: 2, // how much damage this enemy does to the castle
            speed: 15, // (pixels/second)
            color: Color.Red // the color of the actor when it doesn't have any art applied
            // TODO art and animations?
        },
        turtle: {
            width: 50,
            height: 50,
            health: 5,
            damage: 1,
            speed: 8,
            color: Color.Green,
            // TODO art and animations?
        }
    }

}