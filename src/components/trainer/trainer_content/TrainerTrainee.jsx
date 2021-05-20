import Tab from "react-bootstrap/Tab";
import React, {useState} from "react";
import style from "../../all_trainees_reasult/all_trainee_result.module.css";
import TraineeProgress from "../../trainee_page_and_progress/trainee_pageProgress.component";
import TraineeDisplay from "../../trainee-displayer/trainee_displayer.component";

const TrainerTrainee = (props) => {
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);

    const askForData = () =>{
        // serverConnector.then(res => {
        //     setData();
        // })
        let training_his = [{trainDate:"13-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"good train", type:"trx"},
        {trainDate:"12-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"swim"},
        {trainDate:"11-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"dance"},
        {trainDate:"10-05-21",trainTime:"08:00:00", group_members:"{100000001}",description:"", type:"trx"}];

        let all_personal_program = [{date:"date", link:"link"}];
        setTrainingHistory(training_his);
        setPersonalProgram(all_personal_program);
    }


    // todo get back here to fix what i did with two pages and a bit of a mess.
    return (
        <div>
        {/*    <h1> need to put name</h1>*/}

        {/*<div className={style.container} onClick={askForData} >*/}
        {/*<TraineeProgress listHistory = {trainingHistory} listProgram = {personalProgram }/>*/}

        {/*{trainingHistory?.length > 0 && trainingHistory.map((exercise, index)=>*/}
        {/*    <div key={} className={}>*/}
        {/*            <TraineeDisplay trainee={trainee}/>*/}
        {/*    </div> )*/}
        {/*    }*/}
            </div>
    )
}

export default TrainerTrainee;