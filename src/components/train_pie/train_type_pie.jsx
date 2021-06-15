import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import service from "./pie_data";
import Paper from '@material-ui/core/Paper';
import PieChart, {Series,  Label,  Connector,  SmallValuesGrouping,  Legend,} from "devextreme-react/pie-chart";


const TrainTypePie = (props) => {

  function formatLabel(arg) {
    return `${arg.argumentText}: ${arg.valueText}`;
  }
  return (
    <div style = {{marginBottom:"20px"}}>
    <p style = {{textAnchor: "middle", fontSize: "25px", color: "#55215e", textAlign: 'center', marginTop: '10px'}} >סוגי אימון</p>
    <Paper>
    <PieChart
      id="pie"
      dataSource= {props.dataSource}
      palette="Violet"
      //Palette Extension Mode
    >
      <Series argumentField="train_type" valueField="amount">
        <Label visible={true} customizeText={formatLabel} format="fixedPoint">
          <Connector visible={true} width={0.5} />
        </Label>
        <SmallValuesGrouping threshold={4.5}  />
      </Series>
      <Legend horizontalAlignment="center" verticalAlignment="bottom" columnCount={4} />
    </PieChart>
    </Paper>
    </div>
  );
}


export default TrainTypePie;