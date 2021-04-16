 # server code
import mysql.connector

POSTER_NULL = "https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png"


class ConnectSQL:
    def __init__(self):
        self.cnx = None
        self.cursor = None
        self.connect_to_db()
        self.ids = self.initialize_valid_movies_and_actors()

    def connect_to_db(self):
        self.cnx = mysql.connector.connect(user='DbMysql18', password='DbMysql18', host='localhost',
                                           database='DbMysql18', port=3305)
        self.cursor = self.cnx.cursor()


    def initialize_valid_movies_and_actors(self):

        VALID_MOVIES = {}
        VALID_ACTORS = {}
        VALID_DATA = {}

        query1 = "select ID, Title from Movie_metadata order by revenue desc limit 500"
        self.cursor.execute(query1)

        for (ID, Title,) in self.cursor:
            VALID_MOVIES[ID] = Title

        query2 = "select  Actor_id, Actor_name, Popularity from Actor_metadata order by Popularity desc limit 500"
        self.cursor.execute(query2)

        for (Actor_id, Actor_name, Popularity,) in self.cursor:
            VALID_ACTORS[Actor_id] = Actor_name

        VALID_DATA["Actors"] = VALID_ACTORS
        VALID_DATA["Movies"] = VALID_MOVIES

        return VALID_DATA

    def find_info_given_id(self, target_id):

        query3 = ("SELECT selcted_movie.ID, Title ,Overview ,Runtime ,Vote_average , Poster_path , all_genres "
                  "from ( "
                  " select ID,Title,Overview,Runtime,Vote_average,Poster_path "
                  " from Movie_metadata "
                  " where ID = %s ) as selcted_movie , "
                  "(select ID, GROUP_CONCAT(Genre_name) as all_genres "
                  " from Movie_genres"
                  " GROUP BY ID) as genres "
                  "where selcted_movie.ID = genres.ID"
                  )

        self.cursor.execute(query3, (target_id,))

        final = {
            "movieId": "0",
            "title": "not Found",
            "overview": "N/A",
            "runtime": "N/A",
            "rating": 0,
            "posterPath": POSTER_NULL,
            "genres": "N/A"
        }
        for (ID, Title, Overview, Runtime, Vote_average, Poster_path, Genre_name) in self.cursor:
            if Poster_path:
                Poster_path = "https://image.tmdb.org/t/p/original" + Poster_path
            else:
                Poster_path = POSTER_NULL

            final["movieId"] = ID
            final["title"] = Title
            final["overview"] = Overview
            final["runtime"] = Runtime
            final["rating"] = float(Vote_average if Vote_average else 0)
            final["posterPath"] = Poster_path
            final["genres"] = Genre_name

        return final

    def find_info_given_actor_id(self, target_id):
        query = ("SELECT met.Actor_id, Actor_name, Profile_path, Popularity ,last_appearances, Gender "
                 "FROM Actor_metadata met JOIN ( "
                 "SELECT Actor_id, GROUP_CONCAT(Title, ' ') as last_appearances "
                 "FROM("
                 "SELECT Actor_id, Title"
                 " FROM Movie_actors m_a JOIN Movie_metadata mm ON  m_a.ID = mm.ID"
                 " WHERE Actor_id = %s"
                 " ORDER BY Popularity desc"
                 " LIMIT 5) tmp"
                 " GROUP BY Actor_id"
                 ") ma ON met.Actor_id = ma.Actor_id")

        self.cursor.execute(query, (target_id,))

        final = {"actorId": 'N/A',
                 "actorName": 'N/A',
                 "popularity": 0,
                 "lastAppearances": 'N/A',
                  "profilePath": POSTER_NULL,
                 "gender": 'N/A'}

        for (Actor_id, Actor_name, Profile_path, Popularity, last_appearances, Gender) in self.cursor:
            final = {"actorId": Actor_id, "actorName": Actor_name, "popularity": float(Popularity if Popularity else 0),
                     "lastAppearances": last_appearances,
                     "profilePath": "https://image.tmdb.org/t/p/original" + Profile_path, "gender": Gender}
        return final

    def get_movie_by_description(self, desc):
        query = ("SELECT selcted_movie.ID, Title, Overview, Runtime, Vote_average, Poster_path, all_genres "
                 "FROM("
                 "SELECT ID, Title, Overview, Runtime, Vote_average, Poster_path "
                 "FROM Movie_metadata "
                 "WHERE ID IN (SELECT ID"
                 " FROM Movie_metadata"
                 " WHERE Vote_average > 5 AND MATCH (Overview) AGAINST (%s IN natural language mode))) AS selcted_movie, "
                 " all_genres_view AS genres"
                 " WHERE selcted_movie.ID = genres.ID"
                 " LIMIT 8")

        self.cursor.execute(query, (desc,))
        final = []
        for (ID, Title, Overview, Runtime, Vote_average, Poster_path, all_genres) in self.cursor:
            if Poster_path:
                Poster_path = "https://image.tmdb.org/t/p/original" + Poster_path
            else:
                Poster_path = POSTER_NULL
            inside = {"movieId": ID, "title": Title, "overview": Overview, "runtime": Runtime, "rating": float(Vote_average if Vote_average else 0),
                      "posterPath": Poster_path, "genres": all_genres}

            final.append(inside)
        return final

    # function gives 4 movies with keywords. with limitation to users_rating,vote_average and language
    def give_4_movies_with_key_words(self):
        query = ("SELECT mm.ID, Title , all_keywords "
                 "FROM Movie_metadata mm JOIN Movie_keywords_view mk ON mm.ID = mk.ID "
                 " WHERE mm.ID IN (SELECT * "
                 "FROM ( "
                 "SELECT Movie_id AS ID"
                 " FROM user_rating_view"
                 " WHERE user_rating >= 3.5)"
                 " tmp) "
                 "and Vote_average >= 7.8 and Original_language = 'en'"
                 " ORDER BY RAND()"
                 "LIMIT 4")

        self.cursor.execute(query)
        final = []
        for (ID, Title, all_keywords) in self.cursor:
            inside = {"movieId": ID, "title": Title, "all_keywords": all_keywords}

            final.append(inside)
        return final

    # returns few movies
    def q_1(self, my_order):
        query = ("SELECT mm.ID, Title ,Overview ,Runtime ,Vote_average, Poster_path, "
                 " ma.Actor_id, am.Actor_name, am.gender, ma.Actor_character "
                 "FROM Movie_metadata mm, Movie_actors ma, "
                 "(SELECT *"
                 "FROM Actor_metadata"
                 " WHERE Popularity > 20"
                 " ORDER BY RAND()"
                 " LIMIT 1) am"
                 " WHERE  mm.ID = ma.ID and ma.Actor_id = am.Actor_id"
                 " ORDER BY %s desc " 
                 " LIMIT 4") % ("mm."+my_order)

        self.cursor.execute(query)
        final = []
        for (ID, Title, Overview, Runtime, Vote_average, Poster_path, Actor_id, Actor_name, gender,
             Actor_character) in self.cursor:
            if Poster_path:
                Poster_path = "https://image.tmdb.org/t/p/original" + Poster_path
            else:
                Poster_path = POSTER_NULL
            inside = {"movieId": ID, "title": Title, "overview": Overview, "runtime": Runtime, "rating": Vote_average,
                      "posterPath": Poster_path, "actorId": Actor_id,
                      "actor_name": Actor_name, "gender": gender, "Actor_character": Actor_character}

            final.append(inside)
        return final

    def given_prefix_return_all_valid_suffix(self, prefix, type):
        prefix = prefix + "%"
        if type == "movie":  # needs to match the data th UI gets with questions
            autocomplete_query_movie = "SELECT Title FROM Movie_metadata WHERE Title LIKE %s"
            self.cursor.execute(autocomplete_query_movie, (prefix,))
            return [Title for (Title,) in self.cursor]
        elif type == "actor":  # needs to match the data th UI gets with questions
            autocomplete_query_actor = "SELECT  Actor_name FROM Actor_metadata WHERE Actor_name LIKE %s"
            self.cursor.execute(autocomplete_query_actor, (prefix,))
            return [Actor_name for (Actor_name,) in self.cursor]
        else:
            return "wrong type: type must be either Movie or Actor"

    def return_which_actor_played_this_character_in_this_movie(self):
        query = ("select chosen_actor.Title, chosen_actor.Actor_id, chosen_actor.Actor_name, "
                 "chosen_actor.Actor_character, Actor_metadata.Actor_name AS other_Actor_name "
                 "from "
                 " (select selected_movie.Title, Movie_actors.Actor_id ,"
                 "         Movie_actors.Actor_character,Actor_metadata.Actor_name,Actor_metadata.Gender "
                 "  from "
                 "   (select * "
                 "    from Movie_metadata "
                 "    where Popularity >40 "
                 "    order by rand() Limit 1 ) as selected_movie, Movie_actors,Actor_metadata "
                 "  where selected_movie.ID = Movie_actors.ID and Movie_actors.Actor_id = Actor_metadata.Actor_id "
                 "  order by Actor_metadata.Popularity desc limit 1) as chosen_actor , Actor_metadata "
                 "where chosen_actor.Actor_id <> Actor_metadata.Actor_id "
                 "and chosen_actor.Gender = Actor_metadata.Gender and Popularity > 15 "
                 "order by rand() Limit 3 ")

        self.cursor.execute(query)
        final = []
        for (Title, Actor_id, Actor_name, Actor_character, other_Actor_name) in self.cursor:
            inside = {"title": Title, "actorId": Actor_id, "actor_name": Actor_name, "Actor_character": Actor_character,
                      "other_Actor_name": other_Actor_name}

            final.append(inside)
        return final

    def return_greatest_revenue_for_rand_genre_and_three_more_great_revenue_from_the_same_genre(self):
        query5 = (" SELECT biggest_revnue_random_genre.ID, biggest_revnue_random_genre.Genre_name, biggest_revnue_random_genre.Title, Movie_metadata.ID AS WRONG_ID, Movie_metadata.Title AS WRONG_TITLE "
                  " FROM Movie_metadata,Movie_genres, "
                  " (SELECT t.ID, t.Title, t.Genre_name, t.ranki "
                  "FROM ( "
                  " SELECT Movie_metadata.ID, Movie_metadata.Title, Movie_genres.Genre_name, Movie_metadata.Revenue, row_number() over (partition by Movie_genres.Genre_name ORDER BY Movie_metadata.Revenue DESC) AS ranki "
                  " FROM Movie_metadata, Movie_genres "
                  "WHERE Movie_metadata.ID = Movie_genres.ID "
                  ") AS t "
                  "WHERE ranki <= 1 AND t.Genre_name <> 'TV Movie' "
                  "ORDER BY RAND() "
                  " LIMIT 1) AS biggest_revnue_random_genre "
                  " WHERE Movie_metadata.ID = Movie_genres.ID AND Movie_metadata.ID <> biggest_revnue_random_genre.ID AND  Movie_genres.Genre_name = biggest_revnue_random_genre.Genre_name AND Revenue > 100000000 "
                  " ORDER BY RAND() "
                  "LIMIT 3" )

        self.cursor.execute(query5)

        final = []
        for (ID, Genre_name, Title, WRONG_ID, WRONG_TITLE) in self.cursor:
            inside = {"movieId": ID, "Genre_name": Genre_name, "title": Title,
                      "WRONG_ID": WRONG_ID, "WRONG_TITLE": WRONG_TITLE}
            final.append(inside)

        return final

    def create_index(self):
        add_index = ("CREATE INDEX Actor_name_metadata on Actor_metadata(Actor_name(10)) ")
        self.cursor.execute(add_index)
        self.cnx.commit()

    def __del__(self):
        if self.cnx:
            self.cnx.close()