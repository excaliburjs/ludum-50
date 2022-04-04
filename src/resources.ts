import { ImageSource, Sound, ImageFiltering } from "excalibur";

// Images
import swordUrl from "./images/sword.png";
import sandUrl from "./images/sand-placeholder.png";
import sandCastleUrl from "./images/sandcastle-placeholder.png";
import towerBucketUrl from "./images/tower-bucket-placeholder.png";
import towerBucketBrokenUrl from "./images/tower-bucket-broken-placeholder.png";
import towerUrl from "./images/tower-placeholder.png";
import towerBrokenUrl from "./images/tower-placeholder-broken.png";
import sandWall from "./images/sandwall.png";
import waterUrl from './images/waves.png';
import bucketSheetUrl from './images/tower-bucket.png';
import compactedSandUrl from './images/sand.png';
import beachBallUrl from './images/beachball.png';
import turtleUrl from './images/turtle.png';

// Sounds
import clankUrl from "./sounds/clank.wav";
import bgAmbiance from "./sounds/bg-beach.mp3";
import bgMusic from "./sounds/bg-music.mp3";
import waveAppear from "./sounds/wave-appear.ogg";
import waveAppearMp3 from "./sounds/wave-appear.mp3";
import impactEnemyRock from "./sounds/impact-enemy-rock.ogg";
import impactEnemyRockMp3 from "./sounds/impact-enemy-rock.mp3";
import impactTower from "./sounds/impact-tower.ogg";
import impactTowerMp3 from "./sounds/impact-tower.mp3";
import impactCastle from "./sounds/impact-castle.ogg";
import impactCastleMp3 from "./sounds/impact-castle.mp3";
import pickTower from "./sounds/pick-tower.ogg";
import pickTowerMp3 from "./sounds/pick-tower.mp3";
import placeTower from "./sounds/place-tower.mp3";
import fling01 from "./sounds/fling-01.mp3";
import fling02 from "./sounds/fling-02.mp3";
import fling03 from "./sounds/fling-03.mp3";
import fling04 from "./sounds/fling-04.mp3";
import fling05 from "./sounds/fling-05.mp3";
import fling06 from "./sounds/fling-06.mp3";

export const Resources = {
  // Images
  Sword: new ImageSource(swordUrl),
  Sand: new ImageSource(sandUrl, false, ImageFiltering.Pixel),
  SandCastle: new ImageSource(sandCastleUrl, false, ImageFiltering.Pixel),
  BaseTower: new ImageSource(towerUrl, false, ImageFiltering.Pixel),
  BaseTowerBroken: new ImageSource(towerBrokenUrl, false, ImageFiltering.Pixel),
  BucketTower: new ImageSource(towerBucketUrl, false, ImageFiltering.Pixel),
  BucketTowerBroken: new ImageSource(
    towerBucketBrokenUrl,
    false,
    ImageFiltering.Pixel
  ),
  Sandwall: new ImageSource(sandWall, false, ImageFiltering.Pixel),
  Water: new ImageSource(waterUrl, false, ImageFiltering.Pixel),
  BucketSheet: new ImageSource(bucketSheetUrl, false, ImageFiltering.Pixel),
  CompactedSand: new ImageSource(compactedSandUrl, false, ImageFiltering.Pixel),
  Beachball: new ImageSource(beachBallUrl, false, ImageFiltering.Pixel),
  TurtleSheet: new ImageSource(turtleUrl, false, ImageFiltering.Pixel),
  // Sounds
  Clank: new Sound(clankUrl),
  BackgroundAmbiance: new Sound(bgAmbiance),
  BackgroundMusic: new Sound(bgMusic),
  FxWaveAppear: new Sound(waveAppearMp3, waveAppear),
  FxImpactEnemyRock: new Sound(impactEnemyRockMp3, impactEnemyRock),
  FxImpactTowerByEnemy: new Sound(impactTowerMp3, impactTower),
  FxImpactCastleByEnemy: new Sound(impactCastleMp3, impactCastle),
  FxPlaceTower: new Sound(placeTower),
  FxTowerFlings01: new Sound(fling01),
  FxTowerFlings02: new Sound(fling02),
  FxTowerFlings03: new Sound(fling03),
  FxTowerFlings04: new Sound(fling04),
  FxTowerFlings05: new Sound(fling05),
  FxTowerFlings06: new Sound(fling06),
  UiPickTower: new Sound(pickTowerMp3, pickTower),
};

export const FxTowerFlings = [
    Resources.FxTowerFlings01,
    Resources.FxTowerFlings02,
    Resources.FxTowerFlings03,
    Resources.FxTowerFlings04,
    Resources.FxTowerFlings05,
    Resources.FxTowerFlings06
];