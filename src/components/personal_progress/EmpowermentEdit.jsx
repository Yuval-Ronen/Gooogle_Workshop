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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Container from "react-bootstrap/Container";


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
                console.log("link in EmpowermentEdit", res)
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
            console.log("value", value)
            serverConnector.updatePersonalProgramLink(traineeId, value.split("/")).then(res => {
                console.log("res", res)
                setLink(value);
            })
        }
        else {
            serverConnector.insertNewPersonalProgramLink(traineeId, userInfo.ID, value.split("/")).then(res => {
                console.log("res", res)
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
            <div>
                <DialogContent>
                    <TextField
                        value={value}
                        onChange={handleChange}
                        autoFocus
                        margin="normal"
                        label="Google sheets הכניסו קישור של "
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
                    <Button onClick={handleClose} color="secondary" endIcon={<CancelIcon />}>
                        בטל
                    </Button>
                    <Button onClick={handleSubmit} color="primary" endIcon={<SendIcon />}>
                        שלח
                    </Button>
                </DialogActions>
            </div>
        )
    }

    if (link.localeCompare("") !== 0) {
        return (
            <div className='empowerment'>
                <Container fluid style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                }}>
                    <ThemeProvider theme={theme2}>
                        <Link href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
                            <StyledButton >
                                <ArrowBackIcon /> חזרה לעמוד מתאמן</StyledButton>
                        </Link>
                    </ThemeProvider>
                    <StyledButton 
                        onClick={handleClick}>
                        <CreateIcon /> עריכת הקישור</StyledButton>
                </Container>
                <ShowGoogleDocs source={link} />
                <div dir="rtl">
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                        <DialogTitle id="form-dialog-title">אנא הכנס קישור חדש למערך ההעצמה</DialogTitle>
                        <EditDialog />
                    </Dialog>
                </div>

            </div>
        )
    }
    else {
        return (
            <div className='empowerment'>
                <Container fluid style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                }}>

                    <div dir="rtl">
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                            <DialogTitle id="form-dialog-title">אנא הכנס קישור למערך ההעצמה</DialogTitle>
                            <EditDialog />
                        </Dialog>
                    </div>
                    <Link href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
                        <StyledButton style={{ margin: "2px 2px 4px", width: "270px" }} >
                            <ArrowBackIcon /> חזרה לעמוד מתאמן</StyledButton>
                    </Link>
                </Container>
            </div>
        )
    }


}
export default EmpowermentEdit;


