import { ImageSource, Sound, ImageFiltering } from "excalibur";

// Images
import swordUrl from "./images/sword.png";
import sandUrl from "./images/sand-placeholder.png";
import sandCastleUrl from "./images/sandcastle-placeholder.png";
import towerBucketUrl from "./images/tower-bucket-placeholder.png";
import towerBucketBrokenUrl from "./images/tower-bucket-broken-placeholder.png";
import towerUrl from "./images/tower-placeholder.png";
import towerBrokenUrl from "./images/tower-placeholder-broken.png";
import sandWall from "./images/sandwall.png"

// Sounds
import clankUrl from "./sounds/clank.wav";
import bgAmbiance from './sounds/bg-beach.mp3';
import bgMusic from './sounds/bg-music.mp3';
import waveAppear from './sounds/wave-appear.ogg';
import impactEnemyRock from './sounds/impact-enemy-rock.ogg';
import impactTower from './sounds/impact-tower.ogg';

export const Resources = {
    // Images
    Sword: new ImageSource(swordUrl),
    Sand: new ImageSource(sandUrl, false, ImageFiltering.Pixel),
    SandCastle: new ImageSource(sandCastleUrl, false, ImageFiltering.Pixel),
    BaseTower: new ImageSource(towerUrl, false, ImageFiltering.Pixel),
    BaseTowerBroken: new ImageSource(towerBrokenUrl, false, ImageFiltering.Pixel),
    BucketTower: new ImageSource(towerBucketUrl, false, ImageFiltering.Pixel),
    BucketTowerBroken: new ImageSource(towerBucketBrokenUrl, false, ImageFiltering.Pixel),
    Sandwall: new ImageSource(sandWall, false, ImageFiltering.Pixel),
    // Sounds
    Clank: new Sound(clankUrl),
    BackgroundAmbiance: new Sound(bgAmbiance),
    BackgroundMusic: new Sound(bgMusic),
    FxWaveAppear: new Sound(waveAppear),
    FxImpactEnemyRock: new Sound(impactEnemyRock),
    FxImpactTowerByEnemy: new Sound(impactTower)
}