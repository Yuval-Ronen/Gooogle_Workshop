import React, {useState} from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const Grid = styled.header`
    .container {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-content: center;
    }

    .item {
        text-align: center;
        padding: 0px;
       
    }

    
`; 

const TraineeResult = ({listOfTrainees})=>{
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
        root: {
            display: 'flex',
            '& > *': {
              margin: theme.spacing(1),
            },
            flexWrap: 'wrap'
        },
        item: {
            display: 'flex',
            '& > *': {
              margin: theme.spacing(0.3),
            },
            flexDirection: 'column',
            alignItems: 'center ',
        }
      }));

      const classes = useStyles();


    return <div>
        <Grid>
        <div className={classes.root}>
        
        {/*<TraineeProgress listHistory = {trainingHistory} listProgram = {personalProgram }/>*/}

        {listOfTrainees?.length > 0 && listOfTrainees.map((trainee, index)=>
               
                <a href={`/TrainerPage/trainee?trainee_id=${trainee.trainee_id}`} >
                    <div className={classes.item}>
                    <Avatar alt='image' src={trainee.image} className={classes.large}  />
                     <h6>{trainee.first_name}</h6>
                    <h6>{trainee.last_name}</h6>
                    </div>
                </a>
                
             )
            }
        </div>
        </Grid>
        
            </div>

        }
export default TraineeResult;