/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing, } from '@devexpress/dx-react-scheduler';
import {Scheduler, Resources, Toolbar, MonthView, WeekView, DayView, ViewSwitcher, Appointments,
  AppointmentTooltip, AppointmentForm, DragDropProvider, EditRecurrenceMenu, DateNavigator, TodayButton,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { appointments } from './Training'
import { triningType, Trainees, TrainingDetails } from './TrainingTypeAndTreinees'
import serverConnector from "../../../server-connector";
import {pink} from "@material-ui/core/colors";



const styles = theme => ({
  addButton: {
    position: '-webkit-sticky',
    // position: 'sticky',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});



const messages = {
  moreInformationLabel: '',
  detailsLabel: '',
};

const SelectEditor = (props) => {
  return <AppointmentForm.SelectEditor {...props} />;
};



const TextEditor = (props) => {
  if (props.type === "multilineTextEditor") {
    return null;
  }
  if (props.placeholder === "Title") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};


const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ moreInfo: nextValue });
  };
  const onValueChange = (nextValue) => {
    onFieldChange({ title: nextValue });
    onFieldChange({ triningType: nextValue });
  };
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}

      {...restProps}
    >
      <AppointmentForm.Label text="אימון" type="title" />
      <AppointmentForm.Select
        value={appointmentData.triningType}
        onValueChange={onValueChange}
        type="outlinedSelect"
        availableOptions={[
          {
            text: 'שחייה',
            id: 'שחייה',
          }, {
            text: 'ריצה',
            id: 'ריצה',
          }, {
            text: 'קארטה',
            id: 'קארטה',
          }, {
            text: 'ריקוד',
            id: 'ריקוד',
          }, {
            text: 'קרוספיט',
            id: 'קרוספיט',
          },
        ]}
      />
      <AppointmentForm.Label text="תיאור האימון" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.moreInfo}
        onValueChange={onCustomFieldChange}
        placeholder="תיאור האימון"
        type="multilineTextEditor"
      />

    </AppointmentForm.BasicLayout>
  );
};

class Trainer_Calendar extends React.PureComponent {
  today = new Date();
  componentDidMount(){
    serverConnector.getAllTrainees(205380130).then(res => {
      this.allTrainees = res;
      console.log("allTrainees",this.allTrainees)
     })
    for (const trainee in this.allTrainees){
      const newTrainee = {text: trainee.first_name + trainee.last_name,
      id: trainee.trainee_id, color: pink[300]};
      this.traineesToCal.concat(newTrainee);
    }
    console.log("traineesToCal",this.traineesToCal)

  }

  constructor(props) {
    super(props);
    this.state = {
      userInfo :205380130,
      allTrainees: [],
      traineesToCal: [],
      data: appointments,
      resources: [
        {
          fieldName: 'TrainingDetailsId',
          title: 'סוג אימון',
          instances: TrainingDetails,
        },
        {
          fieldName: 'Trainees',
          title: 'מתאמנים',
          instances: Trainees,

          // instances: this.traineesToCal,
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
    console.log("addedAppointment",addedAppointment);
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
          height="auto"
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
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={60}
          />
          <MonthView />
          <DayView
            cellDuration={60}
          />
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
            messages={messages}
          />
          <Resources
            data={resources}
            mainResourceName="TrainingDetailsId"
          />

          <DragDropProvider />
          <CurrentTimeIndicator
            shadePreviousAppointments="true"
            shadePreviousCells="true" />
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


      </Paper>

    );
  }
}


export default withStyles(styles)(Trainer_Calendar);