import config from "./config";
import {game} from "./main";
import { Actor, CollisionGroup, CollisionType, Color, Engine, Tile, vec, Vector } from "excalibur";

export class PlayerState {
    static moneyResource = config.player.startingMonies;
    
    static SubtractMoney(amt: number): boolean {
        if(this.moneyResource < amt) return false;
        this.moneyResource -= amt;
        this.updateDisplay();
        return true;
    }

    private static updateDisplay(){
        const display = document.getElementById("moneyDisplay")!;
        display.innerText = `Compacted Sand: ${this.moneyResource.toString()}`;
        const pos = game.screen.worldToScreenCoordinates(vec(0,0));
        display.style.left = pos.x.toString();
        display.style.top = pos.y.toString();

    }

    static AddMoney(amt: number): void {
        this.moneyResource += amt;
        this.updateDisplay();
    }
}