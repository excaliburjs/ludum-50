import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { TowerPickerUI } from "./towerPickerUI";
import { MoneyContainer } from "./money";

import "./root.scss";

const container = document.getElementById("reactUI");
const root = ReactDOMClient.createRoot(container);
root.render(
  <>
    <MoneyContainer />
    <TowerPickerUI
      ref={(TowerPickerUI) => {
        window.TowerPickerUI = TowerPickerUI;
      }}
    />
  </>
);
