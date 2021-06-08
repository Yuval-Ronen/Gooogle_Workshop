import React from 'react';

import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip, Border } from 'devextreme-react/chart';
import service from './month_data.js';
import char from './chart_style.css'
import PieChart from "devextreme-react/pie-chart";
const dataSource = service.getMonthData();

const TrainingCart = (id) => {
    // const [dataSource, setDataSource] = useState([]);
    // useEffect( () =>{
    //     serverConnector.getTrainingAmountByMonth_trainer(id).then(res => {
    //         setDataSource(res);
    //         console.log(dataSource)
    //     })
    // },[])

    return (
      <div style = {{marginBottom:"20px"}}>
        <p style = {{textAnchor: "middle",fontSize: "25px", color: "#55215e", textAlign: 'center'}} >אימונים לפי חודש</p>

      <Chart
        id="chart"
        palette="Violet"
        paletteExtensionMode= 'Blend'
        dataSource={dataSource}
      >
        <CommonSeriesSettings argumentField="month" type="stackedBar" />
        <Series
          valueField="training_amount"
          name="כמות אימונים בחודש"
          stack="training_amount"
        />
        <ValueAxis>
          <Title text="כמות אימונים שבוצעו" />
        </ValueAxis>
        <Legend position="inside"
          columnCount={2}
          horizontalAlignment="right">
          <Border visible={true} />
        </Legend>
      </Chart>
      </div>
    )

}

export default TrainingCart;
