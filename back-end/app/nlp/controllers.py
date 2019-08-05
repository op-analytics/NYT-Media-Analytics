# Import flask dependencies
from flask import Blueprint, jsonify

# Define the blueprint: 'auth', set its url prefix: app.url/auth
nlp = Blueprint('nlp', __name__, url_prefix='/nlp')

# Set the route and accepted methods
@nlp.route('/', methods=['GET'])
def index():
    return jsonify(
                code=202,
                message="Hello from nlp"
            )
