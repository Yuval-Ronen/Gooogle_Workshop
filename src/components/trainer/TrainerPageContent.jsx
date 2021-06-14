import React from "react";
import {Route, Switch} from "react-router-dom";
import TrainerTrainee from "./trainer_content/TrainerTrainee";
import TrainerExerciseSchedule from "./trainer_content/TrainerExerciseSchedule";
import TrainerTrainees from "./trainer_content/TrainerTrainees";
import ExerciseHistory from "./trainer_content/ExerciseHistory";
import TrainerDashboard from "./trainer_content/TrainerDashboard";



const TrainerPageContent = () =>

        <div className='trainer-page-content' style={{width:"100%", paddingLeft: "2%", paddingRight: "2%"}}>
           <Switch>
               <Route exact={true} path="/TrainerPage" component={TrainerDashboard}/>
               <Route exact={true} path="/TrainerPage/trainee" component={TrainerTrainee}/>
               <Route exact={true} path="/TrainerPage/exercise_schedule" component={TrainerExerciseSchedule}/>
               <Route exact={true} path="/TrainerPage/trainees" component={TrainerTrainees}/>
               <Route exact={true} path="/TrainerPage/exercise_history" component={ExerciseHistory} />
               {/* <Route exact={true} path="/TrainerPage/traineeEmpowermentEdit" component={EmpowermentEdit}/> */}
           </Switch>
        </div>



export default TrainerPageContent;