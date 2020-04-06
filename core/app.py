#!/usr/bin/python3
from flask import Flask
from flask import request
from config import *
from db.elastic import ES
from data.sysmon import SysmonData
import controller.behavior as behavior_controller

app = Flask(__name__)


@app.route('/hello', methods=['GET'])
def hello():
    return "Hello, Group 2!"


def update_data(startdate, enddate):
    sysmon = SysmonData()
    res = sysmon.from_winlogbeat(es, WINLOGBEAT_INDEX, startdate, enddate)
    es.insert_behaviors('raw', res)


@app.route("/api/behavior", methods=['GET'])
def get_behavior():
    return behavior_controller.get_behavior(es, request.json)


if __name__ == '__main__':
    es = ES()
    app.run(debug=APP_DEBUG_MODE, host=APP_HOST)
