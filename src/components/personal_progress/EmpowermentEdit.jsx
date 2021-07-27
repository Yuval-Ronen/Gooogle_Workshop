import {useEffect, useState} from "react";
import ShowGoogleDocs from "../Trainees/trainee_content/ShowGoogleDocs";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledButton from "./Empowerment.jsx"
import serverConnector from "../../server-connector";
import {useLocation} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import {useLocalStorage} from "../../UtillHook";
import {string} from "prop-types";

const EmpowermentEdit = () => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [link, setLink] = useState("");
    const [value, setValue] = useState("");
    const [traineeId, setTraineeId] = useState(0)
    const [open, setOpen] = useState(false);

    let myLocation = useLocation()


    useEffect( () => {
        let params = new URLSearchParams(myLocation.search);
        let trainee_id = parseInt(params.get("trainee_id")); //
        setTraineeId(trainee_id)
        if(traineeId != 0){
            serverConnector.getPersonalProgramLink(traineeId).then(res => {
                console.log("link in EmpowermentEdit",res)
                setLink(res);
                if(res.localeCompare("") === 0){
                   setOpen(true)
                }
            })
        }

     },[traineeId])
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        setOpen(false);
        console.log("traineeId", traineeId.toString(),"userInfo.ID", userInfo.ID.toString() , "value",value)
        var my = value.split("/")
        console.log("link", my)
        serverConnector.insertNewPersonalProgramLink(traineeId, userInfo.ID, value.split("/")).then(res => {
            console.log("res", res)
            setLink(value);
        })
        setValue('');
    }

      const handleClose = () => {
        setOpen(false);
      };

    if(link.localeCompare("") != 0){
        console.log("not equal to empty link")
        return (
            <div className='empowerment'>
                <a href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
                      <StyledButton style={{ margin: "2px 2px 4px" , width:"270px"}} >
                          <ArrowBackIcon/> חזרה לעמוד מתאמן</StyledButton>
                            <ShowGoogleDocs source = {link}/>
                </a>
            </div>
            )
    }
    else{
            console.log(" equal to empty link")
        return (
            <div className='empowerment'>
                <a href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
                      <StyledButton style={{ margin: "2px 2px 4px" , width:"270px"}} >
                          <ArrowBackIcon/> חזרה לעמוד מתאמן</StyledButton>
                </a>
                <div dir="rtl">
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                        <DialogTitle id="form-dialog-title">אנא הכניסו את הקישור למערך ההעצמה</DialogTitle>
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
                                            <img src="../../../icons/google-sheets.png" />
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
                    </Dialog>
                </div>
            </div>
            )
    }


}
export default EmpowermentEdit;


