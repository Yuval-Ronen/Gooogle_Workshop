//you need to import serverConnector from server-connector


const realServerCon = {
    checkConnectivity: () =>{
        fetch("/api/connect").then(result => {

        })
    },

    checkIfTrainer: email =>{
        fetch("/api/checkIfTrainer").then(result =>{
            return {
                trainer_id: "id",
                first_name: "first_name",
                last_name: "last_name",
                email: "email",
                image: "image",
                admin: "admin",
            }
        })
    },
    checkIfTrainee: email =>{
        fetch("/api/checkIfTrainee").then(result =>{
            return {
                trainee_id: "id",
                first_name: "first_name",
                last_name: "last_name",
                email: "email",
                image: "image",
            }
        })
    },


    getAllTrainees: trainer_id =>{
        fetch("/api/getAllTrainees/",{
            method: 'POST',
            body: JSON.stringify({
                trainer_id: trainer_id
            })
        }).then(result =>{
            return [
                {
                    trainee_id: "ID",
                    first_name: "firstName",
                    last_name: "lastName",
                    image: "imagePath",
                },
                {
                    trainee_id: "ID",
                    first_name: "firstName",
                    last_name: "lastName",
                    image: "imagePath",
                }
            ]

        })
    },

    createNewTrain: (trainer_id, {trainees_or_group}, type, trainDate, trainTime, description)  =>{
        fetch("/api/createNewTrain").then(result =>{
            return {
                status: "success/failure",
            }
        })
    },
    getPersonalProgram: (trainee_id) =>{
        fetch("/api/getPersonalProgram/",{
            method: 'POST',
            body: JSON.stringify({
                trainee_id: trainee_id
            })
        }).then(result =>{
            return {
                link: ["program1","program2","program3"],//all personal program. the first will be the last one
            }
        })
    },
    setPersonalProgram: (trainer_id,trainee_id, program) =>{

        fetch("/api/setPersonalProgram/",{
            method: 'POST',
            body: JSON.stringify({
                trainer_id: trainer_id,
                trainee_id: trainee_id,
                program: program
            })
        }).then(result =>{
            return {
                status: "success/failure",
            }
        })
    },

    getAllTrainingHistory_trainer: trainer_id =>{//all the training that the trainer did
        fetch("/api/getAllTrainingHistory_trainer/",{
            method: 'POST',
            body: JSON.stringify({
                trainer_id: trainer_id
            })
        }).then(result =>{
            return [
                {
                    train_date: "train_date",
                    train_time: "train_time",
                    all_trainees: ["name1","name2", "name3"],
                    description: "description",
                    train_type: "the train type",
                    status: "Open/Close"
                },
                {
                    trainDate: "date",
                    trainTime: "time",
                    all_trainees: ["name1","name2", "name3"],
                    description: "description",
                    train_type: "the train type",
                    status: "Open/Close"
                }
            ]

        })
    },

    getAllTrainingHistory_trainee: trainee_id =>{//all the training that the trainee did
        fetch("/api/getAllTrainingHistory_trainee/",{
            method: 'POST',
            body: JSON.stringify({
                trainee_id: trainee_id
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

    autoComplete_trainee: (string, trainer_id) =>{
        fetch("/api/autoComplete_trainee", {
            method: 'POST',
            body: JSON.stringify({
                trainer_id: trainer_id,
                string: string
            })

        }).then(result =>{
            return [
                "name1",
                "name2",
                "name3"
            ]
        })
    },
    autoComplete_train_type: (string) =>{
        fetch("/api/autoComplete_trainee", {
            method: 'POST',
            body: JSON.stringify({
                string: string
            })

        }).then(result =>{
            return [
                "type1",
                "type2",
                "type3"
            ]
        })
    },
    getAllTrain_type: () =>{
        fetch("/api/getAllTrainingHistory_trainee/",{
        }).then(result =>{
            return [
                "type1",
                "type2",
                "type3"
            ]

        })
    }

}