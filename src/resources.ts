import { ImageSource, Sound, ImageFiltering } from "excalibur";

// Images
import swordUrl from "./images/sword.png";
import sandUrl from "./images/sand-placeholder.png";
import sandCastleUrl from "./images/sandcastle-placeholder.png";
import towerBucketUrl from "./images/tower_bucket_placeholder.png";
import towerUrl from "./images/tower-placeholder.png";
import towerUrlBroken from "./images/tower-placeholder_broken.png";

// Sounds
import clankUrl from "./sounds/clank.wav";
import bgAmbiance from './sounds/bg-beach.mp3';

export const Resources = {
    // Images
    Sword: new ImageSource(swordUrl),
    Sand: new ImageSource(sandUrl, false, ImageFiltering.Pixel),
    SandCastle: new ImageSource(sandCastleUrl, false, ImageFiltering.Pixel),
    BaseTower: new ImageSource(towerUrl, false, ImageFiltering.Pixel),
    BaseTowerBroken: new ImageSource(towerUrlBroken, false, ImageFiltering.Pixel),
    BucketTower: new ImageSource(towerBucketUrl, false, ImageFiltering.Pixel),

    // Sounds
    Clank: new Sound(clankUrl),
    BackgroundAmbiance: new Sound(bgAmbiance)
}