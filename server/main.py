
from functools import wraps
from flask import Flask, render_template, jsonify, request
from server_func import sql_manager

app = Flask(__name__, template_folder="../public")


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


@app.route("/", methods=['GET'])
def react():
    return render_template("index.html")


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=45556)
    # app.run(host='localhost', port=3000, debug=True)
    # app.run(host='localhost', port="3000", debug=True)
    app.run(host='127.0.0.1', port="5000", debug=True)
