import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';




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

              <Avatar alt={trainee.first_name + trainee.last_name} src={trainee.image} className={classes.large}/>
                <h6>{trainee.first_name + trainee.last_name}</h6>

    </div>
}


export default TraineeDisplay;