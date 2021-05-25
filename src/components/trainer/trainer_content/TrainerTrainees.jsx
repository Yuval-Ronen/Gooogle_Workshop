import React, {useState} from "react";
import one from '../../../trainees_image/1.jpg';
import boy from '../../../trainees_image/boy.png';
import girl from '../../../trainees_image/girl.png';

import TraineeResult from "../../all_trainees_reasult/all_trainee_result.component"
import {Container} from "@material-ui/core";


const TrainerTrainees = (props) => {
    let allTrainees = [{trainer_id:"100000001",first_name:"trainer", last_name:"1", image: boy },
        {trainer_id:"100000002",first_name:"trainer", last_name:"2", image: boy },
        {trainer_id:"100000003",first_name:"trainer", last_name:"3", image: boy },
        {trainer_id:"100000004",first_name:"trainer", last_name:"4", image: boy },
        {trainer_id:"100000005",first_name:"trainer", last_name:"5", image: boy },
        {trainer_id:"100000006",first_name:"trainer", last_name:"6", image: boy },
        {trainer_id:"100000007",first_name:"trainer", last_name:"7", image: boy },
        {trainer_id:"100000008",first_name:"trainer", last_name:"8", image: boy },
        {trainer_id:"100000009",first_name:"trainer", last_name:"9", image: boy },
        {trainer_id:"100000010",first_name:"trainer", last_name:"10", image: boy },
        {trainer_id:"100000011",first_name:"trainer", last_name:"11", image: boy },
    ]

    return(
        <Container>
            <TraineeResult listOfTrainees={allTrainees}/>
        </Container>
    )
}

export default TrainerTrainees