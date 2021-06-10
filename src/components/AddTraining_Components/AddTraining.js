import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const buttonStyle = {
  root: {
    background: 'white',
    borderRadius: 3,
    border: '1px solid blue' ,
    borderColor: '#b2102f',
    color: '#b2102f',
    height: 48,
    width: '90%',
    padding: '0 30px',
    margin:'10px',
    fontSize: 16,
    fontFamily: 'Segoe UI',    
  },
};

function AddTraining(props) {

  // For text direction
  const rtl = createMuiTheme({
    direction: 'rtl', 
  });

  // For dialog
  const [openDialog, setOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const { classes, children, AddButtonDialog} = props;

  // For add date&time
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // For training type
  const typeStyle = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const trainingType = typeStyle();
      
  const [state, setState] = React.useState({
    type: '',
  });
  
  const handleChangeType = (event) => {
    const name = event.target.name;
    setState({
      state,
      [name]: event.target.value,
    });
  };

  //For trainees choose
  const traineesStyle = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'רותם גביש',
    'גל גולדשטיין',
    'אורי מרום',
    'עומר צוויג',
    'דור שירן',
    'רותם מאירצוק',
    'הגר דהן',
  ];
  
  function traineesChooseStyles(Trainee, traineeName, theme) {
    return {
      fontWeight:
        traineeName.indexOf(Trainee) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  const traineeClass = traineesStyle();
  const theme = useTheme();
  const [traineeName, setTraineeName] = React.useState([]);

  const handleChange = (event) => {
    setTraineeName(event.target.value);
  };


  return (
    <div>

    {/* Add training button */}
    <Button className={clsx(classes.root, AddButtonDialog) } onClick={handleClickOpenDialog}>
      {children || 'הוספת אימון  '}  <BsFillPlusCircleFill /> 
    </Button>

    {/* Add training dialog and form content */}
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title">הוספת אימון</DialogTitle>
        
        <DialogContent>
            
            <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

            {/* Date section  */}
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              {/* Time section  */}
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={selectedDate}
                onChange={handleDateChange}
                ampm={false}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              </MuiPickersUtilsProvider>
              </div>
              <div>
              {/* Training type section */}
              <FormControl className={trainingType.formControl}>
              <InputLabel htmlFor="type-native-simple">סוג האימון</InputLabel>
              <Select
                native
                value={state.type}
                onChange={handleChangeType}
                inputProps={{
                  name: 'type',
                  id: 'type-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>אישי</option>
                <option value={20}>VIP</option>
                <option value={30}>מתנדב</option>
                <option value={40}>קבוצתי</option>
                <option value={50}>מוסד</option>
                <option value={60}>Online</option>
              </Select>
            </FormControl>

            {/* Trainees choose section */}
            <FormControl className={traineeClass.formControl}>
              <InputLabel id="demo-mutiple-chip-label">שמות המתאמנים</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={traineeName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={traineeClass.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={traineeClass.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((Trainee) => (
                  <MenuItem key={Trainee} value={Trainee} style={traineesChooseStyles(Trainee, traineeName, theme)}>
                    {Trainee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>

            <form>
              <ThemeProvider rtl={rtl}>
                <div dir="rtl">
                  <TextField
                    id="standard-textarea"
                    label="תוכנית האימון"
                    placeholder="תוכנית האימון"
                    multiline
                    fullWidth
                  />
                </div>
              </ThemeProvider>
            </form>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ביטול
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            אישור
          </Button>
        </DialogActions>

      </Dialog>
      </div>
  );
}

AddTraining.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  AddButtonDialog: PropTypes.string,
};

export default withStyles(buttonStyle)(AddTraining);
