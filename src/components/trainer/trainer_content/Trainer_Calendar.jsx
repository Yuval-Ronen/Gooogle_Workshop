/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Toolbar,
  MonthView,
  WeekView,
  DayView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import { appointments } from './Training'
import {triningType, Trainees} from './TrainingTypeAndTreinees'


const styles = theme => ({
  addButton: {
    position: '-webkit-sticky',
    position: 'sticky',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});


const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};


const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };
  const onValueChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };
return (
  <AppointmentForm.BasicLayout
    appointmentData={appointmentData}
    onFieldChange={onFieldChange}
    {...restProps}
  >
    <AppointmentForm.Label
      text="Custom Field"
      type="title"
    />
    <AppointmentForm.TextEditor
      value={appointmentData.customField}
      onValueChange={onCustomFieldChange}
      placeholder="Custom field"
    />
    <AppointmentForm.SelectProps
    value={appointmentData.customField}
    onValueChange={onCustomFieldChange}
    availableOptions={[{id:0, text: "שחיה"}, {id:1, text: "ריצה"}]}
    type="outlinedSelect"
    />
  </AppointmentForm.BasicLayout>
);
};

class Trainer_Calendar extends React.PureComponent {

  today = new Date();

  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        {
          fieldName: 'triningTypeId',
          title: 'Training type',
          instances: triningType,
        },
        {
          fieldName: 'Trainees',
          title: 'Trainees',
          instances: Trainees,
          allowMultiple: true,
        },
      ],
      currentDate: this.today,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 5,
      endDayHour: 22,
      isNewAppointment: false,
      locale: 'he-IS',
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);

  }


  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }
  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }
  
  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data };
    });
  }

  

  render() {
    const { data,
       resources,
        currentDate,
         addedAppointment,
          appointmentChanges, 
          editingAppointment,
          startDayHour,
          endDayHour,
          confirmationVisible,
          editingFormVisible,
          locale,
         } = this.state;
         const { classes } = this.props;
    return (
      
      <Paper>
        <Scheduler
          data={data}
          height={500}
          locale={locale}
          timeZone={'Asia/Jerusalem'}
        >
          <ViewState
            CurrentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}

            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.onAddedAppointmentChange}

            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}

            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <EditRecurrenceMenu />
          <IntegratedEditing />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <MonthView />
          <DayView/>
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <Toolbar />
          
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <AppointmentForm
          visible={editingFormVisible}
          onVisibilityChange={this.toggleEditingFormVisibility}
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}

         />
          <Resources
            data={resources}
            mainResourceName="triningTypeId"
          />
          <DragDropProvider />
          <CurrentTimeIndicator
          shadePreviousAppointments="true"
          shadePreviousCells="true"/>
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            מחק אימון
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              האם למחוק את האימון?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              ביטול
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              מחק
            </Button>
          </DialogActions>
        </Dialog>

        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(17,0,0),
              endDate: new Date(currentDate).setHours(18,0,0),
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Paper>
      
    );
  }
}


export default withStyles(styles)(Trainer_Calendar);