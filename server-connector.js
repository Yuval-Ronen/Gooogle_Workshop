const serverUrl = "http://127.0.0.1:5000";
//const serverUrl = "";


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
        let res = await fetch(serverUrl + "/api/checkIfTrainer/" + email,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
        let answer = await res.json();
        return answer["result"];
    },

    checkIfTrainee:async (email) =>{
        let res = await fetch(serverUrl+"/api/checkIfTrainee/" + email,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
        let answer = await res.json();
        return answer["result"];
    },

    getAllTrainees: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainees/" + trainer_id,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id
            })
        })
        let allTrainees = await res.json();
        return allTrainees["result"];
    },
    createNewTrain:async (trainer_id, {trainees_or_group}, type, trainDate, trainTime, description) =>{
        let res = await fetch(serverUrl+"/api/createNewTrain/" + (trainer_id,trainees_or_group,type,trainDate,trainTime, description));
        let status = await res.json();
        return status;
    },

    getPersonalProgram: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getPersonalProgram/" +trainee_id,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainee_id: trainee_id
            })
        })
        let data = await res.json();
        return data["result"];
    },
    setPersonalProgram: async (trainer_id,trainee_id, program) => {
        let res = await fetch(serverUrl + "/api/setPersonalProgram/" + (trainer_id,trainee_id,program),{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id,
                trainee_id: trainee_id,
                program: program
            })
        })
        let data = await res.json();
        return data["result"];
    },
    getAllTrainingHistory_trainer: async (trainer_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainer/"+trainer_id,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainerId: trainer_id
            })
        })
        let data = await res.json();
        return data["result"];
    },
    getAllTrainingHistory_trainee: async (trainee_id) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainee/"+trainee_id,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainee_id: trainee_id
            })
        })
        let data = await res.json();
        return data["result"];
    },

    autoComplete_trainee: async (string, trainer_id) => {
        let res = await fetch(serverUrl + "/api/autoComplete_trainee/" + (string,trainer_id),{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id,
                string: string
            })
        })
        let data = await res.json();
        return data["result"];
    },
    autoComplete_train_type: async (string) => {
        let res = await fetch(serverUrl + "/api/autoComplete_trainee/" +string,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                string: string
            })
        })
        let data = await res.json();
        return data["result"];
    },
    getAllTrain_type: async (string) => {
        let res = await fetch(serverUrl + "/api/autoComplete_trainee/" +string)
        let data = await res.json();
        return data["result"];
    }

}
export default serverConnector;