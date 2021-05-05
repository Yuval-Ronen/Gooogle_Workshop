//you need to import serverConnector from server-connector


const realServerCon = {
    checkConnectivity: () =>{
        fetch("/api/connect").then(result => {

        })
    },

    checkIfTrainer: email =>{
        fetch("/api/checkIfTrainer").then(result =>{
            return {
                answer: "true/false",
            }
        })
    },
    checkIfTrainee: email =>{
        fetch("/api/checkIfTrainee").then(result =>{
            return {
                answer: "true/false",
            }
        })
    },


    getAllTrainees: trainerId =>{
        fetch("/api/getAllTrainees/",{
            method: 'POST',
            body: JSON.stringify({
                trainerId: trainerId
            })
        }).then(result =>{
            return [
                {
                    traineeID: "ID",
                    firstName: "firstName",
                    lastName: "lastName",
                    image: "imagePath",
                },
                {
                    traineeID: "ID",
                    firstName: "firstName",
                    lastName: "lastName",
                    image: "imagePath",
                }
            ]

        })
    },

    createNewTrain: (trainerID, {trainees_or_group}, type, trainDate, trainTime, description)  =>{
        fetch("/api/createNewTrain").then(result =>{
            return {
                status: "success/failure",
            }
        })
    },
    getPersonalProgram: (traineeId) =>{
        fetch("/api/getPersonalProgram/",{
            method: 'POST',
            body: JSON.stringify({
                traineeId: traineeId
            })
        }).then(result =>{
            return {
                link: ["program1","program2","program3"],//all personal program. the first will be the last one
            }
        })
    },

    getAllTrainingHistory_trainer: trainerId =>{//all the training that the trainer did
        fetch("/api/getAllTrainingHistory_trainer/",{
            method: 'POST',
            body: JSON.stringify({
                trainerId: trainerId
            })
        }).then(result =>{
            return [
                {
                    trainDate: "date",
                    trainTime: "time",
                    group_members: ["name1","name2", "name3"],//if this is a personal train the array will be empty
                    trainee_name: "name",//will be null if it's a group train
                    description: "description",
                    type: "the train type",
                },
                {
                    trainDate: "date",
                    trainTime: "time",
                    group_members: ["name1","name2", "name3"],//if this is a personal train the array will be empty
                    trainee_name: "name",//will be null if it's a group train
                    description: "description",
                    type: "the train type",
                }
            ]

        })
    },

    getAllTrainingHistory_trainee: traineeId =>{//all the training that the trainee did
        fetch("/api/getAllTrainingHistory_trainee/",{
            method: 'POST',
            body: JSON.stringify({
                traineeId: traineeId
            })
        }).then(result =>{
            return [
                {
                    trainDate: "date",
                    trainTime: "time",
                    group_members: ["name1","name2", "name3"],//if this is a personal train the array will be empty
                    trainer_name: "name",
                    description: "description",
                    type: "the train type",
                },
                {
                    trainDate: "date",
                    trainTime: "time",
                    group_members: ["name1","name2", "name3"],//if this is a personal train the array will be empty
                    trainer_name: "name",
                    description: "description",
                    type: "the train type",
                }
            ]

        })
    },

    autoComplete_trainee: (string, trainerId) =>{
        fetch("/api/autoComplete_trainee", {
            method: 'POST',
            body: JSON.stringify({
                trainerId: trainerId,
                string: string
            })

        }).then(result =>{
            return [
                "name1",
                "name2",
                "name3",
                "name4",
                "name5"
            ]
        })
    }
}