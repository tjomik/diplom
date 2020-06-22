FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt /backend
RUN pip install --upgrade pip -r requirements.txt
RUN apt-get update
COPY . /backend
