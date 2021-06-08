from functools import wraps
from flask import Flask, render_template, jsonify

from server.server_source_code import ConnectSQL
from server.server_func import sql_manager

# app = Flask(__name__, static_folder="../public", static_url_path='/', template_folder="../public")
app = Flask(__name__)

sql_c = ConnectSQL()


def error_handler(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as err:
            print(str(err))
            return jsonify({"error": str(err)}), 500

    return decorator


#
@app.route("/api/connect", methods=['GET'])
@error_handler
def connect():
    sql_manager.total_setup()
    return jsonify({}), 200


@app.route("/api/checkIfTrainer/<email>", methods=['GET'])
@error_handler
def checkIfTrainer(email):
    # info = sql_manager.sql_c.check_email_trainer(email)
    info = sql_c.check_email_trainer(email)
    return info
    # return jsonify({"result": {"trainer_id": info["ID"],
    #                            "first_name": info["first_name"],
    #                            "last_name": info["last_name"],
    #                            "email": info["email"],
    #                            "image": info["image"],
    #                            "admin": info["admin"]}}), 200


@app.route("/api/checkIfTrainee/<email>", methods=['GET'])
@error_handler
def checkIfTrainee(email):
    info = sql_c.check_email_trainee(email)
    # info = sql_manager.sql_c.check_email_trainee(email)
    return info
    # return jsonify({"result": {"trainer_id": info["ID"],
    #                            "first_name": info["first_name"],
    #                            "last_name": info["last_name"],
    #                            "email": info["email"],
    #                            "image": info["image"]}}), 200


@app.route("/api/getAllTrainingHistory_trainer/<trainer_id>", methods=['GET'])
@error_handler
def getAllTrainingHistory_trainer(trainer_id):
    info = sql_c.get_all_training_history_trainer(trainer_id)
    result_list = ["מתאמנים", info]
    return jsonify(result_list)

    #
    # for index in info:
    #     result_list.append({"trainer_id": info["ID"],
    #                         "first_name": info["first_name"],
    #                         "last_name": info["last_name"],
    #                         "email": info["email"],
    #                         "image": info["image"]})
    # print(result_list)
    # return result_list


@app.route("/api/getAllTrainingHistory_trainee/<trainee_id>", methods=['GET'])
@error_handler
def getAllTrainingHistory_trainee(trainee_id):
    info = sql_c.get_all_training_history_trainee(trainee_id)
    result_list = ["מאמן", info]
    return jsonify(result_list)
    # return jsonify({"result": {"trainer_id": info["ID"],
    #                            "first_name": info["first_name"],
    #                            "last_name": info["last_name"],
    #                            "email": info["email"],
    #                            "image": info["image"]}}), 200


@app.route("/api/getTrainingAmountByMonth_trainer/<trainer_id>", methods=['GET'])
@error_handler
def getTrainingAmountByMonth_trainer(trainer_id):
    info = sql_c.get_training_amount_by_month_trainer(trainer_id)
    print(info)
    return jsonify(info)


@app.route("/api/getUpcomingExercise_trainer/<trainer_id>", methods=['GET'])
@error_handler
def getUpcomingExercise_trainer(trainer_id):
    info = sql_c.get_upcoming_exercise_trainer(trainer_id)
    result_list = ["מתאמנים", info]
    print(result_list)
    return jsonify(result_list)


@app.route("/api/getAllTrainees/<trainer_id>", methods=['GET'])
@error_handler
def getAllTrainees(trainer_id):
    info = sql_c.get_all_trainees(trainer_id)
    print(info)
    return jsonify(info)


@app.route("/", methods=['GET'])
def react():
    return render_template("index.html")
    # return app.send_static_file('index.html')


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=45556)
    # ress = sql_c.getTrainingAmountByMonth_trainer('205380132')
    # print(ress)

    app.run(host='127.0.0.1', port="5000", debug=True)
