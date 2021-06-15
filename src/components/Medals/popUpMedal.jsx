import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import { purple } from '@material-ui/core/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function PopUpMedal(props) {

  let { newMedal } = props;
  console.log("newMedal",newMedal);
  const [open, setOpen] = useState(false);

  const [invisible, setVisible] = useState(true);
  console.log("invisible",invisible);

  const handleBadgeVisibility = () => {
    setVisible(!invisible);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (newMedal == true) {
    handleBadgeVisibility();
    newMedal = false;
    console.log("invisible2",invisible);
  }

  return (

    <div >
      <Badge color="secondary" badgeContent=" " invisible={invisible}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
         <Fab
          variant="extended"
          size="medium"
          //color="inherit"
          aria-label="add"
          onClick={handleClickOpen} 
          style={{ background:  '#55215e', color: 'white', fontFamily: 'Segoe UI' }}>
          חיזוק מהמאמן
        </Fab>
      </Badge>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

