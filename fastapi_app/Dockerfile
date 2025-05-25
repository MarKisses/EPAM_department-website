FROM python:3.12.0

WORKDIR fastapi_app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .
