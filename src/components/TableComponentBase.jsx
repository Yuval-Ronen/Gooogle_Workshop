import React from "react";
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
    tableStriped: {
      '& tbody tr:nth-of-type(odd)': {
        backgroundColor: fade(theme.palette.primary.main, 0.15),
      },
    
    },

  });

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table
    {...restProps}
    className={classes.tableStriped} />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
