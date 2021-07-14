import React from "react";
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SportsRoundedIcon from '@material-ui/icons/SportsRounded';
import { withStyles } from '@material-ui/core/styles';


export const styles = theme => ({
    icon: {
      margin: theme.spacing(0, 1),
      color: '#55215e', 
    },
  });

const TableHeaderContentBase = ({
  column, children, classes, ...restProps
}) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}

  >
    
    {children}
    {column.name === 'description' ? (
      <DescriptionIcon className={classes.icon} />
      
    ) : null}
    {column.name === 'train_type' ? (
      <SportsRoundedIcon className={classes.icon} />
    ) : null}
    {column.name === 'trainerOrTrainee' ? (
      <AccountCircleIcon className={classes.icon} />
    ) : null}
    {column.name === 'train_time_start' ? (
      <ScheduleRoundedIcon className={classes.icon} />
    ) : null}
    {column.name === 'train_date_start' ? (
      <EventRoundedIcon className={classes.icon} />
    ) : null}
  </TableHeaderRow.Content>
);
export const TableHeaderContent = withStyles(styles, { name: 'TableHeaderContent' })(TableHeaderContentBase);
