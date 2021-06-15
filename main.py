from functools import wraps

from flask_cors import CORS, cross_origin
# import CORS as CORS
from flask import Flask, render_template, jsonify
from server.server_source_code import ConnectSQL
from server.server_func import sql_manager

# app = Flask(__name__, static_folder="../public", static_url_path='/', template_folder="../public")
app = Flask(__name__)

CORS(app, supports_credentials=True)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


translator = {1: "ינואר", 2: "פבואר", 3: "מרץ", 4: "אפריל", 5: "מאי", 6: "יוני", 7: "יולי", 8: "אוגוסט", 9: "ספטמבר", 10: "אוקטובר", 11: "נובמבר", 12: "דצמבר"}

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
    print(info)
    # info.headers.add("Access-Control-Allow-Origin", "*")
    # return jsonify({info}), 200
    return info


@app.route("/api/checkIfTrainee/<email>", methods=['GET'])
@error_handler
def checkIfTrainee(email):
    info = sql_c.check_email_trainee(email)
    print(info)
    # return jsonify(info)
    return info


@app.route("/api/getAllTrainingHistory_trainer/<trainer_id>", methods=['GET'])
@error_handler
def getAllTrainingHistory_trainer(trainer_id):
    info = sql_c.get_all_training_history_trainer(trainer_id)
    result_list = ["מתאמנים", info]
    print(result_list)
    return jsonify({"result": result_list}), 200
    # return result_list


@app.route("/api/getAllTrainingHistory_trainee/<trainee_id>", methods=['GET'])
@error_handler
def getAllTrainingHistory_trainee(trainee_id):
    info = sql_c.get_all_training_history_trainee(trainee_id)
    result_list = ["מאמן", info]
    print(result_list)
    # return jsonify({"result": result_list}), 200
    return jsonify({"result": result_list}), 200


@app.route("/api/getTrainingAmountByMonth_trainer/<trainer_id>", methods=['GET'])
@error_handler
def getTrainingAmountByMonth_trainer(trainer_id):
    info = sql_c.get_training_amount_by_month_trainer(trainer_id)
    retVal = []
    for element in translator:
        for item in info:
            if item["month"] == element:
                retVal.append({"month": translator[element], "training_amount": item["training_amount"]})
            else:
                retVal.append({"month": translator[element], "training_amount": 0})

    print(retVal)
    return jsonify({"result": retVal}), 200
    # return info


@app.route("/api/getTrainingAmountByMonth_trainee/<trainee_id>", methods=['GET'])
@error_handler
def getTrainingAmountByMonth_trainee(trainee_id):
    info = sql_c.get_training_amount_by_month_trainee(trainee_id)
    retVal = []
    for element in translator:
        for item in info:
            if item["month"] == element:
                retVal.append({"month": translator[element], "training_amount": item["training_amount"]})
            else:
                retVal.append({"month": translator[element], "training_amount": 0})

    print(retVal)
    return jsonify({"result": retVal}), 200
    # return info


@app.route("/api/getTypeAmount/<trainee_id>", methods=['GET'])
@error_handler
def getTypeAmount(trainee_id):
    info = sql_c.get_type_amount(trainee_id)
    print(info)
    return jsonify({"result": info}), 200

@app.route("/api/sendMessage/<trainee_id>/<trainer_id>/<message>", methods=['POST'])
@error_handler
def sendMessage(trainee_id, trainer_id, message):
    sql_c.send_message(trainee_id, trainer_id, message)
    return jsonify({"result": "message sent"}), 200


@app.route("/api/getMessage/<trainee_id>", methods=['GET'])
@error_handler
def getMessage(trainee_id):
    info = sql_c.get_message(trainee_id)
    print(info)
    return jsonify({"result": info}), 200


@app.route("/api/changeMessageStatus/<trainee_id>", methods=['POST'])
@error_handler
def changeMessageStatus(trainee_id):
    sql_c.change_message_status(trainee_id)
    return jsonify({"result": "changed"}), 200

@app.route("/api/getUpcomingExercise_trainer/<trainer_id>", methods=['GET'])
@error_handler
def getUpcomingExercise_trainer(trainer_id):
    info = sql_c.get_upcoming_exercise_trainer(trainer_id)
    result_list = ["מתאמנים", info]
    print(result_list)
    return jsonify({"result": result_list}), 200
    # return result_list


@app.route("/api/getUpcomingExercise_trainee/<trainee_id>", methods=['GET'])
@error_handler
def getUpcomingExercise_trainee(trainee_id):
    info = sql_c.get_upcoming_exercise_trainee(trainee_id)
    result_list = ["מאמן", info]
    print(result_list)
    return jsonify({"result": result_list}), 200

@app.route("/api/getAllTrainees/<trainer_id>", methods=['GET'])
@error_handler
def getAllTrainees(trainer_id):
    info = sql_c.get_all_trainees(trainer_id)
    print(info)
    return jsonify({"result": info}), 200
    # return info


@app.route("/api/createNewTrain/<trainer_id>/<trainees>/<train_type>/<train_date_start>/<train_date_end>/"
           "<train_time_start>/<train_time_end>/<description>/<training_details_id>",
           methods=['GET'])
@error_handler
def createNewTrain(trainer_id, trainees, train_type, train_date_start, train_date_end,  train_time_start, train_time_end, description, training_details_id):
    print("in main.py")
    info = sql_c.new_train(trainer_id, trainees.split(','), train_type, train_date_start, train_date_end,
                           train_time_start, train_time_end, description, training_details_id)
    # print(info)
    return jsonify({"result": info}), 200

# @app.route("/", methods=['GET'])
# def react():
#     return render_template("index.html")
    # return app.send_static_file('index.html')


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    # TRAINID= getMessage(205380132)
    app.run(host='127.0.0.1', port="5000", debug=True)

