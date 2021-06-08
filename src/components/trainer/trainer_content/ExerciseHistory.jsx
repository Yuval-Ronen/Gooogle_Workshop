import React, {useEffect, useState} from "react";
import ShowExerciseHistory from "../../show_exercise_history";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";

//person can be trainer or trainee
const ExerciseHistory = () => {
    const [userInfo,setUserInfo] = useLocalStorage("userInfo",{});

    const [trainingHis, setTrainingHis] = useState([]);
     useEffect( () =>{
         if(userInfo.admin !== undefined ){//user is trainer
             serverConnector.getAllTrainingHistory_trainer(userInfo.ID).then(res => {
                 setTrainingHis(res);
             })
         }
         else{
             serverConnector.getAllTrainingHistory_trainee(userInfo.ID).then(res => {
                 setTrainingHis(res);
             })
         }
    },[])

    return (
        <div className='exercise-history'>
            <ShowExerciseHistory training_his ={trainingHis}/>
        </div>
    )
}


export default ExerciseHistory;