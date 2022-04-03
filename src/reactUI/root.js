import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import {TowerPickerUI} from './towerPickerUI'

const container = document.getElementById('reactUI');
const root = ReactDOMClient.createRoot(container);
root.render(
    <TowerPickerUI ref={(TowerPickerUI) => {window.TowerPickerUI = TowerPickerUI}}/>,
);