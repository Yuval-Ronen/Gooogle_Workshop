from functools import wraps
from flask import Flask, render_template, jsonify, request

from server.server_source_code import ConnectSQL
from server.server_func import sql_manager

# app = Flask(__name__, static_folder="../public", static_url_path='/', template_folder="../public")
app = Flask(__name__, template_folder="../public")

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

    return jsonify({"result": {"trainer_id": info["ID"],
                               "first_name": info["first_name"],
                               "last_name": info["last_name"],
                               "email": info["email"],
                               "image": info["image"],
                               "admin": info["admin"]}}), 200


@app.route("/api/checkIfTrainee/<email>", methods=['GET'])
@error_handler
def checkIfTrainee(email):
    info = sql_c.check_email_trainee(email)
    # info = sql_manager.sql_c.check_email_trainee(email)

    return jsonify({"result": {"trainer_id": info["ID"],
                               "first_name": info["first_name"],
                               "last_name": info["last_name"],
                               "email": info["email"],
                               "image": info["image"]}}), 200


@app.route("/", methods=['GET'])
def react():
    # return render_template("index.html")
    return app.send_static_file('index.html')


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=45556)
    ress = checkIfTrainer("yuvalronen10@gmail.com")

    app.run(host='localhost', port=5000, debug=True)
    # app.run(host='localhost', port="3000", debug=True)
    # app.run(host='127.0.0.1', port="5000", debug=True)
