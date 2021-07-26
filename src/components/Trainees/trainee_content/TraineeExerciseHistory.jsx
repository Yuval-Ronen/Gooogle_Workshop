import React, {useCallback, useEffect, useRef, useState} from "react";
import ShowExerciseHistory from "../../show_exercise_history";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";

const TraineeExerciseHistory = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});

    const [trainingHis, setTrainingHis] = useState(["מאמן",[]]);
     useEffect( () =>{
         serverConnector.getAllTrainingHistory_trainee(userInfo.ID).then(res => {
             setTrainingHis(res);
         })
    },[])


    return (
        <div className='exercise_history'>
            <ShowExerciseHistory training_his ={trainingHis} isDashboard={false}/>
        </div>

    )
}

export default TraineeExerciseHistory;