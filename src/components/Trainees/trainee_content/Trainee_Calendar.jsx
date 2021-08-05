import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, } from '@devexpress/dx-react-scheduler';
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
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { appointments } from '../../trainer/trainer_content/Training'
import { TrainingDetails, Trainees } from '../../trainer/trainer_content/TrainingTypeAndTreinees'
import serverConnector from "../../../server-connector";
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { create } from 'jss';



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
        direction: 'initial',
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
    }
  }
});

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});


const messages = {
  today: 'היום',
};

/* eslint-disable-next-line react/no-multi-comp */
class Trainee_Calendar extends React.PureComponent {
  today = new Date();

  constructor(props) {
    // console.log("in constructor", props.userInfo)
    // console.log("in constructor props appoin", props.appointments)
    // console.log("in constructor appointments", appointments)

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


  }

  componentDidMount() {
    // console.log("userInfo", this.props.userInfo)
    serverConnector.getAllTrainingHistory_trainee(this.props.userInfo.ID).then(res => {
      // this.setState({allTrainees :res});
      let helper = []
      let result = res[1]
      for (const index in res[1]) {
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
      // console.log("res in mount", helper)

    })

    // console.log("traineesToCal",this.traineesToCal)
  }
  render() {
    // console.log("in render", this.props.userInfo)
    // console.log("in render", this.props.appointments)

    const { data,
      resources,
      currentDate,
      startDayHour,
      endDayHour,
      // editingFormVisible,
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
                  defaultCurrentDate={currentDate}
                />


                <WeekView
                  startDayHour={startDayHour}
                  endDayHour={endDayHour}
                  cellDuration={60}
                  name='שבוע'
                />
                <MonthView
                  name='חודש' />
                <DayView 
                cellDuration={60}
                name='יום'/>
                <Appointments />
                <AppointmentTooltip
                  showCloseButton
                />
                <Toolbar />

                <ViewSwitcher />
                <DateNavigator />
                <TodayButton
                  messages={messages} />


                <Resources
                  data={resources}
                  mainResourceName="TrainingDetailsId"
                />
                <CurrentTimeIndicator
                  shadePreviousAppointments="true"
                  shadePreviousCells="true" />
              </Scheduler>


            </Paper>
          </ThemeProvider>
        </div>
      </StylesProvider>
    );
  }
}

export default withStyles(styles)(Trainee_Calendar);