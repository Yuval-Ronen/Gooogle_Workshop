## Deployment guide ##
# http://www.cs.tau.ac.il/system/django -> how to upload this to server
# scp -r server maorarzi@nova.cs.tau.ac.il:/specific/a/home/cc/students/cs/maorarzi/databases_course
# scp -r server delta-tomcat-vm:/specific/scratch/maorarzi/django/
# ssh delta-tomcat-vm
# cd /specific/scratch/maorarzi/django/
# python main.py runserver delta-tomcat-vm:45556
# http://delta-tomcat-vm.cs.tau.ac.il:45556

from functools import wraps
from flask import Flask, render_template, jsonify, request
from question import build_question, sql_manager

app = Flask(__name__, static_folder="./build/static", template_folder="./build")


def error_handler(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as err:
            print(str(err))
            return jsonify({"error": str(err)}), 500
    return decorator


@app.route("/api/connect", methods=['GET'])
@error_handler
def connect():
    sql_manager.total_setup()
    return jsonify({}), 200


@app.route("/api/getMovie/<movieId>", methods=['GET'])
@error_handler
def get_movie(movieId):
    info = sql_manager.sql_c.find_info_given_id(movieId)

    return jsonify({"result": {"movieId": info["movieId"],
                               "title": info["title"],
                               "overview": info["overview"],
                               "runTime": info["runtime"],
                               "rating": info["rating"],
                               "posterPath": info["posterPath"],
                               "genres": info["genres"]}}), 200


@app.route("/api/getActor/<actorId>", methods=['GET'])
@error_handler
def get_actor(actorId):
    info = sql_manager.sql_c.find_info_given_actor_id(actorId)
    return jsonify({"result": {"actorId": info["actorId"],
                               "actorName": info["actorName"],
                               "profilePath": info["profilePath"],
                               "lastAppearances": info["lastAppearances"],
                               "popularity": info["popularity"]}}), 200


@app.route("/api/moviesByDesc/", methods=['POST'])
@error_handler
def movies_by_desc():
    desc = request.json.get('description', '')
    desc = '%' + desc + '%'
    info = sql_manager.sql_c.get_movie_by_description(desc)
    result_list = []
    for index in info:
        result_list.append({"movieId": index['movieId'],
                            "title": index['title'],
                            "overview":  index['overview'],
                            "runTime": index['runtime'],
                            "rating": index['rating'],
                            "posterPath": index['posterPath'],
                            "genres": index['genres']})

    return jsonify({"result": result_list}), 200


@app.route("/api/autoComplete/", methods=['POST'])
@error_handler
def auto_complete():
    auto_complete_string = request.json.get('string', '')
    auto_complete_type = request.json.get('type', '')
    result = sql_manager.sql_c.given_prefix_return_all_valid_suffix(auto_complete_string, auto_complete_type)
    return jsonify({"result": result}), 200


@app.route("/api/getQuestion", methods=['GET'])
@error_handler
def get_question():
    question = build_question()
    while question is None:
        print("None question is not allowed")
        question = build_question()
    return question


@app.route("/", methods=['GET'])
def react():
    return render_template("index.html")


if __name__ == '__main__':
    app.run('0.0.0.0', 45556)
