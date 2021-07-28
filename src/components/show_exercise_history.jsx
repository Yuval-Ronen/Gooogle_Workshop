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
import { TableHeaderContent } from "./TableHeaderContentBase";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        fontFamily: "Rubik",

      },
      footer: {
        color: 'rgba(255, 199, 23, 0.15)',
      }
    },
    TableHeaderCell: {
      cell: {
        color: '#ffc717',
        fontSize: 16,
        fontFamily: "Rubik",
        fontWeight: "600",
      },
    },
    MuiIconButton: {
      colorSecondary: {
        color: '#ffc717',
      }
    },
    MuiCheckbox: {
      root: {
        color: '#55215e',
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: '#ffc717',
          '&:hover': {
            backgroundColor: 'rgba(255, 199, 23, 0.15)',
          }
        },
      },
      colorPrimary: {
        '&.Mui-checked': {
          color: '#ffc717',
          '&:hover': {
            backgroundColor: 'rgba(255, 199, 23, 0.15)',
          }
        },
      },
    },
    Mui: {
      checked: {}
    },
   
  },
});



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
    var numOfTrainings;
    {
      if (isDashboard) {
        numOfTrainings = 3
      }
      else {
        numOfTrainings = allTrainings.length
      }
      allTrainings?.length > 0 && allTrainings.slice(0, numOfTrainings).map((exercise, index) =>
        rows.push({
          id: index,
          description: (exercise.description ? exercise.description : ""),
          train_type: exercise.train_type,
          trainerOrTrainee: exercise.all_trainees,
          train_time_start: exercise.train_time_start,
          train_date_start: exercise.train_date_start,
        })
      )

    }
    return rows
  }



  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'EitanData.xlsx');
    });
  };


  const columns = [
    { name: 'description', title: 'תיאור' },
    { name: 'train_type', title: 'סוג אימון' },
    { name: 'trainerOrTrainee', title: trainerOrTrainee },
    { name: 'train_time_start', title: 'שעה' },
    { name: 'train_date_start', title: 'תאריך' },
  ];

  const rows = trainings()

  const [tableColumnExtensions] = useState([
    { columnName: 'description', align: 'right', wordWrapEnabled: true },
    { columnName: 'train_type', align: 'right' },
    { columnName: 'trainerOrTrainee', align: 'right', wordWrapEnabled: true },
    { columnName: 'train_time_start', align: 'right' },
    { columnName: 'train_date_start', align: 'right' },
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

  const [dateColumns] = useState(['train_date_start']);
  const [dateFilterOperations] = useState(['month', 'contains']);
  const [filteringColumnExtensions] = useState([
    {
      columnName: 'train_date_start',
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

  const [timeColumns] = useState(['train_time_start']);
  const [descriptionColumns] = useState(['description']);
  const [typeColumns] = useState(['train_type']);
  const [trainerOrTraineeColumns] = useState(['trainerOrTrainee']);
  const [filterOperations] = useState([]);

  const exporterRef = useRef(null);

  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  const [totalSummaryItems] = useState([
    { columnName: 'train_date_start', type: 'count' },

  ]);

  const messages = {
    count: 'סה"כ אימונים',
  };

  if (isDashboard === false) {
    return (
      <ThemeProvider theme={theme}>
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
              pageSize={20}
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

            <DataTypeProvider
              for={timeColumns}
              availableFilterOperations={filterOperations}
            />

            <DataTypeProvider
              for={descriptionColumns}
              availableFilterOperations={filterOperations}
            />

            <DataTypeProvider
              for={typeColumns}
              availableFilterOperations={filterOperations}
            />

            <DataTypeProvider
              for={trainerOrTraineeColumns}
              availableFilterOperations={filterOperations}
            />

            <Table
              columnExtensions={tableColumnExtensions}
              tableComponent={TableComponent}

            />
            <TableSelection
              showSelectAll
            />

            <TableHeaderRow
              showSortingControls
              contentComponent={TableHeaderContent}
            />

            <TableFilterRow
              showFilterSelector
              iconComponent={FilterIcon}
              messages={{ month: 'Month equals' }}
            />
            <PagingPanel />
            <TableSummaryRow
              messages={messages} />


            <Toolbar />
            <ExportPanel startExport={startExport} />
          </Grid>
          <GridExporter
            ref={exporterRef}
            rows={rows}
            columns={columns}
            selection={selection}
            onSave={onSave}
          />
        </Paper>
      </ThemeProvider>
    )

  }
  else {
    return (
      <ThemeProvider theme={theme}>
        <Paper style={{ marginBottom: "3%" }}>
          <Grid
            rows={rows}
            columns={columns}
          >
            <Table
              columnExtensions={tableColumnExtensions}
              tableComponent={TableComponent}
            />
            <TableHeaderRow
              contentComponent={TableHeaderContent}
            />

          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }

};
export default ShowExerciseHistory;

