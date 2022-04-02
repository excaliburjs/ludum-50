import { ImageSource, Sound, ImageFiltering } from "excalibur";

// Images
import swordUrl from "./images/sword.png";
import sandUrl from "./images/sand-placeholder.png";

// Sounds
import clankUrl from "./sounds/clank.wav";

export const Resources = {
    // Images
    Sword: new ImageSource(swordUrl),
    Sand: new ImageSource(sandUrl, false, ImageFiltering.Blended),

    // Sounds
    Clank: new Sound(clankUrl)
}