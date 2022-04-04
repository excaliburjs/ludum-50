import { DisplayMode, Engine, Loader, Input, Logger, Color } from "excalibur";
import { loadPreferences } from "./preferences";
import { Level } from "./level";
import { Resources } from "./resources";
import { SoundManager } from "./sound-manager";
import { DevTool } from "@excaliburjs/dev-tools";
import config from "./config";
import * as dat from "dat.gui"

const getNumDigits = (val: any) => {
    return (`${val}`.match(/\d/g) || []).length //a regex to compute the number of digits in a number. Note that decimals will get counted as digits, which is why to establish our limit and step we rounded
  }
const buildGui = (gui: any, folder: any,  obj: any) => {
    for(const key in obj) {
        if (obj.hasOwnProperty(key)) {
            let val = obj[key];
            if (typeof val == 'number') { //if the value of the object key is a number, establish limits and step
                const numgiDigits = getNumDigits(val);
                let step, limit;
                if (val > -1 && val < 1) { //if it's a small decimal number, give it a GUI range of -1,1 with a step of 0.1...
                    step = 0.1;
                    limit = 1;
                } else { //otherwise, calculate the limits and step based on # of digits in the number
                    const numDigits = getNumDigits(Math.round(val)); //to establish a step and limit, we'll use a base number that is an integer
                    limit = Math.pow(10, numDigits); //make the limit one digit higher than the number of digits of the itself, i.e. '150' would have a range of -1000 to 1000...
                    step = 1; //...with a step one less than the number of digits, i.e. '10'
                }
                folder.add(obj, key, 0, limit).step(step); //add the value to your GUI folder
            } else if (typeof val === 'object') {
                let subfolder = folder.addFolder(key);
                buildGui(gui, subfolder, val); //if the key is an object itself, call this function again to loop through that subobject, assigning it to the same folder
            } else {
                folder.add(obj, key); //...this would include things like boolean values as checkboxes, and strings as text fields
            }
        }
    }
}

if(true){
    const gui = new dat.GUI({name: "Ludum 50"});
    let folder= gui.addFolder("Ludum 50");
    buildGui(gui, folder, config);
}



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
            this.screen.forceResize();
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

game.backgroundColor = Color.fromHex('#eec39a');

// debugging hotkeys
// Pressing 'p' on the keyboard will toggle pause/resume of the game
// Pressing ';' will toggle excalibur debug mode (this won't update unless game is running)
// game.input.keyboard.on('release', (event) => {
//     switch(event.key) {
//         case Input.Keys.P : 
//             if (game.isRunning()) {
//                 game.stop();
//                 Logger.getInstance().info('game paused');
//             } else {
//                 game.start();
//                 Logger.getInstance().info('game resumed');
//             }
//             break;
//         case Input.Keys.Semicolon :
//             game.toggleDebug();
//             break;
//         case Input.Keys.Equal :
//             game.setupDevTool();
//             break;
//     }
// });

game.init();