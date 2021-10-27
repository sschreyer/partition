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
    type_ = args['type']
    return dumps(partition.make_plan(title, description, type_))

@app.route('/deleteplan', methods=['DELETE'])
def delete_plan():
    args = request.get_json()
    title = args['title']
    return dumps(partition.delete_plan(title))