import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrainingCart from "../my_chart/chart_component";
import {Table} from "reactstrap";
import React from "react";
import style from "../all_trainees_reasult/all_trainee_result.module.css";
import TraineeDisplay from "../trainee-displayer/trainee_displayer.component";
import style1 from "./personal_program.css"

const PersonalProgress = (props) => {
    let all_personal_program = [
        {month: "מאי", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit"},
        {month: "אפריל", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit"},
        {month: "מרץ", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit"},
        {month: "פבואר", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit"},
        {month: "ינואר", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit"}
        ]
    const myChangeHandler = (event) => {
        // this.setState({username: event.target.value});
    }
// style="white-space: pre; font-size: 28px; font-family: "Segoe UI Light", "Helvetica Neue Light", "Segoe UI", "Helvetica Neue", "Trebuchet MS", Verdana, sans-serif; font-weight: 200; fill: rgb(35, 35, 35); cursor: default;"
   return (
       <div>
           <text style = {{textAnchor: "middle",fontSize: "28px", fontWeight: "200"}} >מערכי העצמה</text>
       {all_personal_program?.length > 0 && all_personal_program.map((program, index)=>
            <div key={program.month + program.year + index} >
                            {/*<div key={program.month + program.year + index} className={style.traineeResult}>*/}
                            <a href = {program.docs_link} target = "_blank">{program.month + ','+ program.year}</a>
            </div> )
            }
            <form>
                <p>הוסף מערך העצמה חדש</p>
                <input
                    type ="text"
                    placeholder = "הכניסו קישור של google docs"/>
                    onChange={myChangeHandler}
            </form>

            </div>)

        }


export default PersonalProgress;