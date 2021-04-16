# the code which inserts the data to your DB
import mysql.connector
import tmdbsimple as tmdb
import pandas as pd


def append_exception(error_string,api_index):
    output_path = "/Users/dovgertz/PycharmProjects/tau-db-project/SRC"
    with open(output_path + "/error.log", 'a') as outfile:
        outfile.write("error id: " + str(api_index) + " error string: " + str(error_string) + "\n")


##code for inserting elements
def insert_from_tmdb_api(cursor):
    tmdb.API_KEY = '855d530225e01af7fc01697c93cde7bd'
    valid_ids = []
    error_ids = []

    insert_to_Movie_metadata = (
      "INSERT INTO Movie_metadata (ID,Title,Release_date,Original_language,Status,Runtime,Budget,"
      "Revenue,Popularity,Vote_average,Vote_count,Poster_path,Backdrop_path,Overview)"
      "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    )

    insert_to_Movie_genres = (
      "INSERT INTO Movie_genres (ID,Genre_name)"
      "VALUES (%s,%s)"
    )

    insert_to_Movie_keywords = (
        "INSERT INTO Movie_keywords (ID, Keyword)"
        "VALUES (%s,%s)"
    )

    insert_to_Movie_actors = (
      "INSERT INTO Movie_actors (ID,Actor_id,Actor_character)"
      "VALUES (%s,%s,%s)"
    )

    insert_to_Actor_metadata = (
      "INSERT INTO Actor_metadata (Actor_id,Actor_name,Gender,Popularity,Profile_path)"
      "VALUES (%s,%s,%s,%s,%s)"
    )

    insert_to_ = (
      "INSERT INTO Movie_crew (ID,Crew_id,Department,Job)"
      "VALUES (%s,%s,%s,%s)"
    )

    insert_to_Crew_metadata = (
      "INSERT INTO Crew_metadata (Crew_id,Crew_name,Gender,Popularity,Profile_path)"
      "VALUES (%s,%s,%s,%s,%s)"
    )



    for i in range(1,30001):
        print("current id: " + str(i))
        if i % 100 == 0:
            cnx.commit()
            print("tested ids so far: " + str(i))
            print("number of error ids so far: " + str(len(error_ids)))
            print("number of valid ids so far: " + str(len(valid_ids)))

        try:
            movie = tmdb.Movies(i)
            response = movie.info()
            valid_ids.append(i)
        except Exception as e:
            append_exception(e,i)
            error_ids.append(i)
            continue

        try:
            cursor.execute(insert_to_Movie_metadata, (movie.id, movie.title,movie.release_date,movie.original_language
                                                   ,movie.status,movie.runtime,movie.budget,movie.revenue
                                                   ,movie.popularity,movie.vote_average,movie.vote_count
                                                   ,movie.poster_path,movie.backdrop_path,movie.overview))
        except Exception as e:
            append_exception(e,i)
            continue

        for genre in movie.genres:
            try:
                cursor.execute(insert_to_Movie_genres, (movie.id, genre["name"]))
            except Exception as e:
                append_exception(e, i)

        credits = movie.credits()
        for actor in credits["cast"]:
            try:
                cursor.execute(insert_to_Movie_actors, (movie.id, actor["id"],actor["character"]))
            except Exception as e:
                append_exception(e, i)

            try:
                cursor.execute(insert_to_Actor_metadata, (actor["id"],actor["name"],actor["gender"],
                                                          actor["popularity"],actor["profile_path"]))
            except Exception as e:
                append_exception(e, i)


        for crew_member in credits["crew"]:
            try:
                cursor.execute(insert_to_Movie_crew, (movie.id, crew_member["id"],
                                                      crew_member["department"],crew_member["job"]))
            except Exception as e:
                append_exception(e, i)

            try:
                cursor.execute(insert_to_Crew_metadata, (crew_member["id"],crew_member["name"],crew_member["gender"],
                                                          crew_member["popularity"], crew_member["profile_path"]))
            except Exception as e:
                append_exception(e, i)

        response2 = movie.keywords()
        keywords = response2["keywords"]
        for keyword in keywords:
            try:
                cursor.execute(insert_to_Movie_keywords, (response["id"], keyword["name"]))
            except Exception as e:
                append_exception(e, i)



#code for inserting the data from kaggle's ratings table:
def insert_from_kaggle_ratings_table(cursor):
    insert_to_Movie_ratings = (
      "INSERT INTO Movie_ratings (User_id,Movie_id,Rating)"
      "VALUES (%s,%s,%s)"
    )

    df = pd.read_csv("/Users/dovgertz/Desktop/SQL/ratings_preprocessed.csv")
    counter = 0
    for row in df.itertuples():
        try:
            cursor.execute(insert_to_Movie_ratings, (row.userId, row.movieId,row.rating))
        except Exception as e:
            print(e)
        counter += 1
        if counter % 1000 == 0:
            cnx.commit()
            print(counter)

if __name__ == "__main__":
    cnx = mysql.connector.connect(user='DbMysql18', password='DbMysql18', host='localhost',
                                  database='DbMysql18', port=3305)
    cursor = cnx.cursor()

    insert_from_tmdb_api(cursor)
    #insert_from_kaggle_ratings_table(cursor)
    cnx.close()



