import { DisplayMode, Engine, Loader } from "excalibur";
import { loadPreferences } from "./preferences";
import { Level } from "./level";
import { Resources } from "./resources";
import { SoundManager } from "./sound-manager";
import { DevTool } from "@excaliburjs/dev-tools";

loadPreferences();
SoundManager.init();
export class Game extends Engine {
    showDevTool: boolean = true;
    constructor() {
        super({
            canvasElementId: 'game',
            displayMode: DisplayMode.FitScreen
        });
    }

    init() {
        if (this.showDevTool) {
            const devtool = new DevTool(this);
        }

        this.startLevel();
        const loader = new Loader();
        for (const resource of Object.values(Resources)) {
            loader.addResource(resource);
        }
        this.start(loader).then(() => {
            // game start stuff
        });
    }

    startLevel = () => {
        const level = new Level();
        this.addScene("main", level);
        this.goToScene("main");
    }
}

export const game = new Game();

game.init();