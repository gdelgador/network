FROM python:3
COPY .  /usr/src/app
WORKDIR /usr/src/app
RUN pip install -r requirements.txt
CMD [ "bash","./docker-entrypoint.sh" ]
# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
EXPOSE 8000
