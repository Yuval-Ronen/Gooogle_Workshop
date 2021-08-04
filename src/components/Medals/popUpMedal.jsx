import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import { useLocalStorage } from "../../UtillHook";
import serverConnector from "../../server-connector";
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#55215e',
    direction: 'rtl',

  },
  headerBody: {
    color: 'white',
    fontFamily: 'Rubik',
    textAlign: 'right',
    fontSize: '1.4rem',
    direction: 'ltr',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ffc717',
    color: "#f50057",
    textAlign: 'center',
    fontFamily: 'Segoe UI',
    paddingTop: '4px',
    paddingBottom: '4px'
  },
  
    '@global': {
      '.MuiToolbar-regular': {
        minHeight: '0px',
      },
    },
}));


const theme2 = createMuiTheme({
  overrides: {
    MuiBadge: {
      anchorOriginTopRightRectangle: {
        right: '6%',
        transform: 'scale(1.3) translate(20%, -50%)',
        fontFamily: "Rubik",
      },
    },
    MuiTypography: {
      h6: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '-webkit-fill-available',
      }
    },
    MuiButton:{
      root: {
        color: "#f50057",
        "&.Mui-disabled":{
          color: "rgba(245, 0, 87,0.3)",
        }
      }
    },
    Mui:{
      disabled: {
        color: "#ffc717",
      }
    }
  },
});

