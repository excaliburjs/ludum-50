import { DisplayMode, Engine, Loader } from "excalibur";
import { Level } from "./level";
import { Resources } from "./resources";

export class Game extends Engine {
    constructor() {
        super({
            canvasElementId: 'game',
            displayMode: DisplayMode.FitScreen
        });
    }

    init() {
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