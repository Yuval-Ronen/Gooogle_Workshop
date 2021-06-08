import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect } from 'react';
import ShowExerciseHistory from "../../show_exercise_history";
import TrainingCart from "../../my_chart/chart_component";
import serverConnector from "../../../server-connector";
import {useState} from "react";
import {useLocalStorage} from "../../../UtillHook";



const TrainerDashboard = (props) => {
    const [userInfo,setUserInfo] = useLocalStorage("userInfo",{});

    const [trainingHis, setTrainingHis] = useState([]);
     useEffect( () =>{
        serverConnector.getUpcomingExercise_trainer(userInfo.ID).then(res => {
            setTrainingHis(res);
            console.log("trainingHis",trainingHis)
        })
    },[])

    // const [dataSource, setDataSource] = useState([]);
    // useEffect( () =>{
    //     serverConnector.getTrainingAmountByMonth_trainer(userInfo.ID).then(res => {
    //         setDataSource(res);
    //         console.log("dataSource2",dataSource)
    //     })
    // },[])

    return(
        <div>
            <div >
                <TrainingCart dataSource = {userInfo.ID} style ={{height:"200px"}}/>
            </div>
            <div style={{margin: 20}}>
                <h2>אימונים קרובים</h2>
                <ShowExerciseHistory training_his ={trainingHis}/>
            </div>
        </div>
        )
    }

export default TrainerDashboard;