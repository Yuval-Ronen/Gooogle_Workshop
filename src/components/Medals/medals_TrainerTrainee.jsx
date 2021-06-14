import React from "react";
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import "../personal_progress/Empowerment.css"

export default function Medals() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const medalText='';
    const medalLogo='';


    return (
        <div>
            <button style={{ marginTop: "40px" }} onClick={handleClickOpen}>
                <p> <StarsRoundedIcon fontSize='large' /></p>
                <p> שליחת חיזוק</p>
            </button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">בחר חיזוק למתאמן</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="כתוב חיזוק אישי"
                        type="email"
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}




