import React, {useEffect, useState} from "react";
import TrainingCart from "../../my_chart/chart_component";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PersonalProgress from "../../personal_progress/personalProgress_component";
import ShowExerciseHistory from "../../show_exercise_history";
import serverConnector from "../../../server-connector";
import {useLocation} from "react-router-dom"

const TrainerTrainee = () => {
    const currentURL = window.location.href
    let location = useLocation()
    let params = new URLSearchParams(location.search);
    let trainee_id = parseInt(params.get("trainee_id")); // is the number 123
    console.log("trainee_id",trainee_id)
    const [trainingHis, setTrainingHis] = useState([]);
     useEffect( () =>{
         serverConnector.getAllTrainingHistory_trainee(trainee_id).then(res => {
             setTrainingHis(res);
         })
    },[])
    return (
        <div>
        {/*    <h1> need to put name</h1>*/}
        <Container style={{padding: "0px"}}>
            <Row >
                <Col  >
                    <PersonalProgress/>
                </Col>
                <Col xs={8}>
                    <TrainingCart />
                </Col>
            </Row>
            <Row>
                <Col>
                <p style = {{textAnchor: "middle",fontSize: "35px", color: "#55215e", textAlign: 'center'}} >אימונים אחרונים</p>
                <ShowExerciseHistory training_his = {trainingHis}/>

                </Col>
            </Row>
        </Container>
        </div>


    )
}

export default TrainerTrainee;