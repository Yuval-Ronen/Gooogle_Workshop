import React, {useState} from "react";
import { Table } from 'reactstrap';
import TrainingCart from "../../my_chart/chart_component";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PersonalProgress from "../../personal_progress/personalProgress_component";


const ExerciseHistory = (props) => {
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);

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

    let training_his = [{trainDate:"13-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"good train", type:"crossfit"},
        {trainDate:"12-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
        {trainDate:"11-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"},
        {trainDate:"10-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"crossfit"},
        {trainDate:"9-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
        {trainDate:"8-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"},
        {trainDate:"7-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
        {trainDate:"6-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"},
        {trainDate:"5-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
        {trainDate:"4-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"},
        {trainDate:"3-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
        {trainDate:"2-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"}];

    let train_type_icons = {martialArts: "mdi:karate",
        jog: "mdi:run",
        swim: "mdi:swim",
        crossfit: "mdi:weight-lifter",
        dance: "mdi:yoga" }


    return (
        <div className='exercise-history'>
            <h1>היסטוריית אימונים</h1>

        <div class="w3-panel">
            <div class="w3-row-padding" style={{margin:"5"}}>
              <div class="w3-third">
                <img src="" style={{width:100}} alt=""/>
                </div>
              <div class="w3-twothird">
                <Table class="w3-table w3-striped w3-white">
                <tr>
                    <td><h5>תיאור</h5></td>
                    <td><h5>סוג אימון</h5></td>
                    <td><h5>מתאמנים</h5></td>
                    <td><h5>שעה</h5></td>
                    <td><h5>תאריך</h5></td>
                    <td><h5> </h5></td>


                </tr>
                        {/*<TraineeProgress listHistory = {trainingHistory} listProgram = {personalProgram }/>*/}
                        {training_his?.length > 0 && training_his.map((exercise, index)=>
                        // <div key={} className={}>
                        <tr>
                            <td>{exercise.description}</td>
                            <td>{exercise.type}</td>
                            <td>{exercise.group_members}</td>
                            <td>{exercise.trainTime}</td>
                            <td>{exercise.trainDate}</td>
                            <td><span className="iconify" data-icon= {train_type_icons[exercise.type]} data-inline="false" color="#55215e" width= "30px" height= "30px"  text-align = "center"></span></td>


                          </tr>
                   )
                            }
                </Table>
              </div>
            </div>
      </div>
        </div>

    )
}

export default ExerciseHistory;