// const serverUrl = "https://eitan.herokuapp.com/";
//const serverUrl ="https://main.d3hof7gzp9awj0.amplifyapp.com/"

 const serverUrl = "http://localhost:5000";




const serverConnector = {
    delayBy: async (timeout = 100) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    },
    connect: async () =>{
        try {
            await fetch(serverUrl+"/api/connect");
            return true;
        } catch {
            return false;
        }
    },

    checkIfTrainer:async (email) =>{
        let res = await fetch(serverUrl + "/api/checkIfTrainer/" + email);
        return await res.json();
    },

    checkIfTrainee:async (email) =>{
        let res = await fetch(serverUrl+"/api/checkIfTrainee/" + email);
        return await res.json();
        // return answer["result"];
    },

    getAllTrainees: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainees/"+trainer_id);
        let data =  await res.json();
        return await data["result"];
    },
    createNewTrain: async (trainer_id, trainees, train_type, train_date_start, train_date_end,  train_time_start,
                          train_time_end, description, training_details_id, rRule, exDate) =>{
        console.log("all new train info", rRule)
        let res = await fetch(serverUrl+"/api/createNewTrain/" + trainer_id +"/"+ [trainees] +"/"+ train_type +"/"+ train_date_start +"/"+ train_date_end +"/"+
            train_time_start +"/"+train_time_end +"/"+ description +"/"+ training_details_id +"/"+ rRule +"/"+ exDate);
        let data = await res.json();
        return await data["result"];
        },

    updateExercise:async (changed_data) =>{
        let str = JSON.stringify(changed_data);
        console.log("my_str", str)
        let res = await fetch(serverUrl+"/api/updateExercise/" + str);
        let data = await res.json();
        return data["result"];
        },
    deleteExercise:async (train_id) =>{
        let res = await fetch(serverUrl+"/api/deleteExercise/" + train_id);
        let data = await res.json();
        return data["result"];
        },
    getAllTrainerCalendar: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/get_all_trainer_calendar/" + trainer_id)
        // return await res.json();
        let data = await res.json();
        return data["result"];
    },
    GetAllTraineeDashboard: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/get_all_trainee_dashboard/" + trainee_id)
        // return await res.json();
        let data = await res.json();
        return data["result"];
    },
    GetAllTrainerDashboard: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/get_all_trainer_dashboard/" + trainer_id)
        let data = await res.json();
        return data["result"];
    },
    getAllTrainingHistory_trainer: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainer/" + trainer_id)
        // return await res.json();
        let data = await res.json();
        console.log(data["result"])
        return data["result"];

    },
    getAllForTraineePageInTrainer:async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getAllForTraineePageInTrainer/" + trainee_id)
        let data = await res.json();
        return data["result"];
    },

    getAllTrainingHistory_trainee: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainee/" + trainee_id)
        // return await res.json();
        let data = await res.json();
        return data["result"];
    },
    getUpcomingExercise_trainer: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getUpcomingExercise_trainer/" + trainer_id)
        let data = await res.json();
        return data["result"];
        // return await data;
        // return await res.json();
    },
    getUpcomingExercise_trainee: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getUpcomingExercise_trainee/" + trainee_id)
        let data = await res.json();
        console.log("im in server connector doing getUpcomingExercise_trainee ", data["result"])
        return data["result"];
        // return await data;
        // return await res.json();
    },
    getTrainingAmountByMonth_trainer: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getTrainingAmountByMonth_trainer/" + trainer_id)
        let data = await res.json();
        // console.log(data["result"])
        // console.log(data)
        return data["result"];
//        return  await res.json();

        // return await data;
    },
    getTrainingAmountByMonth_trainee: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getTrainingAmountByMonth_trainee/" + trainee_id)
        let data = await res.json();
        console.log("im in server connector doing getTrainingAmountByMonth_trainee ", data["result"])
        // console.log(data)
        return data["result"];
//        return  await res.json();

        // return await data;
    },
    getTypeAmount: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getTypeAmount/" + trainee_id)
        let data = await res.json();
        console.log("im in server connector doing getTypeAmount ", data["result"])

        return data["result"];

    },
    sendMessage: async (trainee_id, trainer_id, message) => {
        let res = await fetch(serverUrl + "/api/sendMessage/" +trainee_id +"/"+ trainer_id +"/"+ message)
        let data = await res.json();
        return data["result"];

    },
    getMessage: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getMessage/" +trainee_id )
        let data = await res.json();
        return data["result"];

    },
    changeMessageStatus: async (message_list) => {
        let str = JSON.stringify(message_list);
        console.log("my_str", str)
        let res = await fetch(serverUrl + "/api/changeMessageStatus/" + str)
        let data = await res.json();
        return data["result"];
        // let res = await fetch(serverUrl + "/api/changeMessageStatus/",{
        //     method: 'POST',
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify({
        //         trainee_id: trainee_id,
        //         trainer_id: trainer_id
        //     })
        // })
        // let data = await res.json();
        // return data["result"];
    },

    getAllTrain_type: async (string) => {
        let res = await fetch(serverUrl + "/api/getAllTrain_type/" + string)
        return await res.json();

    },
    getPersonalProgramLink:  async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getPersonalProgramLink/" + trainee_id)
        let data = await res.json();
        return data["result"];
    },
    insertNewPersonalProgramLink:  async (trainee_id, trainer_id, link) => {

        let res = await fetch(serverUrl + "/api/insertProgramLink/" + trainee_id +"/"+  trainer_id +"/"+ link)
        let data = await res.json();
        return data["result"];
    },
    updatePersonalProgramLink:  async (trainee_id, link) => {
        let res = await fetch(serverUrl + "/api/updatePersonalProgramLink/" + trainee_id +"/"+ link)
        let data = await res.json();
        return data["result"];
    }

}
export default serverConnector;


    // autoComplete_trainee: async (string, trainer_id) => {
    //     let res = await fetch(serverUrl + "/api/autoComplete_trainee/",{
    //         method: 'POST',
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify({
    //             trainer_id: trainer_id,
    //             string: string
    //         })
    //     })
    //     return await res.json();
    //     // let data = await res.json();
    //     // return data["result"];
    // },
    // autoComplete_train_type: async (string) => {
    //     let res = await fetch(serverUrl + "/api/autoComplete_train_type/",{
    //         method: 'POST',
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify({
    //             string: string
    //         })
    //     })
    //     return await res.json();
    //     // let data = await res.json();
    //     // return data["result"];
    // },