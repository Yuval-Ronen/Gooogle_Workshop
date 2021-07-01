// const serverUrl = "http://localhost:45556";
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
    createNewTrain:async (trainer_id, trainees, train_type, train_date_start, train_date_end,  train_time_start, train_time_end, description, training_details_id) =>{
        let res = await fetch(serverUrl+"/api/createNewTrain/" + trainer_id +"/"+ [trainees] +"/"+ train_type +"/"+ train_date_start +"/"+ train_date_end +"/"+
            train_time_start +"/"+train_time_end +"/"+ description +"/"+ training_details_id);
        //     method: 'POST',
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify({
        //         trainer_id: trainer_id,
        //         trainees: trainees,
        //         train_type: train_type,
        //         train_date: train_date,
        //         train_time: train_time,
        //         description:description
        //     })
        // })
        let data = await res.json();
        return data["result"];
        },

    getPersonalProgram: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getPersonalProgram/"+trainee_id)
        // let data = await res.json();
       return  await res.json();

        // return data;
    },
    setPersonalProgram: async (trainer_id,trainee_id, program) => {
        // let res = await fetch(serverUrl + "/api/setPersonalProgram/")
        // let data = await res.json();
        // return data["result"];
    },

    GetAllTraineeDashboard: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/get_all_trainee_dashboard/" + trainee_id)
        // return await res.json();
        let data = await res.json();
        return data["result"];
    },
    getAllTrainingHistory_trainer: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainer/" + trainer_id)
        // return await res.json();
        let data = await res.json();
        console.log(data)
        console.log(data["result"])
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
    changeMessageStatus: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/changeMessageStatus/" +trainee_id )
        let data = await res.json();
        return data["result"];

    },
    autoComplete_trainee: async (string, trainer_id) => {
        let res = await fetch(serverUrl + "/api/autoComplete_trainee/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id,
                string: string
            })
        })
        return await res.json();
        // let data = await res.json();
        // return data["result"];
    },
    autoComplete_train_type: async (string) => {
        let res = await fetch(serverUrl + "/api/autoComplete_train_type/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                string: string
            })
        })
        return await res.json();
        // let data = await res.json();
        // return data["result"];
    },
    getAllTrain_type: async (string) => {
        let res = await fetch(serverUrl + "/api/getAllTrain_type/" + string)
        return await res.json();
        // let data = await res.json();
        // return data["result"];
    }

}
export default serverConnector;