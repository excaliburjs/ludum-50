import { DisplayMode, Engine, Loader } from "excalibur";
import { loadPreferences } from "./preferences";
import { Level } from "./level";
import { Resources } from "./resources";
import { SoundManager } from "./sound-manager";
import { DevTool } from "@excaliburjs/dev-tools";
import config from "./config";

loadPreferences();
SoundManager.init();
export class Game extends Engine {
    showDevTool: boolean = config.ShowDevTool;
    devTool!: DevTool;
    constructor() {
        super({
            canvasElementId: 'game',
            displayMode: DisplayMode.FitScreen,
            // .5 tile of padding for now
            resolution: { width: config.tileWidth * (config.width + config.padding), height: config.tileHeight * (config.height + config.padding) }
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
           this.setupDevTool();
        });

    }

    startLevel = () => {
        const level = new Level();
        this.addScene("main", level);
        this.goToScene("main");
    }

    setupDevTool = () => {
        if (this.showDevTool) {
            this.devTool = new DevTool(this);
            let configTab = this.devTool.pane.addTab({
                pages: [{
                    title: "Config"
                }]
            })
            let configPage = configTab.pages[0];
            for (let key in config) {
                configPage.addInput(config, key as any, {
                    disabled: true // config not editable yet
                })
            }
        }
    }
}

export const game = new Game();

game.init();