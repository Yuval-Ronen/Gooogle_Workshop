// const serverUrl = "http://localhost:45556";
const serverUrl = "";


const serverConnector = {
    delayBy: async (timeout = 100) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    },
    checkConnectivity: async () =>{
        try {
            await fetch(serverUrl+"/api/connect");
            return true;
        } catch {
            return false;
        }
    },

    checkIfTrainer:async () =>{
        let res = await fetch(serverUrl+"/api/checkIfTrainer");
        let answer = await res.json();
        return answer;
    },

    checkIfTrainee:async () =>{
        let res = await fetch(serverUrl+"/api/checkIfTrainee");
        let answer = await res.json();
        return answer;
    },

    getAllTrainees: async (trainerId) => {
        let res = await fetch(serverUrl + "/api/getAllTrainees/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainerId: trainerId
            })
        })
        let allTrainees = await res.json();
        return allTrainees["result"];
    },
    createNewTrain:async () =>{
        let res = await fetch(serverUrl+"/api/createNewTrain");
        let status = await res.json();
        return status;
    },

    getPersonalProgram: async (traineeId) => {
        let res = await fetch(serverUrl + "/api/autoComplete/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                traineeId: traineeId
            })
        })
        let data = await res.json();
        return data["result"];
    },
    getAllTrainingHistory_trainer: async (trainerId) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainer/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainerId: trainerId
            })
        })
        let data = await res.json();
        return data["result"];
    },
    getAllTrainingHistory_trainee: async (traineeId) => {
        let res = await fetch(serverUrl + "/api/getAllTrainingHistory_trainee/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                traineeId: traineeId
            })
        })
        let data = await res.json();
        return data["result"];
    },

    autoComplete_trainee: async (string, trainerId) => {
        let res = await fetch(serverUrl + "/api/autoComplete_trainee/",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                trainerId: trainerId,
                string: string
            })
        })
        let data = await res.json();
        return data["result"];
    }
}
export default serverConnector;