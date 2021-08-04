import React from "react";
import StyledButton from "./Empowerment.jsx"
import EditIcon from '@material-ui/icons/Edit';



const PersonalProgress = (trainee) => {

    return (
        <a href={`/TrainerPage/trainee/traineeEmpowerment?trainee_id=${trainee.trainee}`} >
            <StyledButton style={{ marginTop: "30px", marginBottom: "15px", width:'90%'}} >
               <p> <EditIcon fontSize='large'/></p>
                <p>עריכת מערך העצמה</p>
            </StyledButton>
        </a>
     


    )

}


export default PersonalProgress;