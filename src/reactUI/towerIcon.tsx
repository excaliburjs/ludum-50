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
        return (
            <div className={selectedClass}
                onClick={this.handleClick}>
                {this.props.towerName}
            </div>
        )    
    }
}