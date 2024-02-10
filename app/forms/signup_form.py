from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, SelectField, FloatField, EmailField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    if current_user.is_authenticated and current_user.email == email:
        user = User.query.filter(User.email == email).all()
        if len(user) > 1:
            raise ValidationError('Email address is already in use.')
    else:
        user = User.query.filter(User.email == email).first()
        if user:
            raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if current_user.is_authenticated and current_user.username == username:
        user = User.query.filter(User.username == username).all()
        if len(user) > 1:
            raise ValidationError('Username is already in use.')
    else:
        user = User.query.filter(User.username == username).first()
        if user:
            raise ValidationError('Username is already in use.')



def password_data(form, field):
    password = field.data
    if not password:
        raise ValidationError("Please enter in a password")


class SignUpForm(FlaskForm):
    email = EmailField('email', validators=[
                        DataRequired(), user_exists])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])

    password = StringField('password', validators=[DataRequired()])
