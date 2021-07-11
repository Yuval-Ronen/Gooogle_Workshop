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
  function convert_date(str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}
  function convert_time(str) {
    let date = new Date(str),
        hour = ("0" + (date.getHours())).slice(-2),
        minutes = ("0" + date.getMinutes()).slice(-2),
        sec = ("0" + date.getSeconds()).slice(-2);
    return [hour, minutes, sec].join(":");
}

class Trainer_Calendar extends React.PureComponent{
  today = new Date();

  constructor(props) {
    console.log("in constructor")
    super(props);
    this.state = {
      data: [],
      resources: [
        {
          fieldName: 'TrainingDetailsId',
          title: 'סוג אימון',
          instances: TrainingDetails,
        },
        {
          fieldName: 'Trainees',
          title: 'מתאמנים',
          instances: [],
          //instances: this.props.allTrainees,
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
    // console.log("allTrainees as props",this.props.allTrainees);
    // console.log("userInfo as props",this.props.userInfo);
    // console.log("appointments as props",this.props.appointments);



  }

//get all the trainees of the trainer and get all the history for the calendar
  componentDidMount(){
    console.log("in componentDidMount")
    let my_helper = [];
    serverConnector.getAllTrainerCalendar(this.props.userInfo.ID).then(res => {
      let allTrainees = res.allTrainees
      for (const index in res.allTrainees){
        my_helper = my_helper.concat({text: allTrainees[index].first_name +' '+ allTrainees[index].last_name,
          id: allTrainees[index].trainee_id, color: pink[300]});
      }
      //the temp is helper to change only the instances of the second field in resources
      let temp = this.state.resources[1]
      temp.instances = my_helper;
      this.setState({resources : [this.state.resources[0], temp]});

      //this is manipulation on the data after it returns from the server so it will be in the same format as the server
       let helper = []
       let result = res.allExercise[1]
       for (const index in res.allExercise[1]){
           var s_date = result[index].train_date_start.split("-");
           var s_time = result[index].train_time_start.split(":");
           var e_date = result[index].train_date_end.split("-");
           var e_time = result[index].train_time_end.split(":");
           helper = helper.concat({title: result[index].train_type, triningType: result[index].train_type,
               startDate: new Date(s_date[0], s_date[1] -1, s_date[2], s_time[0], s_time[1]),
               endDate: new Date(e_date[0], e_date[1] -1, e_date[2], e_time[0], e_time[1]),
               id: result[index].train_id,
               TrainingDetailsId : result[index].training_details_id,
               Trainees: result[index].all_trainees.split(","),
               moreInfo: result[index].description
               });
       }
       this.setState({data: helper});
       console.log("res in mount",helper)
     })
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
    // serverConnector.getAllTrainees()
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
      console.log("added",added);
      // console.log("info", this.props.userInfo.ID, added["Trainees"],
      //   added["triningType"]?added["triningType"] : "ריצה" , convert_date(added["startDate"]),convert_time(added["startDate"]), added["moreInfo"]?added["moreInfo"] : "" , added["TrainingDetailsId"]);
      const train_id = serverConnector.createNewTrain(this.props.userInfo.ID, added["Trainees"],
        added["triningType"]?added["triningType"] : "ריצה" , convert_date(added["startDate"]),
          convert_date(added["endDate"]), convert_time(added["startDate"]),convert_time(added["endDate"]),
          added["moreInfo"]?added["moreInfo"] : null , added["TrainingDetailsId"]?added["TrainingDetailsId"]:1);
        added["id"] = train_id;
        console.log("added",added);

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

      console.log("data",data);

      return { data };
    });
  }



  render() {
    console.log("in render")

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