import React from 'react';

import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip, Border } from 'devextreme-react/chart';
import service from './month_data.js';
import char from './chart_style.css'
const dataSource = service.getMonthData();

class TrainingCart extends React.Component {
  render() {
    return (
      <Chart
        id="chart"
        title="כמות אימונים שבוצעו לפי חודשים"
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
        {/*<Export enabled={true} />*/}
        {/*<Tooltip enabled={true} />*/}
      </Chart>
    );
  }
}

export default TrainingCart;
