import { ImageSource, Sound, ImageFiltering } from "excalibur";

// Images
import swordUrl from "./images/sword.png";
import sandUrl from "./images/sand-placeholder.png";
import sandCastleUrl from "./images/sandcastle-placeholder.png";

// Sounds
import clankUrl from "./sounds/clank.wav";

export const Resources = {
    // Images
    Sword: new ImageSource(swordUrl),
    Sand: new ImageSource(sandUrl, false, ImageFiltering.Pixel),
    SandCastle: new ImageSource(sandCastleUrl, false, ImageFiltering.Pixel),

    // Sounds
    Clank: new Sound(clankUrl)
}