import config from "./config";
import { Sandpile } from "./sand-pile";

export class PlayerState {
    static hoard: Sandpile;

    static moneyResource = config.player.startingMonies;

    static initialize(hoard: Sandpile) {
        this.hoard = hoard;
        this.updateHoard();
    }
    
    static SubtractMoney(amt: number): boolean {
        if(this.moneyResource < amt) return false;
        this.moneyResource -= amt;
        this.updateHoard();
        return true;
    }

    static AddMoney(amt: number): void {
        this.moneyResource += amt;
        this.updateHoard();
    }

    private static updateHoard() {
        if (!this.hoard) throw new Error('Money resource is not initialized');
        this.hoard.updateAmount(this.moneyResource);
    }
}