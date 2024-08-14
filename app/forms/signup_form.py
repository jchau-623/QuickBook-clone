from flask_wtf import FlaskForm
from wtforms import EmailField, PasswordField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    email = EmailField('Email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField('Password', validators=[DataRequired()])
