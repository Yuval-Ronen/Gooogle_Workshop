// import {useEffect, useState} from "react";
// import serverConnector from "../../../server-connector";
// import {pink} from "@material-ui/core/colors";
// import {useLocalStorage} from "../../../UtillHook";
//
// const AllTraineesToCalendar = () =>{
//   const [userInfo] = useLocalStorage("userInfo",{});
//   const [allTrainees, setAllTrainees] = useState([]);
//   const [traineesToCal] = useState([]);
//
//   useEffect( () =>{
//       serverConnector.getAllTrainees(userInfo).then(res => {
//           setAllTrainees(res);
//           console.log("allTrainees",allTrainees)
//       })
//     for (const trainee in allTrainees){
//       const newTrainee = {text: trainee.first_name + trainee.last_name,
//       id: trainee.trainee_id, color: pink[300],};
//       traineesToCal.concat(newTrainee);
//     }
//   },[])
//   console.log("traineesToCal",traineesToCal)
//   return traineesToCal
// }
// export default AllTraineesToCalendar;