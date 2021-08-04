/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, Resources, Toolbar, MonthView, WeekView, DayView, ViewSwitcher, Appointments,
  AppointmentTooltip, AppointmentForm, DragDropProvider, DateNavigator, EditRecurrenceMenu, TodayButton,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TrainingDetails } from './TrainingTypeAndTreinees'
import serverConnector from "../../../server-connector";
import { pink } from "@material-ui/core/colors";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MuiTheme = createMuiTheme({
  direction: 'rtl',
  overrides: {
    MuiSelect: {
      select: {
        display: 'flex',
        fontFamily:'Segoe UI',
      },
    },
    MuiGrid: {
      "grid-xs-10":
      {
        display: 'flex',
        textAlign: 'justify',
        fontFamily:'Segoe UI',
      },
    },
    Header: {
      head: {
        direction: 'ltr',
      }
    },
    MuiToolbar: {
      regular: {
        direction: 'initial'
      }
    },
    MuiButton:{
      root: {
        fontFamily:'Segoe UI',
      }
    },
    MuiMenuItem: {
      root: {
        fontFamily:'Segoe UI',
      }
    },
    VerticalAppointment: {
      content: {
        fontFamily:'Rubik',
        textAlign: 'justify',
      }
    },
    MuiTypography: {
      body1: {
        fontFamily:'Rubik',
        textAlign: 'justify',
      },
      h6: {
        fontFamily:'Rubik',
      }
    },
    MuiDialogTitle: {
      root: {        
        textAlign: 'justify',
      },
      
    }
  }
});




