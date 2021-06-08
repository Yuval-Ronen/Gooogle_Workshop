import React from "react";


const AllPersonalProgress = ({onClickCallback}) => {
    let all_personal_program = [
        {month: "מאי", year: "2021", docs_link: "https://docs.google.com/document/d/1EmFhltEfkpRu0J7D46anmz_GfE9krBhaWQd35m-HydA"},
        {month: "אפריל", year: "2021", docs_link: "https://docs.google.com/document/d/1nbUiLoq_KQ50uunbj_aPk5KqBi8_nJ1epNtqLkvHPkM"},
        {month: "מרץ", year: "2021", docs_link: "https://docs.google.com/document/d/1JknkP2Bm-fT6qUszxBkT7jTGj8GSvNpwP0KhKJMB7fo"},
        {month: "פבואר", year: "2021", docs_link: "https://docs.google.com/document/d/1X3MozGrUISwjI6CUpdK522Ov0EIDO9OMU0g_ulVjmhE"},
        {month: "ינואר", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw"}
        ]

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