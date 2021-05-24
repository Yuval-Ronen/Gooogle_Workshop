import React from "react";
import {Route, Switch} from "react-router-dom";
import TrainerTrainee from "./trainer_content/TrainerTrainee";
import TrainerExerciseSchedule from "./trainer_content/TrainerExerciseSchedule";
import TrainerTrainees from "./trainer_content/TrainerTrainees";
import ExercisePictures from "./trainer_content/ExercisePictures";
import ExerciseHistory from "./trainer_content/ExerciseHistory";

const TrainerPageContent = () =>
        <div className='trainer-page-content' style={{width:"100%", paddingLeft: "5%", paddingRight: "5%"}}>
           <Switch>
               <Route exact={true} path="/TrainerPage/trainee" component={TrainerTrainee}/>
               <Route exact={true} path="/TrainerPage/exercise_schedule" component={TrainerExerciseSchedule}/>
               <Route exact={true} path="/TrainerPage/trainees" component={TrainerTrainees}/>
               <Route exact={true} path="/TrainerPage/exercise_pictures" component={ExercisePictures}/>
               <Route exact={true} path="/TrainerPage/exercise_history" component={ExerciseHistory}/>
           </Switch>
        </div>



export default TrainerPageContent;