import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ShowExerciseHistory from "../../show_exercise_history";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrainingCart from "../../my_chart/chart_component";
import TrainTypePie from "../../train_pie/train_type_pie";


const TraineeDashboard = (props) => {
    let training_his = ["מאמן",[{trainDate:"26-05-21",trainTime:"20:00:00", trainer_or_group_members:"שם מאמן",description:"good train", type:"crossfit"},
            {trainDate:"26-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"swim"},
            {trainDate:"27-05-21",trainTime:"08:00:00", trainer_or_group_members:"שם מאמן",description:"", type:"dance"}]];


    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <TrainingCart style ={{height:"200px"}}/>
                    </Col>
                    <Col>
                        <TrainTypePie/>
                    </Col>
                </Row>
                <Row>
                    
                </Row>
            </Container>

            <div style={{margin: 20}}>
            <h2>אימונים קרובים</h2>
                <ShowExerciseHistory training_his ={training_his}/>
            </div>

        </div>
    )
}

export default TraineeDashboard;