const styles = theme => ({
  addButton: {
    position: '-webkit-sticky',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});



const messages = {
  moreInformationLabel: '',
  detailsLabel: '',
  commitCommand: 'שמור',
  repeatLabel: 'אירוע חוזר',
  never: 'אף פעם',
  daily: 'יומי',
  weekly: 'שבועי',
  monthly: 'חודשי',
  yearly: 'שנתי',
  repeatEveryLabel: 'חזור כל',
  daysLabel: 'ימים',
  endRepeatLabel: 'סיום החזרה',
  onLabel: 'אחרי',
  afterLabel: 'ב',
  occurrencesLabel: 'חזרות',
  weeksOnLabel: 'שבועות ב',
  monthsLabel: 'חודשים',
  ofEveryMonthLabel: 'בכל חודש',
  theLabel: 'ה',
  firstLabel: 'ראשון',
  secondLabel: 'שני',
  thirdLabel: 'שלישי',
  fourthLabel: 'רביעי',
  lastLabel: 'אחרון',
  yearsLabel: 'שנים',
  ofLabel: 'ב',
  everyLabel: 'בכל',
  today: 'היום',
  current: 'האירוע הזה',
  currentAndFollowing: 'האירוע הזה והאירועים הבאים',
  all:'כל האירועים',
  menuDeletingTitle: 'מחיקת אירוע חוזר',
  cancelButton:'ביטול',
  commitButton:'אישור',
  menuEditingTitle: 'עריכת האירוע החוזר'
};

const BooleanEditor = (props) => {
  if (props.label === "All Day") {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
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

class Trainer_Calendar extends React.PureComponent {
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


  }

  //get all the trainees of the trainer and get all the history for the calendar
  componentDidMount() {
    console.log("in componentDidMount")
    let my_helper = [];
    serverConnector.getAllTrainerCalendar(this.props.userInfo.ID).then(res => {
      let allTrainees = res.allTrainees
      for (const index in res.allTrainees) {
        my_helper = my_helper.concat({
          text: allTrainees[index].first_name + ' ' + allTrainees[index].last_name,
          id: allTrainees[index].trainee_id, color: pink[300]
        });
      }
      //the temp is helper to change only the instances of the second field in resources
      let temp = this.state.resources[1]
      temp.instances = my_helper;
      this.setState({ resources: [this.state.resources[0], temp] });
      // console.log("allTrainees in mount",temp)

      //this is manipulation on the data after it returns from the server so it will be in the same format as the server
      let helper = []
      let result = res.allExercise[1]
      for (const index in res.allExercise[1]) {
        var s_date = result[index].train_date_start.split("-");
        var s_time = result[index].train_time_start.split(":");
        var e_date = result[index].train_date_end.split("-");
        var e_time = result[index].train_time_end.split(":");
        helper = helper.concat({
          title: result[index].train_type, triningType: result[index].train_type,
          startDate: new Date(s_date[0], s_date[1] - 1, s_date[2], s_time[0], s_time[1]),
          endDate: new Date(e_date[0], e_date[1] - 1, e_date[2], e_time[0], e_time[1]),
          id: result[index].train_id,
          TrainingDetailsId: result[index].training_details_id,
          Trainees: result[index].all_trainees.split(", ").map(x => +x),//this parse the str to string
          moreInfo: result[index].description, rRule: result[index].rRule, exDate: result[index].exDate
        });
      }
      this.setState({ data: helper });
      // console.log("res in mount",helper)
    })
  }


  onAddedAppointmentChange(addedAppointment) {
    console.log("addedAppointment", addedAppointment);
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
    console.log("setDeletedAppointmentId", id)

    this.setState({ deletedAppointmentId: id });
  }

  onEditingAppointmentChange(editingAppointment) {
    console.log("onEditingAppointmentChange", editingAppointment)
    this.setState({ editingAppointment });
  }

  changeAddedAppointment(addedAppointment) {
    console.log("changeAddedAppointment", addedAppointment)

    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    console.log("changeAppointmentChanges", appointmentChanges)
    if (Object.keys(appointmentChanges).length !== 0) {
      console.log("put in server", Object.keys(appointmentChanges).length)
    }

    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    console.log("editingAppointment", editingAppointment)
    console.log("state", this.state)

    this.setState({ editingAppointment });
  }

  toggleEditingFormVisibility() {
    console.log("toggleEditingFormVisibility",)
    const { editingFormVisible } = this.state;
    console.log("editingFormVisible",)
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    console.log("toggleConfirmationVisible",)

    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    console.log("commitDeletedAppointment",)
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);
      console.log("deletedAppointmentId", deletedAppointmentId);
      serverConnector.deleteExercise(deletedAppointmentId).then(res => { })

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }
  create_new_event(trainer_id, trainees, train_type, train_date_start, train_date_end, train_time_start,
    train_time_end, description, training_details_id, rRule, exDate) {
    return serverConnector.createNewTrain(trainer_id, trainees, train_type, train_date_start, train_date_end, train_time_start,
      train_time_end, description, training_details_id, rRule, exDate).then(train_id => { return train_id })
  }

  async commitChanges({ added, changed, deleted }) {
    console.log("commitChanges", "added-", added, "changed-", changed, "deleted-", deleted)
    // console.log(this.state)

    this.setState((state) => {
      let { data } = state;

      if (added) {
        console.log("added", added);

        this.create_new_event(this.props.userInfo.ID, added["Trainees"],
          added["triningType"] ? added["triningType"] : "ריצה", convert_date(added["startDate"]),
          convert_date(added["endDate"]), convert_time(added["startDate"]), convert_time(added["endDate"]),
          added["moreInfo"] ? added["moreInfo"] : null, added["TrainingDetailsId"] ? added["TrainingDetailsId"] : 1,
          added["rRule"] ? added["rRule"] : null, added["exDate"] ? added["exDate"] : null).then(id => {
            added["id"] = id;
            if (changed) {
              let changed_data = changed[Object.keys(changed)[0]];
              changed_data["train_id"] = parseInt(Object.keys(changed)[0]);
              if (changed_data["startDate"] !== undefined) {
                changed_data["train_time_start"] = convert_time(changed_data["startDate"]);
                changed_data["train_date_start"] = convert_date(changed_data["startDate"]);
              }
              if (changed_data["endDate"] !== undefined) {
                changed_data["train_time_end"] = convert_time(changed_data["endDate"]);
                changed_data["train_date_end"] = convert_date(changed_data["endDate"]);
              }
              delete changed_data["startDate"]
              delete changed_data["endDate"]

              console.log("changed_data", changed_data)
              serverConnector.updateExercise(changed_data).then(res => {
              });
            }
          });

        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        if (changed) {
          data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }

      }
      else if (changed) {
        console.log("in if changed")
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

        let changed_data = changed[Object.keys(changed)[0]];
        changed_data["train_id"] = parseInt(Object.keys(changed)[0]);
        if (changed_data["startDate"] !== undefined) {
          changed_data["train_time_start"] = convert_time(changed_data["startDate"]);
          changed_data["train_date_start"] = convert_date(changed_data["startDate"]);
        }
        if (changed_data["endDate"] !== undefined) {
          changed_data["train_time_end"] = convert_time(changed_data["endDate"]);
          changed_data["train_date_end"] = convert_date(changed_data["endDate"]);
        }
        delete changed_data["startDate"]
        delete changed_data["endDate"]

        console.log("changed_data", changed_data)
        serverConnector.updateExercise(changed_data).then(res => {
        });
      }

      else if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }

      console.log("data", data);
      console.log("state", this.state);

      return { data };
    });
  }


  //==render==============================================================================================================
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
    // const { classes } = this.props;
    return (
      <StylesProvider jss={jss}>
        <div dir='rtl'>
          <ThemeProvider theme={MuiTheme}>

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
                <EditRecurrenceMenu 
                messages={messages}/>
                <WeekView
                  startDayHour={startDayHour}
                  endDayHour={endDayHour}
                  cellDuration={60}
                  name='שבוע'
                />
                <MonthView
                  name='חודש'
                />
                <DayView
                  cellDuration={60}
                  name='יום'
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
                <TodayButton
                  messages={messages} />
                <AppointmentForm
                  visible={editingFormVisible}
                  onVisibilityChange={this.toggleEditingFormVisibility}
                  basicLayoutComponent={BasicLayout}
                  textEditorComponent={TextEditor}
                  messages={messages}
                  booleanEditorComponent={BooleanEditor}

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
                style={{ direction: 'rtl' }}
              >
                <DialogTitle style={{ textAlign: 'start' }}>
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

          </ThemeProvider>
        </div>
      </StylesProvider>
    );
  }
}


export default withStyles(styles)(Trainer_Calendar);