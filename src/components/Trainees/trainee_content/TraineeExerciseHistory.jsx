import history from "../../../history";
import Tab from "react-bootstrap/Tab";
import React from "react";
import ShowExerciseHistory from "../../show_exercise_history";

const TraineeExerciseHistory = (props) => {

    let training_his = ["מאמן",[{trainDate:"13-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"good train", type:"crossfit"},
            {trainDate:"12-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"swim"},
            {trainDate:"11-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"dance"},
            {trainDate:"10-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"crossfit"},
            {trainDate:"9-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"swim"},
            {trainDate:"8-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"dance"},
            {trainDate:"7-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"swim"},
            {trainDate:"6-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"dance"},
            {trainDate:"5-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"swim"},
            {trainDate:"4-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"dance"},
            {trainDate:"3-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"swim"},
            {trainDate:"2-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"dance"}]];

    return (
        <div className='exercise_history'>
            <ShowExerciseHistory training_his ={training_his} isDashbord={false}/>
        </div>

    )
}

export default TraineeExerciseHistory;