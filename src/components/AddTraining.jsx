import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'white',
    borderRadius: 3,
    border: '1px solid blue' ,
    borderColor: '#b2102f',
    color: '#b2102f',
    height: 48,
    width: '90%',
    padding: '0 30px',
    margin:'10px',
    fontSize: 16,
    fontFamily: 'Segoe UI',    
  },
};

function AddTraining(props) {
  const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const { classes, children, className} = props;


  return (
    <div>
    <Button className={clsx(classes.root, className) } onClick={handleClickOpen}>
      {children || 'הוספת אימון  '}  <BsFillPlusCircleFill />
      
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
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

  );
}

AddTraining.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AddTraining);

