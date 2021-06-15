import React, { useState } from 'react';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import StyledButton from "../personal_progress/Empowerment.jsx"
import FavoriteIcon from '@material-ui/icons/Favorite';
import InputAdornment from '@material-ui/core/InputAdornment';
import { purple } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import {useLocalStorage} from "../../UtillHook";
import serverConnector from "../../server-connector"


export default function Medals (trainee) {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    console.log("trainee", trainee.trainee);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        setOpen(false);
        setMessage(value);
        console.log("message", message);
        serverConnector.sendMessage(trainee.trainee, userInfo.ID, message).then(res => {
            setMessage(res)
            console.log("res", res)
        })
        setValue('');
    }


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    //console.log("medalText", medalText);

        return (
            <div>
                <StyledButton onClick={handleClickOpen}>
                    <p> <StarsRoundedIcon fontSize='large' /></p>
                    <p>שליחת כוכב איתן</p>
                </StyledButton>

                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="form-dialog-title">שלח כוכב איתן</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={value}
                            onChange={handleChange}
                            autoFocus
                            margin="normal"
                            label="כתוב חיזוק אישי למתאמן"
                            fullWidth
                            multiline
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FavoriteIcon style={{ color: purple[500] }} />
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
        )
    }





