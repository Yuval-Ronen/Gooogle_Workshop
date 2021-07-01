import React, { useState, useRef, useCallback } from "react";
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  Toolbar,
  ExportPanel,
  TableSummaryRow,
  TableSelection,
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
  DataTypeProvider,
  SummaryState,
  IntegratedSummary,
  CustomSummary,
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

  //let training_his = {ShowExerciseHistory}
  let allTrainings = training_his.training_his[1]
  let trainerOrTrainee = training_his.training_his[0]
  let isDashboard = training_his.isDashboard

  function trainings() {
    var rows = []
    {
      if (isDashboard) {
        var numOfTrainings = 3
      }
      else {
        var numOfTrainings = allTrainings.length
      }
      allTrainings?.length > 0 && allTrainings.slice(0, numOfTrainings).map((exercise, index) =>
        rows.push({
          id: index,
          description: (exercise.description?exercise.description: ""),
          train_type: exercise.train_type,
          trainerOrTrainee: exercise.all_trainees,
          train_time_start: exercise.train_time_start,
          train_date_start: exercise.train_date_start,

          //  train_type_icons: train_type_icons[exercise.type]
        })
      )

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
    { name: 'train_time_start', title: 'שעה' },
    { name: 'train_date_start', title: 'תאריך' },
    //{ name: 'id', title: 'מספר אימון' },
    // { name: 'train_type_icons', title: '*' },
  ];

  const rows = trainings()

  const [tableColumnExtensions] = useState([
    { columnName: 'description', align: 'right', wordWrapEnabled: 'true' },
    { columnName: 'train_type', align: 'center' },
    { columnName: 'trainerOrTrainee', align: 'center' },
    { columnName: 'train_time_start', align: 'center' },
    { columnName: 'train_date_start', align: 'center' },
  ]);

  const [sorting, setSorting] = useState([
    // { columnName: 'train_type', direction: 'asc' },
    //{ columnName: 'train_date', direction: 'asc' }
  ]);

  const [selection, setSelection] = useState([]);

  const getTotalSummaryValues = () => {
    const selectionSet = new Set(selection);
    const selectedRows = rows.filter((row, rowIndex) => selectionSet.has(rowIndex));
    return totalSummaryItems.map((summary) => {
      const { columnName, type } = summary;
      return IntegratedSummary.defaultCalculator(type, selectedRows, row => row[columnName]);
    });
  };

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

  const [totalSummaryItems] = useState([
    { columnName: 'train_date', type: 'count' },

  ]);

  if (isDashboard == false) {
    return (
      <Paper style={{ marginBottom: "3%" }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SummaryState
            totalItems={totalSummaryItems}
          />

          <FilteringState />

          <SortingState
          //sorting={sorting}
          //onSortingChange={setSorting}
          />

          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />

          <PagingState
          //  defaultCurrentPage={0}
          //  pageSize={10}
          />

          <IntegratedSummary />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          <IntegratedSorting />
          <IntegratedSelection />
          <IntegratedPaging />

          <CustomSummary
            totalValues={getTotalSummaryValues()}
          />

          <DataTypeProvider
            for={dateColumns}
            availableFilterOperations={dateFilterOperations}
          />

          <Table
            columnExtensions={tableColumnExtensions}
            tableComponent={TableComponent}
          />
          <TableSelection
            showSelectAll
          />
          <TableHeaderRow showSortingControls />
          <TableFilterRow
            showFilterSelector
            iconComponent={FilterIcon}
            messages={{ month: 'Month equals' }}
          />
          <PagingPanel />
          <TableSummaryRow />
          

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
      <Paper style={{ marginBottom: "3%" }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table
            //  columnExtensions={tableColumnExtensions}
            tableComponent={TableComponent}
          />
          <TableHeaderRow />

        </Grid>
      </Paper>
    );
  }

};
export default ShowExerciseHistory;

