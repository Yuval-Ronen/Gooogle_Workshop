import React, {useEffect, useState} from 'react';
import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Border } from 'devextreme-react/chart';
import serverConnector from "../../server-connector";

import service from './month_data.js';
const dataSource = service.getMonthData();
console.log("data_source", dataSource)

const TrainingCart = (id) => {
    // const [dataSource, setDataSource] = useState([]);
    // useEffect( () =>{
    //     serverConnector.getTrainingAmountByMonth_trainer(id).then(res => {
    //         setDataSource(res);
    //         console.log(dataSource)
    //     })
    // },[])

    return (
      <Chart
        id="chart"
        title="אימונים לפי חודש"
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
    )

}
export default TrainingCart;
