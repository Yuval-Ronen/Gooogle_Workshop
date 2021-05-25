import React from "react";
import {Route, Switch} from "react-router-dom";
import TraineeExerciseSchedule from "./TraineeExerciseSchedule";
import empowerment from "./empowerment";
import TraineeExerciseHistory from "./TraineeExerciseHistory";
import TraineeDashboard from "./TraineeDashboard";


const TraineePageContent = () =>
        <div className='trainee-page-content' style={{width:"100%", paddingLeft: "5%", paddingRight: "5%"}}>
           <Switch>
               <Route exact={true} path="/TraineesPage" component={TraineeDashboard}/>
               <Route exact={true} path="/TraineesPage/exercise_schedule" component={TraineeExerciseSchedule}/>
               <Route exact={true} path="/TraineesPage/empowerment" component={empowerment}/>
               <Route exact={true} path="/TraineesPage/exercise_history" component={TraineeExerciseHistory}/>
           </Switch>

        </div>



export default TraineePageContent;