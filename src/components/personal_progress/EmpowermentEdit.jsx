import {useState} from "react";
import ShowGoogleDocs from "../Trainees/trainee_content/ShowGoogleDocs";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledButton from "./Empowerment.jsx"

const EmpowermentEdit = () => {

    const [source2, setSource] = useState("https://docs.google.com/spreadsheets/d/1BUT4aA00zEG0SiwX7xE6fNW67LuQCsHBvlx8RGQczZI/#gid=470620253");

    const traineeID = window.location.href.split('=')[1];
    console.log(traineeID);
    return (
    <div className='empowerment'>


              <StyledButton style={{ margin: "2px 2px 4px" , width:"270px"}} onClick= {() =>  window.location.href=(`/TrainerPage/trainee?trainee_id=${traineeID}`)}>
                  <ArrowBackIcon/> חזרה לעמוד מתאמן</StyledButton>
                    <ShowGoogleDocs source = {source2}/>



    </div>
    )

}
export default EmpowermentEdit;