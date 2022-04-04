import config from "./config";
import { Engine, Text, Font, Actor, vec, Random, EasingFunctions, range} from "excalibur";
import { EnemyGenerator } from './enemyGenerator';
import { Enemy, EnemyType } from "./enemy";
import { Resources } from './resources';

export class WaveDispatcher extends Actor {
    private _spawner: EnemyGenerator;
    private _text: Text;
    private _textActor: Actor;
    private _random: Random;
    // private _engine: Engine;
    
    constructor(spawner: EnemyGenerator, random: Random) {
        super({
            name: 'WaveDispatcher'
        })
        this._spawner = spawner;
        this._random = random;
        this._textActor = new Actor({
            pos: vec(config.grid.width * config.grid.tileWidth + 500, (config.grid.height / 2) * config.grid.tileHeight),
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
    private _currentWave: number = 5; // TODO skip to end for testing
    private _currentEnemies: Enemy[] = [];
    private _dispatched: number[] = [];
    override onPostUpdate(_engine: Engine, deltaMs: number) {
        if (this._stopped) return;
        this._currentTime += deltaMs;
        
        let waveConfig = config.waves[this._currentWave];
        if(!waveConfig) {
            let name = `Wave ${this._currentWave}`;
            let offsetList = {};
            for(let i of range(0, this._currentWave)){
                for (let enemyDescriptor of Object.values(EnemyType)) {
                    let max = 0;
                    let min = this._currentWave
                    switch(enemyDescriptor){
                        case EnemyType.Crab:
                        max = min + 5;
                        break;
                        case EnemyType.Seagull:
                        max = min + 3;
                        break;
                        case EnemyType.Turtle:
                        max = min + 7;
                        break;
                    }
                    let index = 2 + i * 5;
                    if(!(offsetList as any)[index]) (offsetList as any)[index] = [];
                    (offsetList as any)[index].push({type: enemyDescriptor, count: this._random.range(1, min, max)[0]});
                }
                waveConfig = {
                    name: name,
                    offsets: offsetList
                }
                config.waves[this._currentWave] = waveConfig;
                console.log(waveConfig);
            }
        }

        if (this._dispatched.length === Object.keys(config.waves[this._currentWave].offsets).length && this.enemiesComplete()) {
            this._currentWave++;
            this._currentTime = 0;
            this._dispatched.length = 0;
            this._currentEnemies.length = 0;
            console.log('Wave Complete');
        }
        
        
        
        if (waveConfig) {
            for (let offset in waveConfig.offsets) {
                if (!this._dispatched.find(s => s === Number(offset))) {
                    if ((this._currentTime/1000) >= Number(offset)) {
                        if (this.isBeginningOfWave()) {
                            const waveConfig = config.waves[this._currentWave];
                            this._text.text = waveConfig.name;
                            this.showWaveBanner(`Wave: ${this._currentWave}`);
                        }
                        this._dispatched.push(Number(offset));
                        for(let enemyDescriptor of waveConfig.offsets[offset]) {
                            this._currentEnemies = this._currentEnemies.concat(this._spawner.spawnEnemies(enemyDescriptor.type as EnemyType, enemyDescriptor.count));
                        }
                    }
                }
            }
            // } else {
            //     let offsetList = [2]
            //     for(let i in range(0, this._currentWave)){
            //         offsetList.push(offsetList[i] + 5);
            //     }
            //     console.log(offsetList);
            //     for (let offset in offsetList){
            //         if (!this._dispatched.find(s => s === Number(offset))) {
            //             if ((this._currentTime/1000) >= Number(offset)) {
            //                 if (this.isBeginningOfWave()) {
            //                     this._text.text = `Wave: ${this._currentWave}`;
            //                     this.showWaveBanner(`Wave: ${this._currentWave}`);
            //                 }
            //                 this._dispatched.push(Number(offset));
            
            //                 for (let enemyDescriptor of Object.values(EnemyType)) {
            //                     let max = 0;
            //                     let min = this._currentWave
            //                     switch(enemyDescriptor){
            //                         case EnemyType.Crab:
            //                         max = min + 5;
            //                         break;
            //                         case EnemyType.Seagull:
            //                         max = min + 3;
            //                         break;
            //                         case EnemyType.Turtle:
            //                         max = min + 7;
            //                         break;
            //                     }
            //                     this._currentEnemies = this._currentEnemies.concat(this._spawner.spawnEnemies(enemyDescriptor as EnemyType, this._random.range(1, min, max)[0]));
            //                 }
            //             }
            //         }
            // }
        }
    }
    
    enemiesComplete() {
        return this._currentEnemies.every(e => !e.active);
    }
    
    isBeginningOfWave() {
        return this._dispatched.length === 0;
    }
    
    showWaveBanner(text: string) {
        Resources.FxWaveAppear.play();
        this._textActor.actions.easeTo(vec(config.grid.tileWidth * config.grid.width / 1.33,  (config.grid.height / 2) * config.grid.tileHeight), 1000, EasingFunctions.EaseInOutCubic);
        this._textActor.actions.delay(1000);
        this._textActor.actions.easeTo(this._textActor.pos.add(vec(1000, 0)), 1000, EasingFunctions.EaseInOutCubic);
        this._textActor.actions.callMethod(() =>{
            this._textActor.pos = vec(config.grid.width * config.grid.tileWidth + 500, (config.grid.height / 2) * config.grid.tileHeight);
        })
    }
}