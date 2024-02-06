
FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/


COPY ./entrypoint.sh .



CMD ["gunicorn", "--bind", "0.0.0.0:8000", "authentication.wsgi:application"]

