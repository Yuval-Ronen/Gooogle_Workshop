import React from 'react';
import style from './trainee_displayer.module.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import Image from 'react-bootstrap/Image'
import TraineeProgress from "../trainee_page_and_progress/trainee_pageProgress.component"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';




const TraineeDisplay = ({trainee}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 4,

            
          },
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
      }));

      const classes = useStyles();



    return <div>
        
        {/*<TraineeProgress trainee = {trainee}/>*/}


          
              <Avatar alt={trainee.first_name + trainee.last_name} src={trainee.image} className={classes.large}/>
                <h6>{trainee.first_name + trainee.last_name}</h6>

    </div>
}


export default TraineeDisplay;