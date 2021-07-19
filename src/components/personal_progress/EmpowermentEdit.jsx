import {useEffect, useState} from "react";
import ShowGoogleDocs from "../Trainees/trainee_content/ShowGoogleDocs";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledButton from "./Empowerment.jsx"
import serverConnector from "../../server-connector";
import {useLocalStorage} from "../../UtillHook";
import {useLocation} from "react-router-dom";


const EmpowermentEdit = () => {
    const [link, setLink] = useState("");
    const [traineeId, setTraineeId] = useState(0)
    // const [location, setLocation] = useState("");
    let myLocation = useLocation()


    useEffect( () => {
        let params = new URLSearchParams(myLocation.search);
        let trainee_id = parseInt(params.get("trainee_id")); //
        setTraineeId(trainee_id)
        if(traineeId != 0){
            serverConnector.getPersonalProgramLink(traineeId).then(res => {
                console.log("link",res)
                setLink(res);
            })
        }

     },[traineeId])


    return (
    <div className='empowerment'>
        <a href={`/TrainerPage/trainee?trainee_id=${traineeId}`} >
              <StyledButton style={{ margin: "2px 2px 4px" , width:"270px"}} >
                  <ArrowBackIcon/> חזרה לעמוד מתאמן</StyledButton>
                    <ShowGoogleDocs source = {link}/>
        </a>



    </div>
    )

}
export default EmpowermentEdit;