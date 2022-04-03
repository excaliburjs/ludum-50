import { DisplayMode, Engine, Loader, Input, Logger, Color } from "excalibur";
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
            antialiasing: false,
            // .5 tile of padding for now
            resolution: { width: config.grid.tileWidth * (config.grid.width + config.grid.padding), height: config.grid.tileHeight * (config.grid.height + config.grid.padding) }
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

            const recurse = (config: any, currentKey: string, maxDepth: number) => {
                for (let key in config) {
                    if (maxDepth <= 0) return;
                    const newKey = (currentKey === '' ? '' : currentKey + '_') + key;

                    if (config[key] instanceof Color) {
                        configPage.addInput(config, key, {
                            label: newKey
                        });
                        return;
                    }

                    if (typeof config[key] === 'object') {
                        recurse(config[key], newKey, maxDepth - 1);
                    } else {
                        configPage.addInput(config, key as any, {
                            disabled: true, // config not editable yet,
                            label: newKey
                        })
                    }
                }
            }

            recurse(config, '', 6);
        }
    }
}



export const game = new Game();

// debugging hotkeys
// Pressing 'p' on the keyboard will toggle pause/resume of the game
// Pressing ';' will toggle excalibur debug mode (this won't update unless game is running)
game.input.keyboard.on('release', (event) => {
    switch(event.key) {
        case Input.Keys.P : 
            if (game.isRunning()) {
                game.stop();
                Logger.getInstance().info('game paused');
            } else {
                game.start();
                Logger.getInstance().info('game resumed');
            }
            break;
        case Input.Keys.Semicolon :
            game.toggleDebug();
            break;
    }
});

game.init();