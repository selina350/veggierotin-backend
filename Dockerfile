# syntax=docker/dockerfile:1.4
FROM python:3.10-alpine AS builder

ENV PIPENV_VENV_IN_PROJECT=1

WORKDIR /usr/src

# Install & use pipenv
RUN python -m pip install --upgrade pip
RUN pip install pipenv

# Install dependencies
COPY Pipfile.lock Pipfile /usr/src/
RUN pipenv sync

COPY . /usr/src/

EXPOSE 5000
CMD pipenv run flask db upgrade \
    && pipenv run flask seed all \
    && pipenv run flask run -h 0.0.0.0 -p 5000
