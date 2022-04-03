import * as React from "react";
import config from "../config";
import { Tower, TowerType } from "../tower";
import { Resources } from "../resources";
import { TowerIcon } from "./towerIcon";

type Props = {};
type State = {
  selectedTower: TowerType;
};

export class TowerPickerUI extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  readonly state: State = {
    selectedTower: TowerType.default,
  };

  public selectedTower = () => {
    return this.state.selectedTower;
  };

  setSelectedTower = (tower: TowerType) => {
    console.log(tower);
    Resources.UiPickTower.play();
    this.setState({
      selectedTower: tower,
    });
  };

  render() {
    return (
      <div id="towerSelection">
        {Object.keys(config.tower).map((key) => {
          return (
            <TowerIcon
              key={key}
              towerName={key.toString()}
              selectedTower={this.state.selectedTower.toString()}
              selectHandler={this.setSelectedTower}
            />
          );
        })}
      </div>
    );
  }
}
