import Trainer_Calendar from "./Trainer_Calendar";
import React, {useEffect, useState} from "react";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";
import {pink} from "@material-ui/core/colors";

const TrainerExerciseSchedule = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [allTrainees, setAllTrainees] = useState([{'text': 'יובל רונן', 'id': 205380132, 'color': '#f06292'}, {'text': 'מתאמן א', 'id': 205380133, 'color': '#f06292'}, {'text': 'הודאל כהן', 'id': 205380134, 'color': '#f06292'}, {'text': 'ירון פרידמן', 'id': 205380135, 'color': '#f06292'}, {'text': 'שקד טרנר', 'id': 205380136, 'color': '#f06292'}, {'text': 'לירון בר-מגן', 'id': 205380137, 'color': '#f06292'}, {'text': 'מיטל ברגר', 'id': 205380138, 'color': '#f06292'}, {'text': 'אורי בירנבוים', 'id': 205380139, 'color': '#f06292'}, {'text': 'שחר גרינברג ריניס', 'id': 305339285, 'color': '#f06292'}]);

     useEffect( () =>{
         let helper = [];
         serverConnector.getAllTrainees(userInfo.ID).then(res => {
             for (const index in res){
                 helper = helper.concat({text: res[index].first_name +' '+ res[index].last_name,
                     id: res[index].trainee_id, color: pink[300]});
             }
             setAllTrainees(helper)
             console.log("allTrainees",allTrainees)
         })
    },[])
    //  useEffect( () =>{
    //      // let helper = [];
    //      serverConnector.getAllTrainingHistory_trainer(userInfo.ID).then(res => {
    //          console.log("res", res);
    //          // for (const index in res[1]){
    //          //     var s_date = res[index].start_date.split("-");
    //          //     var s_time = res[index].start_time.split(":");
    //          //     var e_date = res[index].end_date.split("-");
    //          //     var e_time = res[index].end_time.split(":");
    //          //     helper = helper.concat(appointments.concat({title: res[index].train_type, triningType: res[index].train_type,
    //          //         startDate: new Date(s_date[0], s_date[1], s_date[2], s_time[0], s_time[1]),
    //          //         endDate: new Date(e_date[0], e_date[1], e_date[2], e_time[0], e_time[1]),
    //          //         id: res[index].train_id,
    //          //         TrainingDetailsId : res[index].training_details_id,
    //          //         Trainees: res[index].all_trainees.split(","),
    //          //         moreInfo: res[index].description
    //          //         }));
    //          // }
    //          setAppointments(res);
    //          console.log("res", res);
    //          // setAppointments(helper);
    //          // console.log(helper);
    //      })
    // },[])
    console.log("im here in ")
    return (
        <div className='trainer-exercise-schedule'>
            <Trainer_Calendar userInfo = {userInfo} allTrainees = {allTrainees} />
        </div>
    )
}
export default TrainerExerciseSchedule;