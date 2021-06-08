import React, {useEffect, useState} from "react";
import boy from '../../../trainees_image/boy.png';
import girl from '../../../trainees_image/girl.png';
import TraineeResult from "../../all_trainees_reasult/all_trainee_result.component"
import {Container} from "@material-ui/core";
import one from '../../../trainees_image/1.jpg';
import two from '../../../trainees_image/2.jpg';
import three from '../../../trainees_image/3.jpg';
import four from '../../../trainees_image/4.jpg';
import five from '../../../trainees_image/5.jpg';
import six from '../../../trainees_image/6.jpg';
import seven from '../../../trainees_image/7.jpg';
import eight from '../../../trainees_image/8.jpg';
import nine from '../../../trainees_image/9.jpg';
import serverConnector from "../../../server-connector";
import {useLocalStorage} from "../../../UtillHook";


const TrainerTrainees = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});

    const [allTrainees, setAllTrainees] = useState([]);

    // let all_Trainees = [{trainer_id:"100000001",first_name:"trainer", last_name:"1", image: seven },
    //     {trainer_id:"100000002",first_name:"trainer", last_name:"2", image: one },
    //     {trainer_id:"100000003",first_name:"trainer", last_name:"3", image: two },
    //     {trainer_id:"100000004",first_name:"trainer", last_name:"4", image: three },
    //     {trainer_id:"100000005",first_name:"trainer", last_name:"5", image: four },
    //     {trainer_id:"100000006",first_name:"trainer", last_name:"6", image: five },
    //     {trainer_id:"100000007",first_name:"trainer", last_name:"7", image: six },
    //     {trainer_id:"100000008",first_name:"trainer", last_name:"8", image: seven },
    //     {trainer_id:"100000009",first_name:"trainer", last_name:"9", image: eight },
    //     {trainer_id:"100000010",first_name:"trainer", last_name:"10", image: nine },
    //     {trainer_id:"100000011",first_name:"trainer", last_name:"11", image: eight },
    //     {trainer_id:"100000002",first_name:"trainer", last_name:"12", image: seven },
    //     {trainer_id:"100000003",first_name:"trainer", last_name:"13", image: four },
    //     {trainer_id:"100000004",first_name:"trainer", last_name:"14", image: two },
    //     {trainer_id:"100000005",first_name:"trainer", last_name:"15", image: one },
    //     {trainer_id:"100000006",first_name:"trainer", last_name:"16", image: nine },
    //     {trainer_id:"100000007",first_name:"trainer", last_name:"17", image: five },
    //     {trainer_id:"100000008",first_name:"trainer", last_name:"18", image: three },
    // ]
    useEffect( () =>{
        serverConnector.getAllTrainees(userInfo.ID).then(res => {
            setAllTrainees(res);
            console.log("allTrainees",allTrainees)
        })
    },[])

    return(
 
            <TraineeResult listOfTrainees={allTrainees}/>
    )
}

export default TrainerTrainees