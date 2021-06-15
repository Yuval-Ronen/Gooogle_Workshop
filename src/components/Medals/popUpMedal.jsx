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
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import Divider from '@material-ui/core/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function PopUpMedal(props) {

  let { newMedal } = props;
  console.log("newMedal",newMedal);
  const [open, setOpen] = useState(false);

  const [invisible, setVisible] = useState(false);
  console.log("invisible",invisible);

  const handleBadgeVisibility = () => {
    setVisible(!invisible);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVisible(true);
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
          קיבלת כוכב איתן
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
        <DialogTitle style = {{fontFamily: 'Segoe UI'}}>קיבלת כוכב איתן מאיתן עמותה</DialogTitle>
        <Divider />
        <DialogContent>
        <DialogContentText style = {{textAnchor: "middle",fontSize: "35px", color: "#ffc717", textAlign: 'center', fontFamily: 'Segoe UI'}}>
          <StarsRoundedIcon fontSize='large' style={{color: '#55215e'}}/>
          </DialogContentText>
          <DialogContentText style = {{textAnchor: "middle",fontSize: "35px", color: "#55215e", textAlign: 'center', fontFamily: 'Segoe UI'}}>
            כל הכבוד!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            תודה!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

