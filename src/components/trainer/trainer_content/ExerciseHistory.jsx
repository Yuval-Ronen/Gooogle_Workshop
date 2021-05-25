import React, {useState} from "react";
import { Table } from 'reactstrap';
import TrainingCart from "../../my_chart/chart_component";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PersonalProgress from "../../personal_progress/personalProgress_component";
import {array} from "prop-types";

//person can be trainer or trainee
const ExerciseHistory = (training_his) => {
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);
    console.log(training_his)

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

    let training_his_trainer = ["מאמן",[{trainDate:"13-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"good train", type:"crossfit"},
            {trainDate:"12-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"swim"},
            {trainDate:"11-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"dance"},
            {trainDate:"10-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"crossfit"},
            {trainDate:"9-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"swim"},
            {trainDate:"8-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"dance"},
            {trainDate:"7-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"swim"},
            {trainDate:"6-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"dance"},
            {trainDate:"5-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"swim"},
            {trainDate:"4-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"dance"},
            {trainDate:"3-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"swim"},
            {trainDate:"2-05-21",trainTime:"08:00:00", trainer_or_group_members:"trainer name",description:"", type:"dance"}]];
    // let col_name = training_his[0];
    //     console.log("col name"+col_name)
    //
    // function mySwitch(param){
    //     switch (param){
    //         case "trainer":
    //             return training_his_trainer;
    //             break;
    //         case "trainee":
    //             return training_his_trainee;
    //             break;
    //     }
    // }
    // const tmp = ()=>{
    //     switch (identity){
    //         case "trainer":
    //             return training_his_trainer;
    //             break;
    //         case "trainee":
    //             return training_his_trainee;
    //             break;
    //     }
    // }



    let train_type_icons = {martialArts: "mdi:karate",
        jog: "mdi:run",
        swim: "mdi:swim",
        crossfit: "mdi:weight-lifter",
        dance: "mdi:yoga" };
    // function switch_col(){
    //     switch (identity){
    //         case "trainer":
    //             console.log("this is 1")
    //             return "מתאמנים";
    //         case "trainee":
    //                             console.log("this is 2")
    //
    //             return "מאמן";
    //     }
    // }
    // let col_name;
    // if( identity === "trainer"){
    //     col_name = "מתאמנים"
    // }
    // else if(identity === "trainee"){
    //     col_name = "מאמן"
    // }
    // let trainee_or_trainer = {"trainee":"מתאמנים", "trainer": "מאמן"}


    return (
        <div className='exercise-history'>
            <h1>היסטוריית אימונים</h1>

        <div class="w3-panel">
            <div class="w3-row-padding" style={{margin:"5"}}>
              <div class="w3-third">
                <img src="" style={{width:"100"}} alt=""/>
                </div>
              <div class="w3-twothird">
                <Table class="w3-table w3-striped w3-white">
                <tr>
                    <td><h5>תיאור</h5></td>
                    <td><h5>סוג אימון</h5></td>
                    <td><h5>{training_his.training_his[0]}</h5></td>
                    <td><h5>שעה</h5></td>
                    <td><h5>תאריך</h5></td>
                    <td><h5> </h5></td>
                </tr>
                        {training_his.training_his[1]?.length > 0 && training_his.training_his[1].map((exercise, index)=>
                        // <div key={} className={}>
                        <tr>
                            <td>{exercise.description}</td>
                            <td>{exercise.type}</td>
                            <td>{exercise.trainer_or_group_members}</td>
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