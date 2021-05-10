import React, {useState} from 'react';
import style from "./all_trainee_result.module.css"
import TraineeDisplay from "../trainee-displayer/trainee_displayer.component";
import TraineeProgress from "../trainee_page_and_progress/trainee_pageProgress.component"


/*
 so there are two ways we can do this:
 1) save a state var, with the current window we want to show.
 2) use router to decide which page to render. (i think this way is best)
 can you show me where you want the new window to appear?
 are you here?
 yes
 and also on whatsapp
 i doesnt have to change the whole screen.
 i dont realy have the page yet but this will be
TraineeProgress

 is this what you want to appear?
 its empry now... but yes
 and where do you want it to appear?
  ill send a pic
  where is the green box?


 */
const TraineeResult = ({listOfTrainees})=>{
    const [trainingHistory, setTrainingHistory] = useState([]);
    const [personalProgram, setPersonalProgram] = useState([]);

    const askForData = () =>{
        // serverConnector.then(res => {
        //     setData();
        // })
        let training_his = [{trainDate:"trainDate",trainTime:"trainTime",
        group_members:"group_members",description:"description", type:"type"}];
        let all_personal_program = [{date:"date", link:"link"}];
        setTrainingHistory(training_his);
        setPersonalProgram(all_personal_program);
    }

    return <div className={style.container} onClick={askForData} >
        <TraineeProgress listHistory = {trainingHistory} listProgram = {personalProgram }/>

        {listOfTrainees?.length > 0 && listOfTrainees.map((trainee, index)=>
            <div key={trainee.first_name + trainee.last_name + index} className={style.traineeResult}>
                <a href={`/TrainerPage/trainee?id=${trainee.trainer_id}`}>
                    <TraineeDisplay trainee={trainee}/>
                </a>
            </div> )
            }

            </div>

        }
export default TraineeResult;