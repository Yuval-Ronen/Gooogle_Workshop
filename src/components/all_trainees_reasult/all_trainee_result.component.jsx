import React from 'react';
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
        padding: 20px;
       
    }

    
`; 

const TraineeResult = ({listOfTrainees})=>{

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
      }));

      const classes = useStyles();


    return <div>
        <Grid>
        <ul className="container">
        
        {/*<TraineeProgress listHistory = {trainingHistory} listProgram = {personalProgram }/>*/}

        {listOfTrainees?.length > 0 && listOfTrainees.map((trainee, index)=>
                <li className="item">
                <a href={`/TrainerPage/trainee?trainee_id=${trainee.trainee_id}`} style={{display: "block"}} >
                    <Avatar alt='image' src={trainee.image} className={classes.large} style={{display: "inline-block"}}/>
                <h6>{trainee.first_name}</h6>
                    <h6>{trainee.last_name}</h6>

                </a>
                </li>
             )
            }
        </ul>
        </Grid>
        
            </div>

        }
export default TraineeResult;