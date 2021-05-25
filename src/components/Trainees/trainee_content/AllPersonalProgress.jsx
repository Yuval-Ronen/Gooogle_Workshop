import React from "react";


const AllPersonalProgress = ({onClickCallback}) => {
    let all_personal_program = [
        {month: "מאי", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit"},
        {month: "אפריל", year: "2021", docs_link: "https://google.com"},
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
            <div key={program.month + program.year + index} onClick={()=>onClickCallback(program.docs_link)} >
                            {/*<div key={program.month + program.year + index} className={style.traineeResult}>*/}
                            {program.month + ','+ program.year}
            </div> )
            }

            </div>)

        }


export default AllPersonalProgress;