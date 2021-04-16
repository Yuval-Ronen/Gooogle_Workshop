import random
from SRC.APPLICATION_SOURCE_CODE import ConnectSQL


class sqlManager:
    def __init__(self):
        self.sql_c = None
        self.VALID_MOVIE_IDS = None
        self.VALID_ACTOR_IDS = None

    def total_setup(self):
        self.sql_c = ConnectSQL()
        self.VALID_MOVIE_IDS = self.sql_c.ids["Movies"]
        self.VALID_ACTOR_IDS = self.sql_c.ids["Actors"]


# create new ConnectSQL obj
sql_manager = sqlManager()
sql_manager.total_setup()
# ======================================================


VALID_YEARS = []

QUESTIONS_NUM = 5
ORDER_TYPE_LIST = ["profitable", "rated", "expensive"]
Q1_LIST = ["year", "actor"]
QUESTION_TYPE = ["text", "multiChoice", "photo"]


def build_question():
    question_num = random.randint(1, 6)

    # question_num = random.choice([1, 2, 3, 5, 6])  # just fot test
    # question_type = random.choices(QUESTION_TYPE, weights=[1, 1, 0], k=1)[0]
    question_type = QUESTION_TYPE[random.randint(0,1)]

    if question_num == 1:
        return ask_q_one(question_type)
    elif question_num == 2:
        return ask_q_two(question_type)
    elif question_num == 3:
        return ask_q_three()
    elif question_num == 4:
        return ask_q_four(question_type)
    elif question_num == 5:
        return ask_q_five()
    elif question_num == 6:
        return ask_q_six(question_type)


def ask_q_one(question_type):
    # we have info about one of the actors and movies he participated in
    # order_type = random.choice(ORDER_TYPE_LIST)  # profitable, rated, expensive
    order_type = ORDER_TYPE_LIST[random.randint(0, len(ORDER_TYPE_LIST) - 1)]
    if order_type == 'profitable':
        my_order = "Revenue - Budget"
    elif order_type == 'rated':
        my_order = "Popularity"
    else:
        my_order = "Budget"
    info = sql_manager.sql_c.q_1(my_order)
    question = "Which was the most " + order_type + " movie that " + info[0]["actor_name"] + " participated in?"
    multi_list = []
    if question_type == "multiChoice":
        for row in info:
            multi_list.append(row["title"])
        if len(multi_list) < 4:
            question_type = 'text'
        else:
            random.shuffle(multi_list)

    return {"questionType": question_type, "questionText": question, "answer": info[0]["title"].lower(),
            "answerType": "movie", "answerId": info[0]["movieId"], "multiChoices": multi_list}


def ask_q_two(question_type):
    question = "Which movie is described best by the following description?\n"
    answer_list = []
    if question_type == "text":
        movie_ids = random.sample(sql_manager.VALID_MOVIE_IDS.keys(), k=1)
        info = sql_manager.sql_c.find_info_given_id(movie_ids[0])
    else:
        movie_ids = random.sample(sql_manager.VALID_MOVIE_IDS.keys(), k=4)
        info = sql_manager.sql_c.find_info_given_id(movie_ids[0])
        answer_list.append(info["title"])
        for i in range(1, 4):
            answer_list.append(sql_manager.VALID_MOVIE_IDS[movie_ids[i]])
    q_description = info["overview"]
    answer = info["title"]
    random.shuffle(answer_list)
    return {"questionType": question_type, "questionText": question + q_description, "answer": answer.lower(),
            "answerType": "movie", "answerId": movie_ids[0], "multiChoices": answer_list}


