import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Border } from 'devextreme-react/chart';
import service from './month_data.js';
import serverConnector from "../../server-connector";
import {useLocalStorage} from "../../UtillHook";

// const dataSource = service.getMonthData();

const TrainingCart = (props) => {

  // const [userInfo] = useLocalStorage("userInfo",{});


  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={{ textAnchor: "middle", fontSize: "25px", color: "#55215e", textAlign: 'center', marginTop: '10px' }} >אימונים לפי חודש</p>
      <Paper>
        <Chart
          id="chart"
          palette="Violet"
          dataSource={props.dataSource}
          width={'100%'}
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
      </Paper>
    </div>
  )

}

export default TrainingCart;
