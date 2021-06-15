import React from "react";
import StyledButton from "./Empowerment.jsx"
import EditIcon from '@material-ui/icons/Edit';



const PersonalProgress = (trainee) => {


    // style="white-space: pre; font-size: 28px; font-family: "Segoe UI Light", "Helvetica Neue Light", "Segoe UI", "Helvetica Neue", "Trebuchet MS", Verdana, sans-serif; font-weight: 200; fill: rgb(35, 35, 35); cursor: default;"
    return (
        
            <StyledButton style={{ marginTop: "60px"  }} onClick= {() =>  window.location.href=(`/TrainerPage/trainee/traineeEmpowerment?trainee_id=${trainee.trainee}`)}>
               <p> <EditIcon fontSize='large'/></p>
                <p>עריכת מערך העצמה</p>
            </StyledButton>
     


    )

}


export default PersonalProgress;