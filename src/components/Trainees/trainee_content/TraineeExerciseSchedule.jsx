import Trainee_Calendar from "./Trainee_Calendar";
import React from "react";
import {useLocalStorage} from "../../../UtillHook";



const TraineeExerciseSchedule = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    // let [appointments, setAppointments] = useState([])
    //  useEffect( () =>{
    //      // let helper = [];
    //      serverConnector.getAllTrainingHistory_trainee(userInfo.ID).then(res => {
    //          console.log("in TraineeExerciseSchedule get all history ", res);
    //          let helper = []
    //          let result = res[1]
    //          for (const index in res[1]){
    //              var s_date = result[index].train_date_start.split("-");
    //              var s_time = result[index].train_time_start.split(":");
    //              var e_date = result[index].train_date_end.split("-");
    //              var e_time = result[index].train_time_end.split(":");
    //              helper = helper.concat({title: result[index].train_type, triningType: result[index].train_type,
    //                  startDate: new Date(s_date[0], s_date[1] -1, s_date[2], s_time[0], s_time[1]),
    //                  endDate: new Date(e_date[0], e_date[1] -1, e_date[2], e_time[0], e_time[1]),
    //                  id: result[index].train_id,
    //                  TrainingDetailsId : result[index].training_details_id,
    //                  Trainees: result[index].all_trainees.split(","),
    //                  moreInfo: result[index].description
    //                  });
    //          }
    //          setAppointments(helper);
    //      })
    // },[])
    return (
        <div className='trainee-exercise-schedule'>
            <Trainee_Calendar userInfo = {userInfo}/>
        </div>
    )
}
export default TraineeExerciseSchedule;