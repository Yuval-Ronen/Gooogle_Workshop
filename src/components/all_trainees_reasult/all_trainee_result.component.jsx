import React, {useState} from 'react';
import style from "./all_trainee_result.module.css"
import TraineeDisplay from "../trainee-displayer/trainee_displayer.component";
import TraineeProgress from "../trainee_page_and_progress/trainee_pageProgress.component"
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
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
      }));

      const classes = useStyles();

    const askForData = () =>{
        // serverConnector.then(res => {
        //     setData();
        // })
        let training_his = [{trainDate:"trainDate",trainTime:"trainTime",
        group_members:"group_members",description:"description", type:"type"}];
        let all_personal_program = [{date:"date", link:"link"}];
        setTrainingHistory(training_his);
        setPersonalProgram(all_personal_program);
    }

    return <div onClick={askForData} >
        <Grid>
        <ul className="container">
        
        {/*<TraineeProgress listHistory = {trainingHistory} listProgram = {personalProgram }/>*/}

        {listOfTrainees?.length > 0 && listOfTrainees.map((trainee, index)=>
                <li className="item">
                <a href={`/TrainerPage/trainee?id=${trainee.trainer_id}`} style={{ display: "inline-block"}}>
                    <Avatar alt='image' src={trainee.image} className={classes.large}/>
                <h6>{trainee.first_name + trainee.last_name}</h6>
                </a>
                </li>
             )
            }
        </ul>
        </Grid>
        
            </div>

        }
export default TraineeResult;