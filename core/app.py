#!/usr/bin/python3
from flask import Flask
from flask import request
from config import *
import controller.behavior as behavior_controller
import view.message as msg

app = Flask(__name__)


@app.route('/hello', methods=['GET'])
def hello():
    return "Hello, Group 2!"


@app.route('/api/behavior', methods=['POST'])
def update_data():
    return behavior_controller.load_behavior(request.json)


@app.route("/api/behavior", methods=['GET'])
def get_behavior():
    behavior = behavior_controller.get_behavior(request.json)
    return msg.success_msg(behavior)


@app.route("/api/abnormal", methods=['GET'])
def get_abnormal():
    abnormal = behavior_controller.get_abnormal(request.json)
    return msg.success_msg(abnormal)


if __name__ == '__main__':
    app.run(debug=APP_DEBUG_MODE, host=APP_HOST)
