import React, { useState, useRef, useCallback } from "react";
//import { Table } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider
} from '@devexpress/dx-react-grid';
import DateRange from '@material-ui/icons/DateRange';
import saveAs from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { TableComponent } from "./TableComponentBase";


const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};



//person can be trainer or trainee
const ShowExerciseHistory = (training_his) => {

  let train_type_icons = {
    martialArts: "mdi:karate",
    jog: "mdi:run",
    swim: "mdi:swim",
    crossfit: "mdi:weight-lifter",
    dance: "mdi:yoga"
  };

  //let training_his = {ShowExerciseHistory}
  let allTrainings = training_his.training_his[1]
  let trainerOrTrainee = training_his.training_his[0]
  let isDashbord = training_his.isDashbord
  console.log("allTrainings", allTrainings)
  console.log("trainerOrTrainee", trainerOrTrainee)
  console.log("isDashbord", isDashbord)

  function trainings() {
    var rows = []
    {
      if (isDashbord) {
        var numOfTrainings = 3
      }
      else {
        var numOfTrainings = allTrainings.length
      }
      if (trainerOrTrainee == "מאמן"){
        allTrainings?.length > 0 && allTrainings.slice(0, numOfTrainings).map((exercise, index) =>
        rows.push({
          id: index,
          description: exercise.description,
          train_type: exercise.type,  
          trainerOrTrainee: exercise.trainer_or_group_members,
          train_time: exercise.trainTime,
          train_date: exercise.trainDate,

          //  train_type_icons: train_type_icons[exercise.type]
        })
      )
      }
      else{
        allTrainings?.length > 0 && allTrainings.slice(0, numOfTrainings).map((exercise, index) =>
        rows.push({
          id: index,
          description: exercise.description,
          train_type: exercise.train_type,  
          trainerOrTrainee: exercise.all_trainees,
          train_time: exercise.train_time,
          train_date: exercise.train_date,

          //  train_type_icons: train_type_icons[exercise.type]
        })
      )
      }
    }
    return rows
  }
  


  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'EitanData_.xlsx');
    });
  };


  const columns = [
    { name: 'description', title: 'תיאור' },
    { name: 'train_type', title: 'סוג אימון' },
    { name: 'trainerOrTrainee', title: trainerOrTrainee },
    { name: 'train_time', title: 'שעה' },
    { name: 'train_date', title: 'תאריך' },
    // { name: 'train_type_icons', title: '*' },
  ];

  const rows = trainings()
  console.log("rows", rows)
  // const [tableColumnExtensions] = useState([
  //   { name: 'description', align: 'right', wordWrapEnabled: 'true',},
  //   { name: 'train_type', align: 'right',  },
  //   { name: trainer, align: 'left', },
  //   { name: 'train_time', align: 'right',  },
  //   { name: 'train_date', align: 'right', },
  // ]);

  const [sorting, setSorting] = useState([
    // { columnName: 'train_type', direction: 'asc' },
     //{ columnName: 'train_date', direction: 'asc' }
   ]);

  const [dateColumns] = useState(['train_date']);
  const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
  const [filteringColumnExtensions] = useState([
    {
      columnName: 'train_date',
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        if (filter && filter.operation === 'month') {
          const month = parseInt(value.split('-')[1], 10);
          return month === parseInt(filter.value, 10);
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);

  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  if (isDashbord == false) {
    return (
      <Paper style = {{marginBottom: "3%"}}>
        <Grid
          rows={rows}
          columns={columns}
        >

          <DataTypeProvider
            for={dateColumns}
            availableFilterOperations={dateFilterOperations}
          />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
           <SortingState
        //sorting={sorting}
        //onSortingChange={setSorting}
      /> 
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <IntegratedPaging />
           <IntegratedSorting /> 
          <PagingPanel />
          <Table
            //  columnExtensions={tableColumnExtensions}
            tableComponent={TableComponent}
          />
          <TableHeaderRow showSortingControls />
          <TableFilterRow
            showFilterSelector
            iconComponent={FilterIcon}
            messages={{ month: 'Month equals' }}
          />
          <Toolbar />
          <ExportPanel startExport={startExport} />
        </Grid>
        <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          onSave={onSave}
        />
      </Paper>
    )

  }
  else {
    return (
      <Paper style = {{marginBottom: "3%"}}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table
            //  columnExtensions={tableColumnExtensions}
            tableComponent={TableComponent}
          />
          <TableHeaderRow/>

        </Grid>
      </Paper>
    );
  }

};
export default ShowExerciseHistory;