def ask_q_three():
    sig = 1
    while sig:
        # sometimes there are character that are only voice or credit. so we dont want those to happen
        info = sql_manager.sql_c.return_which_actor_played_this_character_in_this_movie()
        character = info[0]["Actor_character"]
        sig = 0
        if "credit" in character or "(voice)" == character:
            sig = 1

    answer = info[0]["actor_name"]
    answer_list = [answer]
    if "voice" in character:
        char_list = character.split(" (voice)")
        character = "the voice of " + '"' + char_list[0] + '"'
    else:
        character = '"' + character + '"'
    question = "Who played " + character + " in the movie " + '"' + info[0]["title"] + '"?'
    for row in info:
        answer_list.append(row["other_Actor_name"])
    random.shuffle(answer_list)
    return {"questionType": "multiChoice", "questionText": question, "answer": answer.lower(),
            "answerType": "actor", "answerId": info[0]["actorId"], "multiChoices": answer_list}


#  the q type is photo but we can have another type - text\multi-choice.....
def ask_q_four(question_type):
    # option for gender
    answer_list = []
    if True or question_type == "text":
        actor_ids = random.sample(sql_manager.VALID_ACTOR_IDS.keys(), k=1)
        info = sql_manager.sql_c.find_info_given_actor_id(actor_ids[0])
    else:
        actor_ids = random.sample(sql_manager.VALID_ACTOR_IDS.keys(), k=4)
        info = sql_manager.sql_c.find_info_given_actor_id(actor_ids[0])
        answer_list.append(info["actorName"])
        for i in range(1, 4):
            answer_list.append(sql_manager.VALID_ACTOR_IDS[actor_ids[i]])
        random.shuffle(answer_list)
    answer = sql_manager.VALID_ACTOR_IDS[actor_ids[0]]

    # match gender to question
    gender = info["gender"]
    if gender == 1:
        gender_title = "actress"
    else:
        gender_title = "actor"
    question = "What is the name of the " + gender_title + " in the photo?"
    return {"questionType": "photo", "questionText": question, "answer": answer.lower(),
            "answerType": "actor", "answerId": actor_ids[0], "multiChoices": answer_list, "imgPath": info["profilePath"]}


def ask_q_five():
    info = sql_manager.sql_c.give_4_movies_with_key_words()
    multi_list = []
    question = "Which movie is described best by the following key-words: " + info[0]["all_keywords"] + " ?"
    for row in info:
        multi_list.append(row["title"])
    random.shuffle(multi_list)
    return {"questionType": "multiChoice", "questionText": question, "answer": info[0]["title"].lower(),
            "answerType": "movie", "answerId": info[0]["movieId"], "multiChoices": multi_list}


def ask_q_six(question_type):
    info = sql_manager.sql_c.return_greatest_revenue_for_rand_genre_and_three_more_great_revenue_from_the_same_genre()
    genre_name = info[0]['Genre_name']
    question = "What is the movie with the greatest revenue in genre " + '"' + genre_name + '"' + "?"
    multi_list = []
    if question_type == "multiChoice":
        multi_list.append(info[0]["title"])
        for row in info:
            multi_list.append(row["WRONG_TITLE"])
        random.shuffle(multi_list)
    return {"questionType": question_type, "questionText": question, "answer": info[0]["title"].lower(),
            "answerType": "movie", "answerId": info[0]["movieId"], "multiChoices": multi_list}


# SQL 1:
# ----> pre: for multi select need no bring also movies that aren't fit
# Which was the {
#   (most / least) profitable ||  (best / worst) rated || (most / least) expensive ||
#   during (Year) / overall || where (actor name) played in |/| (director name) directed in || writer ||
#   starts with? ||
#
# }
# answer: movie (auto complete)

# SQL 2:
# ----> pre: multi select
# Which movie is described best by the (description) ?
# answer: movieid (auto complete)


# SQL 3
# Which (actor / actress) {
# -----> pre: random movie + random actor who didnt play in the movie + get movie id + all actors
# (played / didn't ?) in (movie name) || || played (character name) ||
#
# }
# answer: actorid (auto complete) / multi select

# SQL 4
# ----> pre: random a movie with 3+ number + get year of movies + movie's name
# ----> pre: multi select
# In which movie played (number of actors) optional- during (year) {
# }
# answer: movied (auto complete movieid)

# SQL 5
# Who is it?
# -----> pre: random four actors + pics, one is the right one
# answer: actorid (auto complete) / multi select

# HINT
# Search by description (full text)
