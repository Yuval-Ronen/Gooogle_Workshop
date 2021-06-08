import React, {useEffect, useState} from "react";
import TrainingCart from "../../my_chart/chart_component";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PersonalProgress from "../../personal_progress/personalProgress_component";
import ShowExerciseHistory from "../../show_exercise_history";
import serverConnector from "../../../server-connector";


const TrainerTrainee = (props) => {
    const [trainingHis, setTrainingHis] = useState([]);
     useEffect( () =>{
         serverConnector.getAllTrainingHistory_trainee(205380132).then(res => {
             setTrainingHis(res);
         })
    },[])
    return (
        <div>
        {/*    <h1> need to put name</h1>*/}
        <Container style={{padding: "0px"}}>
            <Row className="justify-content-md-center">
                <Col lg = "2">
                    <PersonalProgress/>
                </Col>
                <Col >
                    <TrainingCart />
                </Col>
            </Row>

        </Container>
        <ShowExerciseHistory training_his = {trainingHis}/>
        </div>

    )
}

export default TrainerTrainee;