import { Sound } from "excalibur";
import classNames from "classnames";
import { Resources } from "./resources";
import { Preferences, savePreferences } from "./preferences";
import Config from "./config";

export class SoundManager {
  static setSoundSpecificVolume() {
    Resources.Clank.volume = 0.5;
  }

  static init() {
    SoundManager.setSoundSpecificVolume();
    if (Preferences.muteBackgroundMusic) {
      SoundManager.muteBackgroundMusic();
    }
    if (Preferences.muteAll) {
      SoundManager.muteAll();
    }

    $("#mute-music").on("click", () => {
      if (Preferences.muteBackgroundMusic) {
        SoundManager.unmuteBackgroundMusic();
      } else {
        SoundManager.muteBackgroundMusic();
      }
      savePreferences();
      return false;
    });

    $("#mute-all").on("click", () => {
      if (Preferences.muteAll) {
        SoundManager.unmuteAll();
      } else {
        SoundManager.muteAll();
      }
      savePreferences();
      return false;
    });
  }

  static muteAll() {
    Preferences.muteAll = true;
    Preferences.muteBackgroundMusic = true;

    for (let r in Resources) {
      let snd = (Resources as any)[r];
      if (snd instanceof Sound) {
        snd.volume = 0;
      }
    }
    SoundManager.muteBackgroundMusic();
    SoundManager._updateMuteAllButton();
  }

  static unmuteAll() {
    Preferences.muteAll = false;
    Preferences.muteBackgroundMusic = false;

    for (var r in Resources) {
      let snd = (Resources as any)[r];
      if (snd instanceof Sound) {
        snd.volume = Config.SoundVolume;
      }
    }
    SoundManager.setSoundSpecificVolume();
    SoundManager.unmuteBackgroundMusic();
    SoundManager._updateMuteAllButton();
  }

  static startBackgroundMusic() {
    // start bg music
    Resources.BackgroundAmbiance.volume = Preferences.muteBackgroundMusic
      ? 0
      : Config.BackgroundAmbianceVolume;

    Resources.BackgroundAmbiance.loop = true;
    if (!Resources.BackgroundAmbiance.isPlaying())
      Resources.BackgroundAmbiance.play();

    Resources.BackgroundMusic.volume = Preferences.muteBackgroundMusic
      ? 0
      : Config.BackgroundMusicVolume;

    Resources.BackgroundMusic.loop = true;
    if (!Resources.BackgroundMusic.isPlaying())
      Resources.BackgroundMusic.play();
  }

  static stopBackgroundMusic() {
    // stop bg music
    Resources.BackgroundAmbiance.loop = false;
    Resources.BackgroundMusic.loop = false;
  }

  static muteBackgroundMusic() {
    Preferences.muteBackgroundMusic = true;

    // mute bg music
    Resources.BackgroundAmbiance.volume = 0;
    Resources.BackgroundMusic.volume = 0;
    SoundManager._updateMusicButton();
  }

  static unmuteBackgroundMusic() {
    Preferences.muteBackgroundMusic = false;

    // unmute bg music
    Resources.BackgroundAmbiance.volume = Config.BackgroundAmbianceVolume;
    Resources.BackgroundMusic.volume = Config.BackgroundMusicVolume;
    SoundManager._updateMusicButton();
  }

  private static _updateMusicButton() {
    $("#mute-music i").get(0).className = classNames("fa", {
      "fa-music": !Preferences.muteBackgroundMusic,
      "fa-play": Preferences.muteBackgroundMusic,
    });
  }

  private static _updateMuteAllButton() {
    $("#mute-all i").get(0).className = classNames("fa", {
      "fa-volume-up": !Preferences.muteAll,
      "fa-volume-off": Preferences.muteAll,
    });
  }
}
