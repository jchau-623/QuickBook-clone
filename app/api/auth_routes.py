from flask import Blueprint, jsonify, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in and returns a JWT token
    """
    form = LoginForm()

    if form.validate_on_submit():
        # Authenticate the user
        user = User.query.filter(User.email == form.data['email']).first()
        if user and check_password_hash(user.password, form.data['password']):
            # Create a JWT token for the authenticated user
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token, user=user.to_dict())
        else:
            return {'errors': ['Invalid email or password']}, 401

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    JWT-based logout doesn't require a server-side action. 
    Client can simply discard the token.
    """
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and returns a JWT token
    """
    form = SignUpForm()

    if form.validate_on_submit():
        user = User(
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        
        # Create a JWT token for the new user
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, user=user.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """
    An example of a protected route that requires a valid JWT token to access
    """
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user=user.to_dict())


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when JWT authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
