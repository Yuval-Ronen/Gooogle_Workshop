import Calendar from "../../Calendar";
import Tab from "react-bootstrap/Tab";
import React from "react";

const TrainerExerciseSchedule = (props) => {

    return (
        <div className='trainer-exercise-schedule'>
            <h1>לוח אימונים</h1>
            <Calendar/>
        </div>
    )
}

export default TrainerExerciseSchedule;