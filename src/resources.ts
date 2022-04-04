import { ImageSource, Sound, ImageFiltering } from "excalibur";

// Images
import swordUrl from "./images/sword.png";
import sandUrl from "./images/sand-placeholder.png";
import sandCastleUrl from "./images/sandcastle-placeholder.png";
import sandCastleDamagedUrl from "./images/sandcastle-damaged.png";
import sandCastleDestroyedUrl from "./images/sandcastle-destroyed.png";
import towerBucketUrl from "./images/tower-bucket-placeholder.png";
import towerBucketBrokenUrl from "./images/tower-bucket-broken-placeholder.png";
import towerUrl from "./images/base-tower.png";
import towerBrokenUrl from "./images/tower-placeholder-broken.png";
import catapultUrl from "./images/catapult.png";
import catapultBrokenUrl from "./images/catapult-broken.png";
import catapultLoadedUrl from "./images/catapult-loaded.png";
import sandWall from "./images/sandwall.png";
import wall from "./images/wall.png";
import waterUrl from './images/waves.png';
import bucketSheetUrl from './images/tower-bucket.png';
import compactedSandUrl from './images/sand.png';
import beachBallUrl from './images/beachball.png';
import turtleUrl from './images/turtle.png';
import crabUrl from './images/crab.png';
import seagullUrl from './images/seagull.png';
import bottomBorderUrl from './images/bottom-border.png';
import sideBorderUrl from './images/beneath-castle.png';
import shieldUrl from './images/shield.png';
import blockedCursorUrl from './images/blocked-cursor.png';

// Sounds
import clankUrl from "./sounds/clank.wav";
import bgAmbiance from "./sounds/bg-beach.mp3";
import bgMusic from "./sounds/bg-music.mp3";
import waveAppear from "./sounds/wave-appear.mp3";
import impactEnemyBall from "./sounds/impact-enemy-ball.mp3";
import impactTower from "./sounds/impact-tower.mp3";
import impactCastle from "./sounds/impact-castle.mp3";
import pickTower from "./sounds/pick-tower.mp3";
import harvestTower from "./sounds/harvest-tower.mp3";
import placeTower from "./sounds/place-tower.mp3";
import fling01 from "./sounds/fling-01.mp3";
import fling02 from "./sounds/fling-02.mp3";
import fling03 from "./sounds/fling-03.mp3";
import fling04 from "./sounds/fling-04.mp3";
import fling05 from "./sounds/fling-05.mp3";
import fling06 from "./sounds/fling-06.mp3";
import dieTurtle from './sounds/die-turtle.mp3';
import dieGull from './sounds/die-gull.mp3';
import dieCrab from './sounds/die-crab.mp3';

export const Resources = {
  // Images
  Sword: new ImageSource(swordUrl),
  Sand: new ImageSource(sandUrl, false, ImageFiltering.Pixel),
  SandCastle: new ImageSource(sandCastleUrl, false, ImageFiltering.Pixel),
  SandCastleDamaged: new ImageSource(sandCastleDamagedUrl, false, ImageFiltering.Pixel),
  SandCastleDestroyed: new ImageSource(sandCastleDestroyedUrl, false, ImageFiltering.Pixel),
  BaseTower: new ImageSource(towerUrl, false, ImageFiltering.Pixel),
  BaseTowerBroken: new ImageSource(towerBrokenUrl, false, ImageFiltering.Pixel),
  CatapultTower: new ImageSource(catapultUrl, false, ImageFiltering.Pixel),
  CatapultTowerLoaded: new ImageSource(catapultLoadedUrl, false, ImageFiltering.Pixel),
  CatapultTowerBroken: new ImageSource(catapultBrokenUrl, false, ImageFiltering.Pixel),
  BucketTower: new ImageSource(towerBucketUrl, false, ImageFiltering.Pixel),
  BucketTowerBroken: new ImageSource(
    towerBucketBrokenUrl,
    false,
    ImageFiltering.Pixel
  ),
  Sandwall: new ImageSource(wall, false, ImageFiltering.Pixel),
  Water: new ImageSource(waterUrl, false, ImageFiltering.Pixel),
  BucketSheet: new ImageSource(bucketSheetUrl, false, ImageFiltering.Pixel),
  CompactedSand: new ImageSource(compactedSandUrl, false, ImageFiltering.Pixel),
  Beachball: new ImageSource(beachBallUrl, false, ImageFiltering.Pixel),
  TurtleSheet: new ImageSource(turtleUrl, false, ImageFiltering.Pixel),
  CrabSheet: new ImageSource(crabUrl, false, ImageFiltering.Pixel),
  SeagullSheet: new ImageSource(seagullUrl, false, ImageFiltering.Pixel),
  BottomBorder: new ImageSource(bottomBorderUrl, false, ImageFiltering.Pixel),
  SideBorder: new ImageSource(sideBorderUrl, false, ImageFiltering.Pixel),
  Shield: new ImageSource(shieldUrl, false, ImageFiltering.Pixel),
  BlockedCursor: new ImageSource(blockedCursorUrl, false, ImageFiltering.Pixel),

  // Sounds
  Clank: new Sound(clankUrl),
  BackgroundAmbiance: new Sound(bgAmbiance),
  BackgroundMusic: new Sound(bgMusic),
  FxWaveAppear: new Sound(waveAppear),
  FxImpactEnemyBall: new Sound(impactEnemyBall),
  FxImpactTowerByEnemy: new Sound(impactTower),
  FxImpactCastleByEnemy: new Sound(impactCastle),
  FxPlaceTower: new Sound(placeTower),
  FxHarvestTower: new Sound(harvestTower),
  FxTowerFlings01: new Sound(fling01),
  FxTowerFlings02: new Sound(fling02),
  FxTowerFlings03: new Sound(fling03),
  FxTowerFlings04: new Sound(fling04),
  FxTowerFlings05: new Sound(fling05),
  FxTowerFlings06: new Sound(fling06),
  FxDeathGull: new Sound(dieGull),
  FxDeathCrabForCutie: new Sound(dieCrab),
  FxDeathTurtle: new Sound(dieTurtle),
  UiPickTower: new Sound(pickTower),
};

export const FxTowerFlings = [
    Resources.FxTowerFlings01,
    Resources.FxTowerFlings02,
    Resources.FxTowerFlings03,
    Resources.FxTowerFlings04,
    Resources.FxTowerFlings05,
    Resources.FxTowerFlings06
];