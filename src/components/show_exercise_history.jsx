import React, {useState} from "react";
import { Table } from 'reactstrap';


//person can be trainer or trainee
const ShowExerciseHistory = (training_his) => {
    console.log("training_his",training_his)


    let train_type_icons = {martialArts: "mdi:karate",
        jog: "mdi:run",
        swim: "mdi:swim",
        crossfit: "mdi:weight-lifter",
        dance: "mdi:yoga" };

    return (
        <div className='exercise-history'>

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
                            <td>{exercise.train_type}</td>
                            <td>{exercise.all_trainees}</td>
                            <td>{exercise.train_time}</td>
                            <td>{exercise.train_date}</td>
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

export default ShowExerciseHistory;