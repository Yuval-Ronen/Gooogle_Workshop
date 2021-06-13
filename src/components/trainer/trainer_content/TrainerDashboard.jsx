import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect } from 'react';
import ShowExerciseHistory from "../../show_exercise_history";
import TrainingCart from "../../my_chart/chart_component";
import serverConnector from "../../../server-connector";
import {useState} from "react";
import {useLocalStorage} from "../../../UtillHook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const TrainerDashboard = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [dataSource2, setDataSource2] = useState([]);

    const [trainingHis, setTrainingHis] = useState(["מתאמנים",[]]);
     useEffect( () => {
         serverConnector.getUpcomingExercise_trainer(userInfo.ID).then(res => {
             setTrainingHis(res);
             console.log("trainingHis", trainingHis)
         })
     },[])
     //     useEffect( () => {
     //     serverConnector.getTrainingAmountByMonth_trainer(userInfo.ID).then(res => {
     //         setDataSource2(res);
     //         console.log("dataSource2", dataSource2)
     //         console.log(res)
     //     })
     // },[])

    return(
        <Container style={{padding: "0px"}}>
            <Row>
                <Col>
                <TrainingCart style ={{height:"200px"}}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p style = {{textAnchor: "middle",fontSize: "25px", color: "#55215e", textAlign: 'center'}} >אימונים אחרונים</p>
                <ShowExerciseHistory training_his ={trainingHis}/>
                </Col>
            </Row>
        </Container>

    )
}

export default TrainerDashboard;