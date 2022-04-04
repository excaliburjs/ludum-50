import config from '../config';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import { TowerType } from 'tower';
import './towerControl.scss'
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
                    <strong className="towerName">{config.tower[towerType].displayName}</strong>
                </div>
                <div className='towerInfo'>
                    <div className="cost costs-sand">
                        <img className='towerInfoIcon' src={Resources.CompactedSand.path.toString()}></img>
                        <div className="costText">{config.tower[towerType].cost}</div>
                    </div>
                    { hasDamage ?
                        (<div className="cost has-damage">
                            <img className='towerInfoIcon' src={Resources.Beachball.path.toString()}></img>
                            <div className="costText">{config.tower[towerType].bulletDamage}</div>
                        </div>)
                    : makesMoney ? 
                        (<div className='cost makes-money'>
                            <img className='towerInfoIcon' src={Resources.CompactedSand.path.toString()}></img>
                            <div className="costText">+{config.tower[towerType].resourceSpawnValue}/{config.tower[towerType].resourceSpawnTimer}s</div>
                        </div>) 
                    : (<></>) }
                    <div className='cost armor'>
                        <img className='towerInfoIcon' src={Resources.Shield.path.toString()}></img>
                        <div className="costText">{config.tower[towerType].maxHealth}</div>
                    </div>
                    <div className='towerHoverText'>{config.tower[towerType].hoverText}</div>
                </div>
            </div>
            </>
        )    
    }
}