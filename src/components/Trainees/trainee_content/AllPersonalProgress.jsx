import React from "react";
import './personal_program_listStyle.css'

const AllPersonalProgress = ({onClickCallback}) => {
    let all_personal_program = [
        {month: "מאי", year: "2021", docs_link: "https://docs.google.com/document/d/1EmFhltEfkpRu0J7D46anmz_GfE9krBhaWQd35m-HydA"},
        {month: "אפריל", year: "2021", docs_link: "https://docs.google.com/document/d/1nbUiLoq_KQ50uunbj_aPk5KqBi8_nJ1epNtqLkvHPkM"},
        {month: "מרץ", year: "2021", docs_link: "https://docs.google.com/document/d/1JknkP2Bm-fT6qUszxBkT7jTGj8GSvNpwP0KhKJMB7fo"},
        {month: "פבואר", year: "2021", docs_link: "https://docs.google.com/document/d/1X3MozGrUISwjI6CUpdK522Ov0EIDO9OMU0g_ulVjmhE"},
        {month: "ינואר", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw"}
        ]
    
        
    const personal_program_list = all_personal_program.map((program, index)=>
    
        <li key={program.month + program.year + index}  className="list-item">
                        <button onClick={()=>onClickCallback(program.docs_link)}
                                        
                        >{program.month + ' '+ program.year}</button>
        </li> );
    

   return (
       <div>
           <text style = {{textAnchor: "middle",fontSize: "25px", color: "#ffc717"}} >מערכי העצמה</text>
            <ul className="unordered-list">
            {personal_program_list}
            </ul>
            </div>)

}



export default AllPersonalProgress;