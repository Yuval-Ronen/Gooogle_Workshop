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
        console.log("this is login res", res)
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
    createNewTrain:async (trainer_id, {trainees_or_group}, type, trainDate, trainTime, description) =>{
        let res = await fetch(serverUrl+"/api/createNewTrain", {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id,
                trainees: {trainees_or_group},
                type: type,
                trainDate:trainDate,
                trainTime:trainTime,
                description:description
            })
        })
        // let status = await res.json();
        return await res.json();
        // return status;
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
    getTrainingAmountByMonth_trainer: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getTrainingAmountByMonth_trainer/" + trainer_id)
        let data = await res.json();
        // console.log(data["result"])
        // console.log(data)
        return data["result"];
//        return  await res.json();

        // return await data;
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