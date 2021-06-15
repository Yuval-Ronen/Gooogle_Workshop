import Trainer_Calendar from "./Trainer_Calendar";
import React, {useEffect, useState} from "react";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";
import {pink} from "@material-ui/core/colors";

const TrainerExerciseSchedule = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [allTrainees, setAllTrainees] = useState([{'text': 'יובל רונן', 'id': 205380132, 'color': '#f06292'}, {'text': 'מתאמן א', 'id': 205380133, 'color': '#f06292'}, {'text': 'הודאל כהן', 'id': 205380134, 'color': '#f06292'}, {'text': 'ירון פרידמן', 'id': 205380135, 'color': '#f06292'}, {'text': 'שקד טרנר', 'id': 205380136, 'color': '#f06292'}, {'text': 'לירון בר-מגן', 'id': 205380137, 'color': '#f06292'}, {'text': 'מיטל ברגר', 'id': 205380138, 'color': '#f06292'}, {'text': 'אורי בירנבוים', 'id': 205380139, 'color': '#f06292'}, {'text': 'שחר גרינברג ריניס', 'id': 305339285, 'color': '#f06292'}]);
    const [appointments, setAppointments] = useState([{'title': 'ריצה', 'triningType': 'ריצה', 'startDate': new Date(2021, 2, 24, 10, 0), 'endDate': new Date(2021, 2, 24, 10, 0), 'id': 9, 'TrainingDetailsId': 2, 'Trainees': ['שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'קארטה', 'triningType': 'קארטה', 'startDate': new Date(2021, 3, 23, 8, 0), 'endDate': new Date(2021, 3, 23, 8, 0), 'id': 8, 'TrainingDetailsId': 1, 'Trainees': ['מיטל ברגר', ' ', 'אורי בירנבוים', ' ', 'שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'ריקוד', 'triningType': 'ריקוד', 'startDate': new Date(2021, 4, 13, 11, 0), 'endDate': new Date(2021, 4, 13, 11, 0), 'id': 4, 'TrainingDetailsId': 1, 'Trainees': ['הודאל כהן'], 'moreInfo': 'להגיע בזמן'}, {'title': 'ריקוד', 'triningType': 'ריקוד', 'startDate': new Date(2021, 4, 20, 12, 0), 'endDate': new Date(2021, 4, 20, 12, 0), 'id': 11, 'TrainingDetailsId': 1, 'Trainees': ['הודאל כהן', ' ', 'ירון פרידמן', ' ', 'שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'קארטה', 'triningType': 'קארטה', 'startDate': new Date(2021, 5, 5, 13, 0), 'endDate': new Date(2021, 5, 5, 13, 0), 'id': 3, 'TrainingDetailsId': 1, 'Trainees': ['יובל רונן'], 'moreInfo': 'אין תיאור'}, {'title': 'קרוספיט', 'triningType': 'קרוספיט', 'startDate': new Date(2021, 5, 31, 12, 0), 'endDate': new Date(2021, 5, 31, 12, 0), 'id': 10, 'TrainingDetailsId': 2, 'Trainees': ['שקד טרנר', ' ', 'שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'שחייה', 'triningType': 'שחייה', 'startDate': new Date(2021, 6, 16, 13, 0), 'endDate': new Date(2021, 6, 16, 13, 0), 'id': 1, 'TrainingDetailsId': 1, 'Trainees': ['שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'ריקוד', 'triningType': 'ריקוד', 'startDate': new Date(2021, 6, 17, 18, 0), 'endDate': new Date(2021, 6, 17, 18, 0), 'id': 7, 'TrainingDetailsId': 1, 'Trainees': ['אורי בירנבוים', ' ', 'שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'קרוספיט', 'triningType': 'קרוספיט', 'startDate': new Date(2021, 6, 17, 13, 0), 'endDate': new Date(2021, 6, 17, 13, 0), 'id': 2, 'TrainingDetailsId': 2, 'Trainees': ['יובל רונן', ' ', 'שחר גרינברג ריניס'], 'moreInfo': 'אין תיאור'}, {'title': 'שחייה', 'triningType': 'שחייה', 'startDate': new Date(2021, 7, 4, 9, 0), 'endDate': new Date(2021, 7, 4, 9, 0), 'id': 5, 'TrainingDetailsId': 2, 'Trainees': ['שחר גרינברג ריניס'], 'moreInfo': 'לא לשכוח משקפת'}, {'title': 'קארטה', 'triningType': 'קארטה', 'startDate': new Date(2021, 7, 12, 11, 0), 'endDate': new Date(2021, 7, 12, 11, 0), 'id': 6, 'TrainingDetailsId': 1, 'Trainees': ['יובל רונן', ' ', 'ירון פרידמן'], 'moreInfo': 'אין תיאור'}]
);

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
            <Trainer_Calendar userInfo = {userInfo} allTrainees = {allTrainees} appointments = {appointments}/>
        </div>
    )
}
export default TrainerExerciseSchedule;