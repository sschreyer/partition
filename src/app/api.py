from flask import Flask, request
from json import dumps

import partition
from PlanType import PlanType

app = Flask(__name__)

@app.route('/plans', methods=['GET'])
def display_plans():
    return dumps(partition.display_plans())

@app.route('/makeplan', methods=['POST'])
def make_plan():
    args = request.get_json()
    title = args['title']
    description = args['description']
    # TO-DO: Make this not hardcoded.
    type_ = PlanType.WORK
    return dumps(partition.make_plan(title, description, type_))