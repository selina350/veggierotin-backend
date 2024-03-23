# syntax=docker/dockerfile:1.2
FROM python:3.10-alpine AS base

ENV PIPENV_VENV_IN_PROJECT=1

WORKDIR /usr/app

# Install & use pipenv
RUN python -m pip install --upgrade pip
RUN pip install pipenv

# Install dependencies
COPY Pipfile.lock Pipfile /usr/app/
RUN pipenv sync --system

COPY . /usr/app/

EXPOSE 5000

FROM base AS development
CMD pipenv run flask db upgrade \
    && pipenv run flask seed all \
    && pipenv run flask run -h 0.0.0.0 -p 5000

FROM base AS production
ENV FLASK_ENV=production
CMD pipenv run flask db upgrade \
    && pipenv run flask seed all \
    && pipenv run flask run -h 0.0.0.0 -p 5000
