import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ShowExerciseHistory from "../../show_exercise_history";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PersonalProgress from "../../personal_progress/personalProgress_component";
import TrainingCart from "../../my_chart/chart_component";


const TrainerDashboard = (props) => {
let training_his = ["מתאמנים",[{trainDate:"27-05-21",trainTime:"08:00:00", trainer_or_group_members:"מתאמן א, מתאמן ב",description:"good train", type:"crossfit"},
            {trainDate:"28-05-21",trainTime:"08:00:00", trainer_or_group_members:"מתאמן א, מתאמן ב",description:"", type:"swim"},
            {trainDate:"28-05-21",trainTime:"12:00:00", trainer_or_group_members:"מתאמן א, מתאמן ב",description:"", type:"dance"},
            {trainDate:"28-05-21",trainTime:"19:00:00", trainer_or_group_members:"מתאמן א, מתאמן ב",description:"", type:"crossfit"},
]];


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
                <ShowExerciseHistory training_his ={training_his}/>
                </Col>
            </Row>
        </Container>
    
    )
}

export default TrainerDashboard;