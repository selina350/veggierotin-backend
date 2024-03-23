import os
from dotenv import load_dotenv

flask_env = os.environ.get('FLASK_ENV')
if flask_env == "production":
    load_dotenv('/etc/secrets/.env')

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'SQLALCHEMY_DATABASE_URI').replace('postgres://', 'postgresql://')
    print(SQLALCHEMY_DATABASE_URI)
    SQLALCHEMY_ECHO = True
