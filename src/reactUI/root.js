import React from 'react'
import ReactDOM from 'react-dom';
import {TowerPickerUI} from './towerPickerUI'

ReactDOM.render(
    <TowerPickerUI ref={(TowerPickerUI) => {window.TowerPickerUI = TowerPickerUI}}/>,
    document.getElementById('reactUI')
);