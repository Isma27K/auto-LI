import React, { useState } from "react";
import { Switch } from "antd";


import Daily from "./mode/daily/daily.component";
import Weekly from "./mode/weekly/weekly.component";


const Game = () => {
  const [checked, setChecked] = useState(true);

  function chackChacked() {
    setChecked(!checked);
    //console.log(!checked);
  }

  return (
    <>
      <Switch
        checkedChildren="Daily"
        unCheckedChildren="Weekly"
        checked={checked}
        onChange={chackChacked}
      />
      {checked ? <Daily /> : <Weekly />}
    </>
  );
};

export default Game;
