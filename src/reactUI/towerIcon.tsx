import config from '../config';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import { TowerType } from 'tower';
import './towerControl.css'

type Props = {
    towerName: string,
    selectedTower: string,
    selectHandler: any
};
type State = {
    selected: boolean
}

export class TowerIcon extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event: any) =>{
        event.preventDefault();
        console.log("Clicky clicky!");
        this.props.selectHandler(this.props.towerName);
    }

    render() {
        let selectedClass = "tower";
        if( this.props.towerName == this.props.selectedTower) {
            selectedClass += " selected";
        }
        let towerType = this.props.towerName as TowerType;
        const hasDamage = config.tower[towerType].bulletDamage > 0;
        const makesMoney = config.tower[towerType].resourceSpawnValue > 0;
        return (
            <>
            <div className={selectedClass}
                onClick={this.handleClick}>
                {this.props.towerName}
                <div className="cost">
                    Cost: {config.tower[towerType].cost}
                </div>
                { hasDamage ?
                        (<div className="cost">
                            Damage: {config.tower[towerType].bulletDamage}
                        </div>)
                    : (<div className='cost'>
                            Generates: {config.tower[towerType].resourceSpawnValue} per {config.tower[towerType].resourceSpawnTimer}s
                    </div>) }
                <div className='cost'>
                    Health: {config.tower[towerType].maxHealth}
                </div>
                <div className='towerHoverText'>{config.tower[towerType].hoverText}</div>
            </div>
            </>
        )    
    }
}0