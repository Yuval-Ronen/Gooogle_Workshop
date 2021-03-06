import React, {useEffect, useState} from "react";

import TraineeResult from "../../all_trainees_reasult/all_trainee_result.component"
import serverConnector from "../../../server-connector";
import {useLocalStorage} from "../../../UtillHook";


const TrainerTrainees = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});

    const [allTrainees, setAllTrainees] = useState([]);

    // ]
    useEffect( () =>{
        serverConnector.getAllTrainees(userInfo.ID).then(res => {
            setAllTrainees(res);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
 
            <TraineeResult listOfTrainees={allTrainees}/>
    )
}

export default TrainerTrainees