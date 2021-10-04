from flask import Flask, request
from json import dumps

import partition

app = Flask(__name__)

@app.route('/plans', methods=['GET'])
def display_plans():
    #partition.make_plan("First plan", "a good plan")
    return dumps(partition.display_plans())

@app.route('/makeplan', methods=['Post'])
def make_plan():
    args = request.get_json()
    title = args['title']
    description = args['description']
    return dumps(partition.make_plan(title, description))