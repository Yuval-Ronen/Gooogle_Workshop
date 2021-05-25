import React from "react";
import {Route, Switch} from "react-router-dom";
import TrainerTrainee from "./trainer_content/TrainerTrainee";
import TrainerExerciseSchedule from "./trainer_content/TrainerExerciseSchedule";
import TrainerTrainees from "./trainer_content/TrainerTrainees";
import ExerciseHistory from "./trainer_content/ExerciseHistory";

let training_his = ["מתאמנים",[{trainDate:"13-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"good train", type:"crossfit"},
            {trainDate:"12-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"11-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"10-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"crossfit"},
            {trainDate:"9-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"8-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"7-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"6-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"5-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"4-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"3-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"2-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"}]];

const TrainerPageContent = () =>

        <div className='trainer-page-content' style={{width:"100%", paddingLeft: "5%", paddingRight: "5%"}}>
           <Switch>
               <Route exact={true} path="/TrainerPage/trainee" component={TrainerTrainee}/>
               <Route exact={true} path="/TrainerPage/exercise_schedule" component={TrainerExerciseSchedule}/>
               <Route exact={true} path="/TrainerPage/trainees" component={TrainerTrainees}/>
               <Route exact={true} path="/TrainerPage/exercise_history" component={ExerciseHistory} training_his = {training_his}/>
           </Switch>
        </div>



export default TrainerPageContent;