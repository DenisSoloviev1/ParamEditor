import React from "react";
import "./style.scss";
import ParamEditor from "../widjets/ParamEditor";
import { Param } from "../widjets/ParamEditor";

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

const App: React.FC = () => {
  return <ParamEditor params={params} model={model} />;
};

export default App;
