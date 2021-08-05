import { useEffect, useState } from "react";
import ShowGoogleDocs from "../Trainees/trainee_content/ShowGoogleDocs";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledButton from "./Empowerment.jsx"
import serverConnector from "../../server-connector";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import { useLocalStorage } from "../../UtillHook";
import CreateIcon from '@material-ui/icons/Create';
import sheets from "../../icons/google-sheets.png"
import Link from '@material-ui/core/Link';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';




const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MuiTheme = createMuiTheme({
    direction: 'rtl',
});

const theme2 = createMuiTheme({
    overrides: {
        MuiLink: {
            underlineHover: {
                '&:hover': {
                    textDecoration: 'none',
                }
            },
        },
    },
});

const EmpowermentEdit = () => {
    const [userInfo] = useLocalStorage("userInfo", {});
    const [link, setLink] = useState("");
    const [value, setValue] = useState("");
    const [traineeId, setTraineeId] = useState(0)
    const [open, setOpen] = useState(false);

    let myLocation = useLocation()


    useEffect(() => {
        let params = new URLSearchParams(myLocation.search);
        let trainee_id = parseInt(params.get("trainee_id")); //
        setTraineeId(trainee_id)
        if (traineeId !== 0) {
            serverConnector.getPersonalProgramLink(traineeId).then(res => {
                // console.log("link in EmpowermentEdit", res)
                setLink(res);
                if (res.localeCompare("") === 0) {
                    setOpen(true)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [traineeId])
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        setOpen(false);
        if (link.localeCompare("") !== 0) {//in that case we want to update and not to upload new
            // console.log("value", value)
            serverConnector.updatePersonalProgramLink(traineeId, value.split("/")).then(res => {
                // console.log("res", res)
                setLink(value);
            })
        }
        else {
            serverConnector.insertNewPersonalProgramLink(traineeId, userInfo.ID, value.split("/")).then(res => {
                // console.log("res", res)
                setLink(value);
            })
        }
        setValue('');
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        setOpen(true);
    };

    const EditDialog = () => {
        return (

            <StylesProvider jss={jss}>
                <div dir='rtl'>
                    <ThemeProvider theme={MuiTheme}>
                        <DialogContent>
                            <TextField
                                value={value}
                                onChange={handleChange}
                                autoFocus
                                margin="normal"
                                label="הכניסו קישור של Google sheets"
                                fullWidth
                                multiline
                                variant="outlined"
                                rtlEnabled
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <img src={sheets} alt="" style={{ width: "30px", height: "30px" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" startIcon={<CancelIcon />}>
                                בטל
                            </Button>
                            <Button onClick={handleSubmit} color="primary" startIcon={<SendIcon />}>
                                שלח
                            </Button>
                        </DialogActions>
                    </ThemeProvider>
                </div>
            </StylesProvider>
        )
    }

    if (link.localeCompare("") !== 0) {
        return (
            <StylesProvider jss={jss}>
                <div dir='rtl' style={{textAlign:'right'}}>
                    <ThemeProvider theme={MuiTheme}>
                        <StyledButton style={{ margin: "2px 2px 4px" , width:"270px", display: "inline"}}
                            onClick={handleClick}>
                            <CreateIcon /> עריכת הקישור</StyledButton>
                    <ThemeProvider theme={theme2}>
                            <Link href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
                                <StyledButton style={{ margin: "2px 2px 4px" , width:"270px", display: "inline"}}>
                                    <ArrowBackIcon /> חזרה לעמוד מתאמן</StyledButton>
                            </Link>
                    </ThemeProvider>
                    <ShowGoogleDocs source={link} source_for_mobile={link}/>
                    <div dir="rtl">
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                            <DialogTitle style={{ textAlign: 'initial' }}>אנא הכנס קישור חדש למערך ההעצמה</DialogTitle>
                            <EditDialog />
                        </Dialog>
                    </div>

                    </ThemeProvider>
                </div>
            </StylesProvider >
        )
    }
    else {
    return (
        <StylesProvider jss={jss}>
            <div dir='rtl'>
                <ThemeProvider theme={MuiTheme}>
                        <div dir="rtl">
                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                                <DialogTitle style={{ textAlign: 'initial' }}>אנא הכנס קישור למערך ההעצמה</DialogTitle>
                                <EditDialog />
                            </Dialog>
                        </div>
                        <Link href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
                            <StyledButton style={{ margin: "2px 2px 4px" , width:"270px"}} >
                                <ArrowBackIcon /> חזרה לעמוד מתאמן</StyledButton>
                        </Link>
                </ThemeProvider>
            </div>
        </StylesProvider>
    )
}


}
export default EmpowermentEdit;


