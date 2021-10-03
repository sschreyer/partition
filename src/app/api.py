from flask import Flask
from json import dumps

app = Flask(__name__)

import partition

@app.route('/plans', methods=['GET'])
def get_test_content():
    partition.make_plan("First plan", "a good plan")
    return dumps(partition.display_plans())

