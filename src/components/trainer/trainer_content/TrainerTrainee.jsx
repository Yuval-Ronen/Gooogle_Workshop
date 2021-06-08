import React, {useState} from "react";
import { Table } from 'reactstrap';
import TrainingCart from "../../my_chart/chart_component";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PersonalProgress from "../../personal_progress/personalProgress_component";
import ExerciseHistory from "./ExerciseHistory";
import ShowExerciseHistory from "../../show_exercise_history";
import purple from '@material-ui/core/colors/purple';


const TrainerTrainee = (props) => {
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);
    let training_his = ["מתאמנים",[{trainDate:"13-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"good train", type:"crossfit"},
            {trainDate:"12-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"11-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"10-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"crossfit"},
            {trainDate:"9-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"8-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"7-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"6-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"5-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"4-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"3-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"2-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"}]];
    // const askForData = () =>{
    //     // serverConnector.then(res => {
    //     //     setData();
    //     // })
    //     let training_his = [{trainDate:"13-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"good train", type:"trx"},
    //     {trainDate:"12-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
    //     {trainDate:"11-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"},
    //     {trainDate:"10-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"trx"}];
    //
    //     let all_personal_program = [{date:"date", link:"link"}];
    //     setTrainingHistory(training_his);
    //     setPersonalProgram(all_personal_program);
    // }

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
                <ShowExerciseHistory training_his = {training_his}/>
                
                </Col>
            </Row>
        </Container>

        </div>

    )
}

export default TrainerTrainee;