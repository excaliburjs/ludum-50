import { ImageSource, Sound } from "excalibur";

// Images
import swordUrl from "./images/sword.png";

// Sounds
import clankUrl from "./sounds/clank.wav";

export const Resources = {
    // Images
    Sword: new ImageSource(swordUrl),

    // Sounds
    Clank: new Sound(clankUrl)
}