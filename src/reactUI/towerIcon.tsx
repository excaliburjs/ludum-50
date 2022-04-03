import config from '../config';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import { TowerType } from 'tower';
import './towerControl.css'
import { Resources, FxTowerFlings } from "../resources";

type Props = {
    towerName: string,
    selectedTower: string,
    selectHandler: Function
};
type State = {
    selected: boolean
}

export class TowerIcon extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event: any) => {
        event.preventDefault();
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
                <div className='imageOuter'>
                    <img className='towerIcon' src={config.tower[towerType].sprite?.path?.toString()}></img>
                </div>
                <div className='towerInfo'>
                    <div className="cost">
                        <img src={Resources.CompactedSand.path.toString()}></img>
                        <div className="costText">{config.tower[towerType].cost}</div>
                    </div>
                    { hasDamage ?
                        (<div className="cost">
                            <img src={Resources.Beachball.path.toString()}></img>
                            <div className="costText">{config.tower[towerType].bulletDamage}</div>
                        </div>)
                    : makesMoney ? 
                        (<div className='cost'>
                            <img src={Resources.CompactedSand.path.toString()}></img>
                            <div className="costText">+{config.tower[towerType].resourceSpawnValue}/{config.tower[towerType].resourceSpawnTimer}s</div>
                        </div>) 
                    : (<></>) }
                    <div className='cost'>
                        <img src={Resources.Sandwall.path.toString()}></img>
                        <div className="costText">{config.tower[towerType].maxHealth}</div>
                    </div>
                    <div className='towerHoverText'>{config.tower[towerType].hoverText}</div>
                </div>
            </div>
            </>
        )    
    }
}