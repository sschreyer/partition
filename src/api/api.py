from flask import Flask

app = Flask(__name__)

@app.route('/test')
def get_test_content():
    return {'test': 'this is a test'}