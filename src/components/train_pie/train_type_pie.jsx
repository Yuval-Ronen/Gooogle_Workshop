import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import service from "./pie_data";
import PieChart, {Series,  Label,  Connector,  SmallValuesGrouping,  Legend,} from "devextreme-react/pie-chart";
const dataSource = service.getPieData();

// import {dataSource} from "./pie_data.js";


const TrainTypePie = (props) => {
    function formatLabel(arg) {
  return `${arg.argumentText}: ${arg.valueText}`;
}
  return (
    <PieChart
      id="pie"
      dataSource={dataSource}
      palette="Violet"
      //Palette Extension Mode
      title="סוגי אימון"
    >
      <Series argumentField="train_type" valueField="amount">
        <Label visible={true} customizeText={formatLabel} format="fixedPoint">
          <Connector visible={true} width={0.5} />
        </Label>
        <SmallValuesGrouping threshold={4.5} mode="smallValueThreshold" />
      </Series>
      <Legend horizontalAlignment="center" verticalAlignment="bottom" columnCount={4} />
    </PieChart>
  );
}


export default TrainTypePie;