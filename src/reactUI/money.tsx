import React from "react";

import './money.scss';
import sand from '../images/sand.png';

export const MoneyContainer = () => (
  <div id="moneyContainer">
    <img id="moneyImage" src={sand} />
    <div id="moneyDisplay"></div>
  </div>
);
