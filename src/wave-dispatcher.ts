import config from "./config";
import { Engine, Entity, TransformComponent, Text, Font, Actor, vec, Color, EasingFunctions} from "excalibur";
import { EnemyGenerator } from './enemyGenerator';
import { Enemy, EnemyType } from "./enemy";

export class WaveDispatcher extends Actor {
    private _spawner: EnemyGenerator;
    private _text: Text;
    private _textActor: Actor;
    // private _engine: Engine;

    constructor(spawner: EnemyGenerator) {
        super({
            name: 'WaveDispatcher'
        })
        this._spawner = spawner;
        this._textActor = new Actor({
            pos: vec(-100, (config.grid.height + 1) * config.grid.tileHeight),
            z: 10
        });
        this._text = new Text({
            text: 'Wave 1',
            font: new Font({
                size: 32,
                family: 'Kanit, sans-serif',
                quality: 8,
                smoothing: true
            }),
        })
        this._textActor.graphics.use(this._text);
        this.addChild(this._textActor)
    }

    override onInitialize(engine: Engine) {
        // this._engine = engine;
    }

    private _stopped = false;
    public stop() {
        this._stopped = true;
    }

    private _currentTime: number = 0;
    private _currentWave: number = 1; // TODO skip to end for testing
    private _currentEnemies: Enemy[] = [];
    private _dispatched: number[] = [];
    override onPostUpdate(_engine: Engine, deltaMs: number) {
        if (this._stopped) return;
        this._currentTime += deltaMs;

        if (config.waves[this._currentWave]) {
            if (this._dispatched.length === Object.keys(config.waves[this._currentWave].offsets).length && this.enemiesComplete()) {
                this._currentWave++;
                this._currentTime = 0;
                this._dispatched.length = 0;
                this._currentEnemies.length = 0;
                console.log('Wave Complete');
            }
        }

        const waveConfig = config.waves[this._currentWave];

        if (waveConfig) {
            for (let offset in waveConfig.offsets) {
                // Hasn't been dispatched yet
                if (!this._dispatched.find(s => s === Number(offset))) {
                    if ((this._currentTime/1000) >= Number(offset)) {
                        if (this.isBeginningOfWave()) {
                            this.showWaveBanner();
                        }
                        this._dispatched.push(Number(offset));
                        for(let enemyDescriptor of waveConfig.offsets[offset]) {
                            this._currentEnemies = this._currentEnemies.concat(this._spawner.spawnEnemies(enemyDescriptor.type as EnemyType, enemyDescriptor.count));
                        }
                    }
                }
            }
        }
    }

    enemiesComplete() {
        return this._currentEnemies.every(e => !e.active);
    }

    isBeginningOfWave() {
        return this._dispatched.length === 0;
    }

    showWaveBanner() {
        const waveConfig = config.waves[this._currentWave];
        this._text.text = waveConfig.name;
        this._textActor.actions.easeTo(this._textActor.pos.add(vec(200, 0)), 1000, EasingFunctions.EaseInOutCubic);
        this._textActor.actions.delay(1000);
        this._textActor.actions.easeTo(this._textActor.pos.add(vec(1000, 0)), 1000, EasingFunctions.EaseInOutCubic);
        this._textActor.actions.callMethod(() =>{
            this._textActor.pos = vec(-100, (config.grid.height + 1) * config.grid.tileHeight);
        })
    }
}