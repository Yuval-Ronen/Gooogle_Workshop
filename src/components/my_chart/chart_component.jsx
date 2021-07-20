import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Border, Tooltip, Font } from 'devextreme-react/chart';
import service from './month_data.js';
import serverConnector from "../../server-connector";
import { useLocalStorage } from "../../UtillHook";
import { EventTracker } from '@devexpress/dx-react-chart';

// const dataSource = service.getMonthData();



const TrainingCart = (props) => {

  function customizeTooltip(pointInfo) {
    return {
      text: `${pointInfo.valueText} :${pointInfo.argumentText}`,
    };
  }
  // const [userInfo] = useLocalStorage("userInfo",{});

  function customizePoint(pointInfo) {

    if (pointInfo.value >= 10) {
      return { color: '#55215e' };
    }
    if (5 <= pointInfo.value && pointInfo.value < 10) {
      return { color: '#d19ad8' };
    }
    if (pointInfo.value < 5) {
      return { color: '#ffcbff' };
    }
  }


  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={{ textAnchor: "middle", fontSize: "25px", color: "#55215e", textAlign: 'center', marginTop: '10px' }} >אימונים לפי חודש</p>
      <Paper>
        <Chart
          id="chart"
          palette="Violet"
          dataSource={props.dataSource}
          width={'100%'}

        // customizePoint={customizePoint}
        >

          <CommonSeriesSettings cornerRadius={2} />
          <Series
            valueField="training_amount"
            name="כמות אימונים בחודש"
            argumentField="month"
            type="bar"
          />
          <ValueAxis
            name="כמות אימונים בחודש"
            position="left"
            tickInterval={1}
          />
          <Tooltip enabled={true}
            customizeTooltip={customizeTooltip}
            cornerRadius={2}
            color={'#55215e'}
            location={'edge'}
            paddingTopBottom={5}
            paddingLeftRight={8}
            arrowLength={8}

          >
            <Border visible={false} />
            <Font color={'white'} weight={400} />
          </Tooltip>
          <ValueAxis>
            <Title text="כמות אימונים שבוצעו" />
          </ValueAxis>
          <Legend position="inside"
            horizontalAlignment="right">
            <Border visible={true} />
          </Legend>
        </Chart>
      </Paper>
    </div>
  )

}

export default TrainingCart;
