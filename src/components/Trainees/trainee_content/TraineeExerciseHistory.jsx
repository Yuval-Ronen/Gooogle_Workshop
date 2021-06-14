import React from "react";
import ShowExerciseHistory from "../../show_exercise_history";

const TraineeExerciseHistory = (props) => {

    let training_his = ["מאמן",[{train_date:"13-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"good train!!!! wowwwwwww", train_type:"crossfit"},
            {train_date:"12-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"swim"},
            {train_date:"11-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"dance"},
            {train_date:"10-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"crossfit"},
            {train_date:"9-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"swim"},
            {train_date:"8-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"dance"},
            {train_date:"7-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"swim"},
            {train_date:"6-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"dance"},
            {train_date:"5-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"swim"},
            {train_date:"4-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"dance"},
            {train_date:"3-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"swim"},
            {train_date:"2-05-21",train_time:"08:00:00", all_trainees:"שם מאמן",description:"", train_type:"dance"}]];

    return (
        <div className='exercise_history'>
            <ShowExerciseHistory training_his ={training_his} isDashbord={false}/>
        </div>

    )
}

export default TraineeExerciseHistory;