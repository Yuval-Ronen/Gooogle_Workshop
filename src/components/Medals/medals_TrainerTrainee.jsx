import React, { Component } from 'react';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import StyledButton from  "../personal_progress/Empowerment.jsx"
import FavoriteIcon from '@material-ui/icons/Favorite';
import InputAdornment from '@material-ui/core/InputAdornment';
import { purple } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

class Medals extends Component{
    
    constructor(props) {
        super(props);
        this.state = {value: '',
        open: false  };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        this.setState({open: false});
        console.log("value",this.state.value )

      }
    

     handleClickOpen= () => {
        this.setState({open: true});
    };

     handleClose= () => {
        this.setState({open: false});
    };


    //console.log("medalText", medalText);
    
    render(){
        return (
            <div>
                <StyledButton onClick={this.handleClickOpen}>
                    <p> <StarsRoundedIcon fontSize='large' /></p>
                    <p>שליחת חיזוק למתאמן</p>
                </StyledButton>
    
                 <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="form-dialog-title">חיזוק למתאמן</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={this.state.value}
                            onChange={this.handleChange}
                            autoFocus
                            margin="normal"
                            label="כתוב חיזוק אישי למתאמן"
                            fullWidth
                            multiline
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FavoriteIcon style={{ color: purple[500] }}/>
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary" endIcon={<CancelIcon/>}>
                           בטל
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" endIcon={<SendIcon/>}>
                          שלח  
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    

}
export default (Medals);



