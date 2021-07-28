import Trainer_Calendar from "./Trainer_Calendar";
import React, {useState} from "react";
import {useLocalStorage} from "../../../UtillHook";


const TrainerExerciseSchedule = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [allTrainees] = useState([]);

    return (
        <div className='trainer-exercise-schedule'>
            <Trainer_Calendar userInfo = {userInfo} allTrainees = {allTrainees} />
        </div>
    )
}
export default TrainerExerciseSchedule;