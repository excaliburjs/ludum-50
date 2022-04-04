import config from "./config";
import {game} from "./main";
import { vec } from "excalibur";

export class PlayerState {
    static moneyResource = config.player.startingMonies;
    
    static SubtractMoney(amt: number): boolean {
        if(this.moneyResource < amt) return false;
        this.moneyResource -= amt;
        this.updateDisplay();
        return true;
    }

    private static updateDisplay(){
        const moneyContainer = document.getElementById("moneyContainer")!;
        moneyContainer.style.visibility = 'visible';
        const moneyText = document.getElementById("moneyDisplay")!;
        moneyText.innerText = `${this.moneyResource.toString()}`;
        const pos = game.screen.worldToScreenCoordinates(vec(config.grid.tileWidth / 2, config.grid.tileHeight / 2));
        moneyContainer.style.left = pos.x.toString()+'px';
        moneyContainer.style.top = pos.y.toString()+'px';

    }

    static AddMoney(amt: number): void {
        this.moneyResource += amt;
        this.updateDisplay();
    }
}