export default function PopUpMedal(props) {


  const [open, setOpen] = useState(false);
  // console.log("hideNewMassege", props.hideNewMassege);
  const [invisible, setVisible] = useState(props.hideNewMassege);
  // console.log("allMessages", props.allMessages);
  // console.log("invisible", invisible);


  useEffect(() => {
    (async function () {
      // console.log("async", "");
      if (props.allMessages.length > 1 && props.allMessages[0] === "new") {
        setVisible(false);
        // console.log("invisible", invisible);
      }
      else {
        setVisible(true);
        // console.log("invisible", invisible);
      }
    }
    )();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.hideNewMassege]);

  let numOfMedals = 0;
  if (props.allMessages.length > 0) {
    numOfMedals = props.allMessages[1].length;
  };
  // console.log("numOfMedals", numOfMedals);

  let newMessages = [];
  if (numOfMedals > 0) {
    newMessages = props.allMessages[1];
  }
  // console.log("newMessages", newMessages);


  const handleClickOpen = () => {
    setOpen(true);
    const anchor = document.querySelector('#back-to-top-anchor');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActiveStep(0);
  };

  const [userId] = useLocalStorage("userInfo", {});
  const traineeID = userId.ID;
  const [userName] = useLocalStorage("userInfo", {});
  const traineeName = userName.first_name;

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = numOfMedals;

  // function ScrollTop(props) {
  //   const { children, window } = props;
  //   const trigger = useScrollTrigger({
  //     target: window ? window() : undefined,
  //     disableHysteresis: true,
  //     threshold: 100,
  //   });
  // }

  const ScrollToTop = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // ScrollTop.propTypes = {
  //   children: PropTypes.element.isRequired,
  //   window: PropTypes.func,
  // };

  const handleNext = (event) => {
    changeMessageStatusLocaly(activeStep);
    ScrollToTop(event);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = (event) => {
    changeMessageStatusLocaly(activeStep);
    ScrollToTop(event);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    changeMessageStatusLocaly(activeStep);
    const anchor = document.querySelector('#back-to-top-anchor');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActiveStep(step);
  };

  const changeMessageStatusLocaly = (numMessage) => {
    if (numOfMedals > 0 && newMessages[numMessage].status === "new") {
      newMessages[numMessage].status = "oldLocal";
    }
    // console.log("Changed", numMessage);
  }

  const handleClose = () => {
    let newMark = "old";
    const messagesUpdate = [traineeID];
    changeMessageStatusLocaly(activeStep);
    setOpen(false);
    let newMassegeCount = 0;
    newMessages.forEach((message) => {
      // console.log("message",message)
      if (message.status === "oldLocal") {
        messagesUpdate.push(message);
         message.status = "old";
        // console.log("traineeID", traineeID,"trainer_id", message.trainer_id)
      }
      else if (message.status === "new"){
        newMassegeCount++;
      }
      if(message.status === "new"){
        newMark = "new"
      }
    });
    // console.log("newMassegeCount", newMassegeCount);
    if (newMassegeCount === 0) {
      setVisible(true);
    }
    props.allMessages[0] = newMark;
    if(messagesUpdate.length > 1){
      // console.log("messagesUpdate",messagesUpdate)
      serverConnector.changeMessageStatus(messagesUpdate).then(res =>{
      });
    }
  };

  const cheackIfNew = (step) => {
    if (newMessages[step].status === "new") {
      // console.log("is new", step);
      return false;
    }
    else {
      // console.log("is old", step);
      return true;
    }
  }

  if (numOfMedals > 0) {
    return (
      <ThemeProvider theme={theme2}>
        <Badge color="secondary" badgeContent="חדש" invisible={invisible}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          <Fab
            variant="extended"
            size="medium"
            aria-label="כוכב איתן"
            onClick={handleClickOpen}
            style={{ background: '#55215e', color: 'white', fontFamily: 'Segoe UI', direction:'rtl' }}>
          <StarsRoundedIcon fontSize='small' style={{ color: '#ffc717', paddingLeft: '2px' }}/>כוכב איתן
          </Fab>
        </Badge>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          scroll='paper'
        >

          <DialogTitle className={classes.header}>
            <Typography className={classes.headerBody} style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{traineeName}</Typography>
            <Typography className={classes.headerBody}>קיבלת כוכב איתן מ{newMessages[activeStep].trainer_name}!</Typography>
          </DialogTitle>
          
          <Badge color="secondary" badgeContent='חדש' invisible={cheackIfNew(activeStep)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            

            <DialogContent style={{ backgroundColor: 'rgba(85, 33, 94, 0.08)', overflow: 'auto', height: '50vh', paddingTop: '0px'}}>
            <Toolbar id="back-to-top-anchor"/>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >

                {numOfMedals > 0 && newMessages.map((step, index) => (

                  <div key={step.trainer_name}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <div>



                        <Typography  style={{ textAnchor: "middle", fontSize: "50px", color: "#ffc717", textAlign: 'center', fontFamily: 'Segoe UI' }}>
                          <GradeRoundedIcon fontSize="small" style={{ color: '#ffc717' }} />
                          <GradeRoundedIcon fontSize="medium" style={{ color: '#f50057' }} />
                          <GradeRoundedIcon fontSize="inherit" style={{ color: '#ffc717' }} />
                          <GradeRoundedIcon fontSize="medium" style={{ color: '#f50057' }} />
                          <GradeRoundedIcon fontSize="small" style={{ color: '#ffc717' }} />
                        </Typography>


                        <Typography
                          style={{
                            textAnchor: "middle",
                            fontSize: "20px",
                            color: "#55215e",
                            textAlign: 'center',
                            fontFamily: 'Segoe UI',
                            paddingRight: '8px',
                            paddingLeft: '10px',
                            paddingTop: '0',
                            paddingBottom: '10px',
                            direction: 'rtl'
                          }}>
                          {step.message}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                ))}
              </SwipeableViews>
            </DialogContent>



          </Badge>
          <DialogTitle className={classes.bottom}>
            <MobileStepper
              style={{
                color: "#f50057",
                textAlign: 'center',
                fontFamily: 'Segoe UI',
                backgroundColor: "#ffc717",
                fontSize: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                width: '-webkit-fill-available',
              }}
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}
                  style={{  fontFamily: 'Segoe UI' }}>
                  הבא
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}
                  style={{  fontFamily: 'Segoe UI' }}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  הקודם
                </Button>
              }
            />
          </DialogTitle>




        </Dialog>

      </ThemeProvider>

    )
  }

  else {
    return (
      <div >
        <Badge color="secondary" badgeContent=" " invisible={true}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          <Fab
            variant="extended"
            size="medium"
            aria-label="add"
            onClick={handleClickOpen}
            style={{ background: '#55215e', color: 'white', fontFamily: 'Segoe UI' }}>
            כוכב איתן
          </Fab>
        </Badge>
      </div>
    );
  }

};