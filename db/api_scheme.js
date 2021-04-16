const realServerCon = {
    checkConnectivites: () =>{
        fetch("/api/connect").then(res => {

        })
    },
    getQuestion: () =>{
        fetch("/api/getQuestion").then(res =>{
            return {
                questionType: "text" || "multyChoice" || "photo",
                questionText: "qeustion?",
                answer: "name2",
                answerType: "movie" || "actor",
                answerId: "idOf2",

                imgPath:"/img.png",
                multiChoices: ["name1", "name2", "name3", "name4"], //one should be correct
            }
        })
    },

    getMovie: moviesId =>{
        fetch("/api/getMovie/" + moviesId).then(res => {
            return {
                movieId: "movieId",
                title: "movieTitle",
                overview: "movieDescription",
                runTime: 120,
                rating: 5,
                posterPath: "/path",
                genres: ["Comedy", "Drama"],
            }
        })
    },

    getActor: actorId =>{
        fetch("/api/getActor/" + actorId).then(res => {
            return {
                actorId: "movieId",
                actorName: "actor full name",
                profilePath: "/path",
                lastAppearances: ["name3", "name2", "name1"],
                popularity: "score"
                //i also need gender
                //maybe we need character name?
            }
        })
    },

    getMovieByDescription: desc =>{
        fetch("/api/moviesByDesc/",{
            method: 'POST',
            body: JSON.stringify({
                description: desc
            })
        }).then(res =>{
            return [
                {
                    movieId: "movieId",
                    title: "movieTitle",
                    overview: "movieDescription",
                    runTime: 120,
                    rating: 5,
                    posterPath: "/path",
                    genres: ["Comedy", "Drama"],
                },
                {
                    movieId: "movieId",
                    title: "movieTitle",
                    overview: "movieDescription",
                    runTime: 120,
                    rating: 5,
                    posterPath: "/path",
                    genres: ["Comedy", "Drama"],
                }
            ]

        })
    },

    autoComplete: (string, type) =>{
        fetch("/api/autoComplete", {
            method: 'POST',
            body: JSON.stringify({
                type: type,
                string: string
            })

        }).then(res =>{
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