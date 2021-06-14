import React from "react";
import StyledButton from "./Empowerment.jsx"
import EditIcon from '@material-ui/icons/Edit';



const PersonalProgress = (trainee) => {
    let all_personal_program = [
        { month: "מאי", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit" },
        { month: "אפריל", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit" },
        { month: "מרץ", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit" },
        { month: "פבואר", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit" },
        { month: "ינואר", year: "2021", docs_link: "https://docs.google.com/document/d/1CwdtJIqoWhAn88FMqw3wSaMMvXUgoFY1hCqIiXgFvGw/edit" }
    ]


    // style="white-space: pre; font-size: 28px; font-family: "Segoe UI Light", "Helvetica Neue Light", "Segoe UI", "Helvetica Neue", "Trebuchet MS", Verdana, sans-serif; font-weight: 200; fill: rgb(35, 35, 35); cursor: default;"
    return (
        
            <StyledButton style={{ marginTop: "60px"  }} onClick= {() =>  window.location.href=(`/TrainerPage/traineeEmpowerment?trainee_id=${trainee}`)}>
               <p> <EditIcon fontSize='large'/></p>
                <p>עריכת מערך העצמה</p>
            </StyledButton>
     


    )

}


export default PersonalProgress;