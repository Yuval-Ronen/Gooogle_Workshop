import React, {useEffect, useState} from 'react';

import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Border } from 'devextreme-react/chart';
import service from './month_data.js';
import serverConnector from "../../server-connector";
import {useLocalStorage} from "../../UtillHook";

// const dataSource = service.getMonthData();

const TrainingCart = () => {

  const [userInfo] = useLocalStorage("userInfo",{});
  const [dataSource2, setDataSource2] = useState([]);

  useEffect( () =>{
      serverConnector.getTrainingAmountByMonth_trainer(userInfo.ID).then(res => {
          setDataSource2(res);
      })
  },[])

    return (
      <div style = {{marginBottom:"20px"}}>
        <p style = {{textAnchor: "middle",fontSize: "25px", color: "#55215e", textAlign: 'center'}} >אימונים לפי חודש</p>

      <Chart
        id="chart"
        palette="Violet"
        dataSource={dataSource2}
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
